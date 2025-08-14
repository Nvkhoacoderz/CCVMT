<template>
  <div class="review-section">
    <h3 class="section-title">Bình luận và đánh giá</h3>

    <!-- Form review -->
    <div class="review-form">
      <textarea
        placeholder="Hãy giúp chúng tôi đánh giá sản phẩm này!"
        v-model="comment"
      >
      </textarea>
      <div class="form-row">
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
          >
          </i>
        </span>
        <button class="btn-submit" @click="submitReview">Gửi</button>
      </div>
    </div>

    <!-- List reviews -->
    <div class="review-list" v-if="reviews.length">
      <h4>Bình Luận</h4>
      <div class="review-item" v-for="(r, index) in reviews" :key="index">
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
        <p class="date">
          Ngày: {{ new Date(r.createdAt).toLocaleDateString("vi-VN") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useAppStore } from "@/stores/reviewsAPI"; // store review
import { useRoute } from "vue-router"; // import useRoute

const reviewStore = useAppStore();
const route = useRoute();

const comment = ref("");
const name = ref("");
const email = ref("");
const rating = ref(0);

// Lấy productId từ router params
const productId = computed(() => Number(route.params.id) || null);

// Khi component mount hoặc productId thay đổi thì fetch review
onMounted(() => {
  if (productId.value) {
    reviewStore.fetchReviewsByProduct(productId.value);
  }
});
watch(productId, (newId) => {
  if (newId) {
    reviewStore.fetchReviewsByProduct(newId);
  }
});

async function submitReview() {
  if (!productId.value) {
    alert("Không xác định được sản phẩm để đánh giá!");
    return;
  }
  if (!name.value || !email.value || !comment.value || rating.value === 0) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    await reviewStore.addReview({
      productId: productId.value,
      name: name.value,
      email: email.value,
      rating: rating.value,
      comment: comment.value,
      isGuest: true,
    });

    // Reset form
    comment.value = "";
    name.value = "";
    email.value = "";
    rating.value = 0;
    //Sau khi gửi thì fetch lại review
    // reviewStore.fetchReviewsByProduct(productId.value);
  } catch (err) {
    console.error(err);
    alert("Không thể gửi đánh giá!");
  }
}

const reviews = computed(() => reviewStore.reviews);
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

.review-list {
  margin-top: 20px;
  flex-direction: column;
}

.review-list h4 {
  font-size: 20px;
  margin-bottom: 10px;
  border-bottom: 2px solid #e74c3c;
}

.review-list .review-stars {
  color: orange;
  margin-left: 34px;
  margin-top: -5px;
}

.fa-star {
  font-size: 16px;
}
.review-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.review-item p {
  margin-top: 20px;
  margin-left: 35px;
}

.review-item .date {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}
.review-item svg {
  width: 30px; /* Tăng kích thước icon */
  height: 30px;
  color: #555; /* Màu xám đậm */
  vertical-align: middle; /* Căn giữa theo chữ */
  margin-right: 8px; /* Khoảng cách với chữ */
}
</style>
