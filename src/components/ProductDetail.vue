<template>
  <div class="product-detailLap" v-if="store.productDetail">
    <div class="detail-content">
      <div class="image-box">
        <!-- Hình ảnh -->
        <div>
          <img
            :src="require(`@/assets/${store.productDetail.hinh}`)"
            :alt="store.productDetail.tensp"
          />
        </div>
        <!-- Mua kèm sản phẩm -->
        <div class="mua-kem">
          <h3>Sản phẩm mua kèm:</h3>
          <div class="mua-kem-wrapper">
            <button class="arrow-btn left" @click="scrollLeft">‹</button>
            <div class="mua-kem-list" ref="muaKemList">
              <div
                class="mua-kem-item"
                v-for="item in store.muaKem"
                :key="item.id"
              >
                <img :src="require(`@/assets/${item.hinh}`)" :alt="item.ten" />
                <p>{{ item.ten }}</p>
                <button>Chọn sản phẩm</button>
              </div>
            </div>
            <button class="arrow-btn right" @click="scrollRight">›</button>
          </div>
        </div>
      </div>

      <!-- Thông tin sản phẩm -->
      <div class="info-box">
        <h1 class="product-title">{{ store.productDetail.tensp }}</h1>
        <p class="price">
          Tổng giá: {{ formatCurrency(store.productDetail.gia) }} VND
        </p>

        <div>
          <button class="add-cart-btn" @click="addToCart()">
            Thêm vào giỏ hàng
          </button>
        </div>

        <!-- Ưu đãi -->
        <div v-if="store.uudai && store.uudai.length">
          <ul>
            <li v-for="item in store.uudai" :key="item.id">
              ✔ {{ item.text }}
            </li>
          </ul>
        </div>

        <!-- Showroom -->
        <div v-if="store.showroom">
          <h3>Hệ thống Showroom</h3>
          <div>
            <h4>Showroom TP.HCM:</h4>
            <ul>
              <li
                v-for="(diachi, index) in store.showroom.HCM"
                :key="'hcm-' + index"
              >
                📍{{ diachi }}
              </li>
            </ul>
          </div>
          <div>
            <h4>Showroom Hà Nội:</h4>
            <ul>
              <li
                v-for="(diachi, index) in store.showroom.HN"
                :key="'hn-' + index"
              >
                📍 {{ diachi }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Nếu không tìm thấy -->
  <div v-else>
    <p>Không tìm thấy sản phẩm.</p>
  </div>
  <div>
    <ProductInfo
      v-if="store.productDetail"
      :product-id="store.productDetail.id"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProducts } from "../stores/productsAPI";
import { useCartStore } from "../stores/cart";
import ProductInfo from "../components/ProductInfo.vue";

const muaKemList = ref(null);
const router = useRoute();
const store = useProducts();
const cartStore = useCartStore();

async function loadProduct(id) {
  await Promise.all([
    store.fetchProductDetail(id),
    store.fetchCategory(),
    store.fetchInfoUudai(),
    store.fetchInfoShowroom(),
    store.fetchInformation(id),
    store.fetchInfoMuakem(),
  ]);
}

onMounted(() => {
  loadProduct(Number(router.params.id));
});

watch(
  () => router.params.id,
  (newId) => {
    loadProduct(Number(newId));
  }
);

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

// Thêm vào giỏ hàng theo mảng laptop
function addToCart() {
  const laptop = store.productDetail;
  if (!laptop) return;

  const product = {
    id: laptop.id,
    name: laptop.tensp,
    image: laptop.hinh ? `/assets/${laptop.hinh}` : "",
    price: laptop.gia,
    quantity: 1,
    note: "",
  };

  cartStore.addToCart(product);
  // alert("✅ Sản phẩm đã được thêm vào giỏ hàng!");
}

function scrollLeft() {
  if (muaKemList.value) {
    muaKemList.value.scrollBy({ left: -300, behavior: "smooth" });
  }
}

function scrollRight() {
  if (muaKemList.value) {
    muaKemList.value.scrollBy({ left: 300, behavior: "smooth" });
  }
}
</script>

<style scoped>
.product-detailLap {
  background: #fff;
  padding: 32px;
  margin: 10px 120px;
}

.detail-content {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

.image-box {
  flex: 1;
  max-width: 40%;
}
.image-box img {
  width: 100%;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.info-box {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.product-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #d0021b;
}

.add-cart-btn {
  padding: 12px 24px;
  background-color: #d0021b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.info-box h3 {
  margin-top: 20px;
  font-size: 20px;
  color: #333;
}
.info-box h4 {
  text-decoration: underline;
}

.info-box ul {
  padding-left: 0;
  list-style: none;
}

.info-box li {
  margin-bottom: 6px;
}

.mua-kem {
  margin-top: 40px;
}
.mua-kem h3 {
  color: #d0021b;
}

.mua-kem-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.mua-kem-list::-webkit-scrollbar {
  display: none;
}

.mua-kem-item {
  min-width: 180px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.mua-kem-item img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 8px;
}

.mua-kem-item p {
  margin-bottom: 8px;
  font-weight: 500;
}

.mua-kem-item button {
  background-color: #d0021b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.mua-kem-slider {
  position: relative;
  display: flex;
  align-items: center;
}

.mua-kem-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.arrow-btn {
  background: #d0021b;
  color: white;
  border: none;
  font-size: 24px;
  font-weight: bold;
  width: 36px;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

.arrow-btn.left {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.arrow-btn.right {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.mua-kem-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px;
  flex: 1;
}

@media (max-width: 768px) {
  .detail-content {
    flex-direction: column;
  }
  .image-box,
  .info-box {
    max-width: 100%;
  }
}
</style>
