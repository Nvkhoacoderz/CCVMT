<template>
  <!-- <div class="banner-top">
        <img id="banner-top-1"
            src="https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_web_slider_800x400.jpg">
        <img id="banner-top-2"
            src="https://file.hstatic.net/200000722513/file/thang_06_laptop_gaming_800x400_-_web_slider.jpg">
        <img id="banner-top-3"
            src="https://file.hstatic.net/200000722513/file/gearvn-laptop-gigabyte-rtx-50-series-slider-t7.jpg">
        <img id="banner-top-4"
            src="https://file.hstatic.net/200000722513/file/gearvn-acer-back-to-school-2025-slider.jpg">
        <img id="banner-top-5"
            src="https://file.hstatic.net/200000722513/file/gearvn-msi-amg-slider.jpg">
        <img id="banner-top-6"
            src="https://file.hstatic.net/200000722513/file/thang_06_800x400_-_web_slider.png">
        <img id="banner-top-7"
            src="https://file.hstatic.net/200000722513/file/thu_cu_doi_moi_banner_web_slider_800x400.jpg">
        <img id="banner-top-8"
            src="https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_web_slider_800x400.jpg">
        <img id="banner-top-9"
            src="https://file.hstatic.net/200000722513/file/thang_06_peri_800x400_-_web_slider.png">
        <div class="slider-nav">
            <a href="#banner-top-1"></a>
            <a href="#banner-top-2"></a>
            <a href="#banner-top-3"></a>
            <a href="#banner-top-4"></a>
            <a href="#banner-top-5"></a>
            <a href="#banner-top-6"></a>
            <a href="#banner-top-7"></a>
            <a href="#banner-top-8"></a>
            <a href="#banner-top-9"></a>
        </div>
    </div> -->
  <div class="product-card">
    <img
      :src="require(`@/assets/image/${props.product.hinh}`)"
      :alt="props.product.tensp"
    />
    <div
      class="product-info"
      v-if="props.product && props.product.hinh"
      @click="goToDetail()"
    >
      <h2>{{ props.product.tensp }}</h2>
      <p class="product-price">
        {{ props.product.gia.toLocaleString() }}₫
        <span v-if="props.product.gia_cu" class="old-price"
          >{{ props.product.gia_cu.toLocaleString() }}₫</span
        >
      </p>
      <div class="product-specs">
        <span class="spec">{{ kichthuocValue }}</span>
        <span class="spec">{{ ramValue }}</span>
        <span class="spec">{{ sizeValue }}</span>
      </div>
      <div class="s-member-box">Smember giảm đến 300.000đ</div>
      <div class="installment-info">
        Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6...
      </div>
      <div class="product-actions">
        <span class="rating">
          <i class="fa fa-star"></i>
          {{ reviewStore.averageRatingByProduct(product.id) }}
        </span>
        <a href="#" class="favorite-btn">
          <i class="fa fa-heart-o"></i> Yêu thích
        </a>
      </div>
      <a href="#" class="buy-btn">Mua ngay</a>
    </div>
    <div v-else class="product product--empty">
      <span>Sản phẩm không hợp lệ</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "../stores/productAPI.js";
import { useAppStore } from "@/stores/reviewsAPI.js";
const router = useRouter();
const store = useProductsStore();
const reviewStore = useAppStore();

// const productReviews = computed(() =>
//   reviewStore.reviews.filter((r) => r.productId === props.product.id)
// );

onMounted(() => {
  reviewStore.fetchAllReviews();
});

// const productAverageRating = computed(() => {
//   if (productReviews.value.length === 0) return "0.0";
//   const sum = productReviews.value.reduce((acc, r) => acc + r.rating, 0);
//   return (sum / productReviews.value.length).toFixed(1);
// });

function goToDetail() {
  router.push({ name: "MobileDetail", params: { id: props.product.id } });
}

function randomItem(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// eslint-disable-next-line no-undef
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  ram: {
    type: String,
    required: false,
  },
  kichthuoc: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  bh: {
    type: String,
    required: false,
  },
  anh: {
    type: String,
    required: false,
  },
});
const sizeValue = computed(() => {
  if (props.size) return props.size;
  if (store.size.length > 0) return randomItem(store.size)?.name;
  return "";
});

const ramValue = computed(() => {
  if (props.ram) return props.ram;
  if (store.ram.length > 0) return randomItem(store.ram)?.name;
  return "";
});

const kichthuocValue = computed(() => {
  if (props.kichthuoc) return props.kichthuoc;
  if (store.kichthuoc.length > 0) return randomItem(store.kichthuoc)?.name;
  return "";
});
</script>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".slider-nav a");
  const images = document.querySelectorAll(".banner-top img");
  const total = navLinks.length;

  let currentIndex = 0;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.style.opacity = i === index ? 1 : 0;
    });
    navLinks.forEach((link, i) => {
      if (i === index) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  let autoInterval;

  function startAuto() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % total;
      showSlide(currentIndex);
    }, 3000); // Change every 3 seconds
  }

  // Handle clicks
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      currentIndex = index;
      showSlide(currentIndex);
      startAuto(); // Restart auto from the new position
    });
  });

  // Initial setup
  showSlide(currentIndex);
  startAuto();
});
</script>

<style scoped>
.banner-top {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100%;
  position: relative;
  height: 332px;
  overflow: hidden;
  flex-shrink: 0;
}

.banner-top img {
  width: 100%;
  flex-shrink: 0;
  scroll-snap-align: start;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.banner-top img:target {
  opacity: 0;
}

.banner-top img:hover {
  opacity: 1 !important;
}

/* Default show first image */
.banner-top img:first-child {
  opacity: 1;
}

.slider-nav {
  position: absolute;
  top: 315px;
  /* Position near the bottom of the 400px banner-top; adjust if nav height changes */
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  /* z-index: 10; */
  align-items: center;
}

.slider-nav a {
  width: 10px;
  /* Adjust width for rectangle */
  height: 10px;
  /* Make height smaller for a flat rectangle */
  background-color: #ccc;
  border-radius: 50%;
  /* margin: 3px 5px; */
  /* Set to 0 for sharp rectangle corners */
  margin: 0 5px;
  display: block;
  text-indent: -9999px;
  transition: width 0.3s, height 0.3s, border-radius 0.3s, background 0.3s,
    opacity 0.3s;
  /* Hide text */
}

.slider-nav a.active {
  background-color: #be1529;
  width: 20px;
  height: 5px;
  border-radius: 0;
}

.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(30, 41, 59, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center all inner items horizontally */
  transition: box-shadow 0.2s, transform 0.2s;
  width: 100%;
  position: relative;
  border: 1px solid #e3eaf3;
  padding: 0;
  min-height: 430px; /* Ensure all cards are the same height */
  justify-content: flex-start;
}

.product-card img {
  width: 100%;
  max-width: 220px; /* Restrict max width for card image */
  height: 200px;
  object-fit: contain;
  padding: 16px 16px 0 16px;
  border-radius: 12px;
  background: #fff;
  display: block;
  margin: 0 auto;
}

.product-info {
  padding: 12px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: pointer;
  align-items: center; /* Center children horizontally */
  width: 100%;
}

/* Name - always center, bold, min height for alignment */
.product-info h2 {
  font-size: 1.13rem;
  color: #222;
  margin: 0 0 5px 0;
  font-weight: 700;
  min-height: 48px;
  line-height: 1.2;
  text-align: center;
  width: 100%;
}

/* Price - bold, big, pink, center */
.product-price {
  color: #e11d48;
  font-size: 1.35rem;
  font-weight: bold;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

/* Old price if available */
.old-price {
  color: #b6b6b6;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 8px;
  text-decoration: line-through;
}

/* Specs - center, horizontal pills */
.product-specs {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  justify-content: center;
  width: 100%;
}

.spec {
  display: inline-block;
  background: #f5f7fa;
  color: #222;
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 8px;
  text-wrap: nowrap;
  border: 1px solid #e3eaf3;
  font-weight: 500;
  margin-bottom: 2px;
}

/* Smember box - blue bg, center */
.s-member-box {
  background: #e9f1fb;
  color: #1877f2;
  font-size: 0.98rem;
  border-radius: 7px;
  padding: 5px 10px;
  margin-bottom: 6px;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

/* Installment info - gray bg, center, 1 line */
.installment-info {
  color: #42526e;
  background: #f6f6f6;
  font-size: 0.97rem;
  border-radius: 7px;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: center;
}

/* Actions (rating, favorite) - center horizontally */
.product-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
  width: 100%;
}

.rating {
  color: #ffbe00;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 2px;
}

.favorite-btn {
  color: #1877f2;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3px;
}

.favorite-btn:hover {
  text-decoration: underline;
}

/* Buy button - full width, bold, big, rounded, center text, red */
.buy-btn {
  display: block;
  text-align: center;
  background: #e11d48;
  color: #fff;
  text-decoration: none;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background 0.2s;
  margin-top: 8px;
  width: 100%;
  font-size: 1.18rem;
}

.buy-btn:hover {
  background: #be123c;
}

/* Invalid product placeholder style */
.product--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 430px;
  width: 100%;
  color: #b3b3b3;
  font-size: 1.2rem;
}
</style>
