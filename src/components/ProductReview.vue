<template>
  <div class="review-section">
    <h3 class="section-title">Bình luận và đánh giá</h3>

    <!-- Form review -->
    <div class="review-form">
      <textarea
        placeholder="Hãy giúp chúng tôi đánh giá sản phẩm này!"
        v-model="comment"
      ></textarea>
      <div class="form-row" v-if="!isEditing">
        <input type="text" placeholder="Họ tên (bắt buộc)" v-model="name" />
        <input type="text" placeholder="Gmail" v-model="email" />
      </div>
      <div class="form-row">
        <label>Đánh giá:</label>
        <span class="stars">
          <i
            v-for="n in 5"
            :key="n"
            class="fa-star"
            :class="n <= rating ? 'fas' : 'far'"
            @click="rating = n"
          ></i>
        </span>
        <button class="btn-submit" @click="submitReview">
          {{ isEditing ? "Cập nhật" : "Gửi" }}
        </button>
        <button
          v-if="isEditing"
          class="btn-cancel"
          @click="cancelEdit"
          style="margin-left: 10px; background: #bbb; color: #222"
        >
          Hủy
        </button>
      </div>
    </div>

    <!-- Debug section - Remove after testing -->
    <div
      v-if="debugMode"
      style="background: #f0f0f0; padding: 10px; margin: 10px 0"
    >
      <h5>Debug Info:</h5>
      <p>Reviews count: {{ reviews.length }}</p>
      <div
        v-for="(r, index) in reviews"
        :key="index"
        style="margin: 5px 0; font-size: 12px"
      >
        Review {{ index + 1 }}: {{ r.name }} - Replies:
        {{ r.replies?.length || 0 }}
        <div v-if="r.replies?.length">
          <span v-for="rep in r.replies" :key="rep.id">
            "{{ rep.comment }}" |
          </span>
        </div>
      </div>
    </div>

    <!-- List reviews -->
    <div class="review-list" v-if="reviews.length">
      <h4>Bình Luận</h4>
      <div
        class="review-item"
        v-for="(r, index) in reviews"
        :key="r.id || index"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-badge"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
          />
          <path
            d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"
          />
        </svg>
        <strong>{{ r.name }}</strong>
        <div class="review-stars">
          <i
            v-for="n in 5"
            :key="n"
            class="fa-star"
            :class="n <= r.rating ? 'fas' : 'far'"
          ></i>
        </div>
        <p>{{ r.comment }}</p>
        <p class="date">Ngày: {{ formatDate(r.createdAt) }}</p>
        <!-- Nút sửa nếu là chủ review -->
        <template
          v-if="isLoggedIn && userStore.user && r.userId === userStore.user.id"
        >
          <button
            class="btn-edit"
            @click="startEditReview(r)"
            style="
              margin-top: 5px;
              background: #3498db;
              color: #fff;
              border-radius: 4px;
              padding: 4px 12px;
              border: none;
              cursor: pointer;
            "
          >
            Sửa
          </button>
        </template>

        <!-- FIX: Hiển thị replies -->
        <div
          class="review-replies"
          v-if="r.replies && Array.isArray(r.replies) && r.replies.length > 0"
        >
          <div class="review-reply" v-for="rep in r.replies" :key="rep.id">
            <strong>{{ rep.name }}</strong> trả lời:
            <span>{{ rep.comment }}</span>
            <span class="date">{{ formatDate(rep.createdAt) }}</span>
          </div>
        </div>

        <!-- Form trả lời -->
        <div class="reply-form" v-if="isLoggedIn">
          <input
            type="text"
            v-model="replyInputs[r.id]"
            :placeholder="`Trả lời bình luận của ${r.name}...`"
            style="margin-top: 5px; width: 60%"
            @keyup.enter.prevent="submitReply(r.id)"
          />
          <button
            @click.prevent="submitReply(r.id)"
            :disabled="
              !replyInputs[r.id] ||
              replyInputs[r.id].trim() === '' ||
              isSubmittingReply
            "
            style="
              margin-left: 5px;
              padding: 4px 12px;
              background: #27ae60;
              color: #fff;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
            :style="{
              opacity:
                !replyInputs[r.id] ||
                replyInputs[r.id].trim() === '' ||
                isSubmittingReply
                  ? 0.6
                  : 1,
              cursor:
                !replyInputs[r.id] ||
                replyInputs[r.id].trim() === '' ||
                isSubmittingReply
                  ? 'not-allowed'
                  : 'pointer',
            }"
          >
            {{ isSubmittingReply ? "Đang gửi..." : "Gửi trả lời" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!reviewStore.loading" class="empty-state">
      <p>
        Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="reviewStore.loading" class="loading-state">
      <p>Đang tải đánh giá...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive, nextTick } from "vue";
import { useAppStore } from "@/stores/reviewsAPI";
import { useRoute } from "vue-router";
import { userAPI } from "@/stores/userAPI";

const replyInputs = reactive({});
const userStore = userAPI();
const reviewStore = useAppStore();
const route = useRoute();

const comment = ref("");
const name = ref("");
const email = ref("");
const rating = ref(0);

const isEditing = ref(false);
const editingReviewId = ref(null);
const isSubmittingReply = ref(false); // Thêm flag để prevent double submit
const debugMode = ref(false); // Set to true for debugging

const productId = computed(() => Number(route.params.id) || null);
const isLoggedIn = computed(() => userStore.isLoggedIn);
const reviews = computed(() => {
  console.log("Reviews computed:", reviewStore.reviews);
  return reviewStore.reviews;
});

// Helper function to format date
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString("vi-VN");
  } catch (error) {
    return "Không xác định";
  }
};

// FIX: Improved submitReply function với debounce
async function submitReply(reviewId) {
  // Prevent double submission
  if (isSubmittingReply.value) {
    console.log("Already submitting, ignoring...");
    return;
  }

  const replyComment = replyInputs[reviewId];

  if (!replyComment || replyComment.trim() === "") {
    alert("Vui lòng nhập nội dung trả lời!");
    return;
  }

  console.log("Submitting reply:", { reviewId, comment: replyComment });

  isSubmittingReply.value = true;

  try {
    const result = await reviewStore.addReply({
      reviewId,
      name: userStore.user?.name || userStore.user?.ten || "Admin",
      comment: replyComment.trim(),
      userId: userStore.user?.id || null,
    });

    console.log("Reply added successfully:", result);

    replyInputs[reviewId] = "";

    await nextTick();
  } catch (err) {
    console.error("Submit reply error:", err);
    alert("Không thể gửi trả lời! Vui lòng thử lại.");
  } finally {
    // Reset submitting flag after a small delay
    setTimeout(() => {
      isSubmittingReply.value = false;
    }, 1000);
  }
}

function startEditReview(review) {
  isEditing.value = true;
  editingReviewId.value = review.id;
  comment.value = review.comment;
  rating.value = review.rating;
  name.value = review.ten || review.name;
  email.value = review.email;
}

function cancelEdit() {
  isEditing.value = false;
  editingReviewId.value = null;
  comment.value = "";
  rating.value = 0;
  // Nếu đã đăng nhập thì giữ name/email
  if (isLoggedIn.value && userStore.user) {
    name.value = userStore.user.ten || userStore.user.name;
    email.value = userStore.user.email;
  } else {
    name.value = "";
    email.value = "";
  }
}

async function submitReview() {
  // Validate required fields
  if (!comment.value.trim()) {
    alert("Vui lòng nhập bình luận!");
    return;
  }

  if (!rating.value) {
    alert("Vui lòng chọn số sao đánh giá!");
    return;
  }

  if (!isLoggedIn.value && !name.value.trim()) {
    alert("Vui lòng nhập họ tên!");
    return;
  }

  if (isEditing.value && editingReviewId.value) {
    try {
      await reviewStore.updateReview({
        id: editingReviewId.value,
        comment: comment.value.trim(),
        name: name.value.trim(),
        email: email.value.trim(),
        rating: rating.value,
        productId: productId.value,
        userId: userStore.user?.id || null,
      });
      cancelEdit();
      // Fetch lại để có replies đầy đủ
      await reviewStore.fetchReviewsByProduct(productId.value);
    } catch (err) {
      console.error("Update review error:", err);
      alert("Không thể cập nhật đánh giá!");
    }
    return;
  }

  // Thêm mới
  try {
    await reviewStore.addReview({
      productId: productId.value,
      name: name.value.trim(),
      email: email.value.trim(),
      rating: rating.value,
      comment: comment.value.trim(),
      isGuest: !isLoggedIn.value,
      userId: userStore.user?.id || null,
    });

    // Reset form
    comment.value = "";
    rating.value = 0;
    if (!isLoggedIn.value) {
      name.value = "";
      email.value = "";
    }
  } catch (err) {
    console.error("Add review error:", err);
    alert("Không thể gửi đánh giá!");
  }
}

// Watchers
watch(productId, async (newId) => {
  if (newId) {
    console.log("Product ID changed, fetching reviews for:", newId);
    await reviewStore.fetchReviewsByProduct(newId);
  }
});

watch(
  () => userStore.user,
  (user) => {
    if (user) {
      name.value = user.name || user.ten;
      email.value = user.email;
    } else {
      if (!isEditing.value) {
        name.value = "";
        email.value = "";
      }
    }
  },
  { immediate: true }
);

// Lifecycle
onMounted(async () => {
  console.log("Component mounted, product ID:", productId.value);

  if (productId.value) {
    await reviewStore.fetchReviewsByProduct(productId.value);
  }

  if (isLoggedIn.value && userStore.user) {
    name.value = userStore.user.ten || userStore.user.name;
    email.value = userStore.user.email;
  }
});
</script>

<style scoped>
.review-section {
  max-width: 1350px;
  margin: auto;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-family: Arial, sans-serif;
}

.section-title {
  font-size: 20px;
  margin-bottom: 12px;
  border-bottom: 2px solid #e74c3c;
  display: inline-block;
  padding-bottom: 4px;
}

.review-form textarea {
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  resize: none;
  font-size: 14px;
  min-height: 80px;
}

.form-row {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.form-row input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

label {
  font-weight: bold;
  font-size: 20px;
  padding-top: 10px;
}

.stars {
  color: orange;
  cursor: pointer;
  padding-top: 13px;
}

.fa-star {
  margin-left: 4px;
  font-size: 18px;
  transition: color 0.2s;
}

.fa-star:hover {
  color: #ff8c00;
}

.btn-submit {
  margin-left: auto;
  background: #e74c3c;
  border: none;
  color: white;
  padding: 6px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
}

.btn-submit:hover {
  background: #c0392b;
}

.btn-cancel {
  background: #bbb;
  color: #222;
  border: none;
  font-size: 14px;
  font-weight: bold;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-cancel:hover {
  background: #999;
}

.review-list {
  margin-top: 20px;
  flex-direction: column;
}

.review-list h4 {
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #e74c3c;
  display: inline-block;
  padding-bottom: 4px;
}

.review-list .review-stars {
  color: orange;
  margin-left: 34px;
  margin-top: -5px;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}

.review-item p {
  margin-top: 8px;
  margin-left: 35px;
  line-height: 1.4;
}

.review-item .date {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.review-item svg {
  width: 30px;
  height: 30px;
  color: #555;
  vertical-align: middle;
  margin-right: 8px;
}

.btn-edit {
  margin-left: 35px;
  transition: background-color 0.2s;
}

.btn-edit:hover {
  background: #2980b9 !important;
}

.review-replies {
  margin-left: 40px;
  margin-top: 10px;
  border-left: 3px solid #e74c3c;
  padding-left: 15px;
}

.review-reply {
  background: #f9f9f9;
  border-radius: 5px;
  padding: 8px 12px;
  margin-bottom: 6px;
  border-left: 3px solid #27ae60;
}

.review-reply .date {
  font-size: 11px;
  color: #666;
  margin-left: 10px;
}

.reply-form {
  margin-left: 40px;
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.reply-form input {
  border: 1px solid #ddd;
  padding: 6px 10px;
  border-radius: 4px;
}

.reply-form button {
  transition: all 0.2s;
}

.reply-form button:hover:not(:disabled) {
  background: #219a52 !important;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
}

.loading-state {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
