import { defineStore } from "pinia";
import axios from "axios";
import { APIURL } from "@/constaint";

export const useAppStore = defineStore("review", {
  state: () => ({
    users: [],
    reviews: [], // reviews cho product hiện tại đang xem
    reviewsByProduct: {}, // Cache reviews theo productId: { [productId]: [reviews] }
    guests: [],
    loading: false,
    error: null,
    currentProductId: null, // Track product hiện tại
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

    // Reviews - Fetch reviews cho một product cụ thể
    async fetchReviewsByProduct(productId) {
      this.loading = true;
      try {
        // Set current product
        this.currentProductId = productId;

        // Kiểm tra cache trước
        if (this.reviewsByProduct[productId]) {
          this.reviews = this.reviewsByProduct[productId];
          this.loading = false;
          return;
        }

        const response = await axios.get(
          `${APIURL}/reviews?productId=${productId}`
        );

        const productReviews = response.data;

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

    // Fetch tất cả reviews (dùng cho cache hoặc admin)
    async fetchAllReviews() {
      this.loading = true;
      try {
        const response = await axios.get(`${APIURL}/reviews`);
        const allReviews = response.data;

        // Group reviews theo productId
        this.reviewsByProduct = allReviews.reduce((acc, review) => {
          const productId = review.productId;
          if (!acc[productId]) {
            acc[productId] = [];
          }
          acc[productId].push(review);
          return acc;
        }, {});

        // Không set vào this.reviews để tránh hiển thị tất cả
        // Chỉ set nếu có currentProductId
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
        

        // Thêm vào cache
        if (!this.reviewsByProduct[productId]) {
          this.reviewsByProduct[productId] = [];
        }
        this.reviewsByProduct[productId].unshift(addedReview);


        // // Nếu đang xem product này thì cập nhật reviews hiển thị
        // if (this.currentProductId === productId) {
        //   this.reviews.unshift(addedReview);
        // }

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
