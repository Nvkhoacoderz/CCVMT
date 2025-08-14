import { defineStore } from "pinia";
import axios from "axios";
import { APIURL } from "@/constaint";

export const useAppStore = defineStore("review", {
  state: () => ({
    users: [],
    reviews: [],
    reviewsByProduct: {},
    guests: [],
    loading: false,
    error: null,
    currentProductId: null,
    replies: [],
  }),
  actions: {
    // Users
    async fetchUsers() {
      try {
        const response = await axios.get(`${APIURL}/users`);
        this.users = response.data;
      } catch (error) {
        console.error("Không thể tải users:", error);
      }
    },

    // Guests (người chưa đăng nhập)
    addGuest(name, email) {
      const guest = {
        id: Date.now(),
        name,
        email,
        createdAt: new Date().toISOString(),
      };
      this.guests.push(guest);
    },

    removeGuest(id) {
      this.guests = this.guests.filter((g) => g.id !== id);
    },

    // FIX: Fetch replies cho một review cụ thể
    async fetchRepliesForReview(reviewId) {
      try {
        const response = await axios.get(
          `${APIURL}/replies?reviewId=${reviewId}`
        );
        return response.data || [];
      } catch (error) {
        console.error(`Không thể tải replies cho review ${reviewId}:`, error);
        return [];
      }
    },

    // FIX: Reviews - Fetch reviews cho một product cụ thể VÀ replies
    async fetchReviewsByProduct(productId) {
      this.loading = true;
      try {
        // Set current product
        this.currentProductId = productId;

        const response = await axios.get(
          `${APIURL}/reviews?productId=${productId}`
        );

        const productReviews = response.data || [];

        // FIX: Fetch replies cho mỗi review
        for (let review of productReviews) {
          review.replies = await this.fetchRepliesForReview(review.id);
        }

        // Lưu vào cache
        this.reviewsByProduct[productId] = productReviews;

        // Set reviews cho product hiện tại
        this.reviews = productReviews;

        this.error = null;
      } catch (error) {
        this.error = "Không thể tải đánh giá";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // FIX: Fetch tất cả reviews với replies
    async fetchAllReviews() {
      this.loading = true;
      try {
        const response = await axios.get(`${APIURL}/reviews`);
        const allReviews = response.data || [];

        // Fetch replies cho mỗi review
        for (let review of allReviews) {
          review.replies = await this.fetchRepliesForReview(review.id);
        }

        // Group reviews theo productId
        this.reviewsByProduct = allReviews.reduce((acc, review) => {
          const productId = review.productId;
          if (!acc[productId]) {
            acc[productId] = [];
          }
          acc[productId].push(review);
          return acc;
        }, {});

        // Set reviews nếu có currentProductId
        if (
          this.currentProductId &&
          this.reviewsByProduct[this.currentProductId]
        ) {
          this.reviews = this.reviewsByProduct[this.currentProductId];
        }

        this.error = null;
      } catch (error) {
        this.error = "Không thể tải tất cả đánh giá";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async updateReview({
      id,
      comment,
      name,
      email,
      rating,
      productId,
      userId,
    }) {
      this.loading = true;
      try {
        const oldReview = this.reviews.find((r) => r.id === id);
        const updatedReview = {
          ...oldReview,
          comment:
            typeof comment !== "undefined" ? comment : oldReview?.comment,
          name: typeof name !== "undefined" ? name : oldReview?.name,
          email: typeof email !== "undefined" ? email : oldReview?.email,
          rating: typeof rating !== "undefined" ? rating : oldReview?.rating,
          productId:
            typeof productId !== "undefined" ? productId : oldReview?.productId,
          userId: typeof userId !== "undefined" ? userId : oldReview?.userId,
          updatedAt: new Date().toISOString(),
        };

        const response = await axios.put(
          `${APIURL}/reviews/${id}`,
          updatedReview
        );
        const data = response.data;

        // FIX: Giữ lại replies khi update
        data.replies = oldReview?.replies || [];

        // Cập nhật lại cache/danh sách
        if (this.reviewsByProduct[updatedReview.productId]) {
          const idx = this.reviewsByProduct[updatedReview.productId].findIndex(
            (r) => r.id === id
          );
          if (idx !== -1)
            this.reviewsByProduct[updatedReview.productId][idx] = data;
        }
        const idx = this.reviews.findIndex((r) => r.id === id);
        if (idx !== -1) this.reviews[idx] = data;

        this.error = null;
        return data;
      } catch (error) {
        this.error = "Không thể cập nhật đánh giá";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Trong reviewsAPI.js - sửa addReply function
    async addReply({ reviewId, name, comment, userId }) {
      // Kiểm tra xem reply đã tồn tại chưa
      const existingReview = this.reviews.find((r) => r.id === reviewId);
      if (existingReview && existingReview.replies) {
        const duplicateReply = existingReview.replies.find(
          (r) =>
            r.comment === comment &&
            r.userId === userId &&
            Math.abs(new Date(r.createdAt) - new Date()) < 5000 // trong 5 giây
        );
        if (duplicateReply) {
          console.log("Duplicate reply detected, skipping...");
          return duplicateReply;
        }
      }

      this.loading = true;
      try {
        const newReply = {
          reviewId,
          name,
          comment,
          userId,
          createdAt: new Date().toISOString(),
        };

        // Gửi lên server
        const response = await axios.post(`${APIURL}/replies`, newReply);
        const addedReply = response.data;

        // Cập nhật local state
        const review = this.reviews.find((r) => r.id === reviewId);
        if (review) {
          if (!review.replies) {
            review.replies = [];
          }
          review.replies.push(addedReply);
        }

        // Cập nhật cache
        if (
          this.currentProductId &&
          this.reviewsByProduct[this.currentProductId]
        ) {
          const cachedReview = this.reviewsByProduct[
            this.currentProductId
          ].find((r) => r.id === reviewId);
          if (cachedReview) {
            if (!cachedReview.replies) {
              cachedReview.replies = [];
            }
            cachedReview.replies.push(addedReply);
          }
        }

        this.error = null;
        return addedReply;
      } catch (error) {
        this.error = "Không thể gửi trả lời";
        console.error("Add reply error:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Thêm review mới
    async addReview({
      productId,
      name,
      email,
      userId,
      rating,
      comment,
      isGuest,
    }) {
      this.loading = true;
      try {
        const newReview = {
          productId,
          name: name || null,
          phone: email || null,
          userId: userId || null,
          rating,
          comment,
          createdAt: new Date().toISOString(),
          isGuest: !!isGuest,
        };

        const response = await axios.post(`${APIURL}/reviews`, newReview);
        const addedReview = response.data;

        // FIX: Khởi tạo replies array cho review mới
        addedReview.replies = [];

        // Thêm vào cache
        if (!this.reviewsByProduct[productId]) {
          this.reviewsByProduct[productId] = [];
        }
        this.reviewsByProduct[productId].unshift(addedReview);

        // Nếu đang xem product này thì cập nhật reviews hiển thị
        if (this.currentProductId === productId) {
          this.reviews.unshift(addedReview);
        }

        // Nếu là khách chưa đăng nhập thì lưu vào mảng guests
        if (isGuest) {
          this.addGuest(name, email);
        }

        return addedReview;
      } catch (error) {
        this.error = "Không thể thêm đánh giá";
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Set product hiện tại và load reviews của nó
    setCurrentProduct(productId) {
      this.currentProductId = productId;
      if (this.reviewsByProduct[productId]) {
        this.reviews = this.reviewsByProduct[productId];
      } else {
        this.reviews = [];
      }
    },

    // Clear reviews khi rời khỏi product detail
    clearCurrentProduct() {
      this.currentProductId = null;
      this.reviews = [];
    },
  },
  getters: {
    // Average rating cho product hiện tại
    averageRating: (state) => {
      if (state.reviews.length === 0) return 0;
      const sum = state.reviews.reduce((acc, review) => acc + review.rating, 0);
      return (sum / state.reviews.length).toFixed(1);
    },

    // Average rating cho một product cụ thể
    averageRatingByProduct: (state) => {
      return (productId) => {
        const productReviews = state.reviewsByProduct[productId] || [];
        if (productReviews.length === 0) return "0.0";
        const sum = productReviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        return (sum / productReviews.length).toFixed(1);
      };
    },

    // Count reviews cho một product cụ thể
    reviewCountByProduct: (state) => {
      return (productId) => (state.reviewsByProduct[productId] || []).length;
    },

    // Guest reviews cho product hiện tại
    guestReviews: (state) => state.reviews.filter((r) => r.isGuest),
  },
});
