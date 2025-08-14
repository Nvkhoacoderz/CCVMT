<template>
  <div
    v-if="store.productDetail && store.productDetail.img"
    class="product-detail"
  >
    <div class="product-detail__content">
      <div class="image-box">
        <!-- Hình ảnh -->
        <div class="img-slider">
          <button @click="prevImg">←</button>
          <img
            :src="
              require(`@/assets/image/phu-kien/${
                currentImgIndex === 0
                  ? store.productDetail.img.img1
                  : store.productDetail.img.img2
              }`)
            "
            :alt="store.productDetail.name"
          />
          <button @click="nextImg">→</button>
        </div>
      </div>

      <div class="info-box">
        <h1 class="product-title">{{ store.productDetail.name }}</h1>
        <p class="price">
          Tổng giá: {{ store.productDetail.price.toLocaleString() }} VND
        </p>
        <div class="thong_so_ky_thuat">
          <strong>Thông số kỹ thuật</strong>
          <ul>
            <li>
              <strong>Màu sắc: </strong>
              {{ store.productDetail.color }}
            </li>
            <li>
              <strong>Trọng lượng: </strong>{{ store.productDetail.weight }}
            </li>
            <li>
              <strong>Công suất: </strong>{{ store.productDetail.output }}
            </li>
            <li>
              <strong>Bảo hành : </strong>{{ store.productDetail.warranty }}
            </li>
          </ul>
        </div>

        <div>
          <button class="add-cart-btn" @click="addToCart">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { userAPI } from "../stores/userAPI";
import { useRoute } from "vue-router";
import { useStores } from "../stores/useProductAPI";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();
const route = useRoute();
const store = useStores();
const storeUser = userAPI();

const currentImgIndex = ref(0);

onMounted(async () => {
  const id = Number(route.params.id);
  await Promise.all([store.fetchPhuKienDetail(id)]);
});

onUnmounted(() => {
  store.resetProductDetail();
});

function nextImg() {
  currentImgIndex.value = (currentImgIndex.value + 1) % 2;
}

function prevImg() {
  currentImgIndex.value = (currentImgIndex.value + 1) % 2;
}

function addToCart() {
  if (!store.productDetail) return;
  if (!storeUser.user) {
    alert("Bạn phải đăng nhập để thêm vào giỏ hàng");
    return;
  }
  cartStore.addToCart({
    id: store.productDetail.id,
    type: "3",
    name: store.productDetail.name,
    image: store.productDetail.img.img1,
    price: store.productDetail.price,
  });

  alert("da them thanh cong");
}
</script>

<style scoped>
.product-detail {
  background: #fff;
  padding: 32px;
  margin: 10px 120px;
}

.product-detail__content {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

/* Bên trái: hình ảnh */
.img-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  width: 100%;
}

.img-slider img {
  width: 100%;
  height: 400px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.img-slider button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.img-slider button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Bên phải: thông tin sản phẩm */
.product-info {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  text-align: left;
}

/* Tên sản phẩm */
.product-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
}

/* Giá */
.price {
  font-size: 30px;
  font-weight: bold;
  color: #d0021b;
}

/* Nút thêm vào giỏ */
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

.info-box .thong_so_ky_thuat {
  color: black;
  font-size: 27px;
}

.info-box .thong_so_ky_thuat ul li {
  list-style: none;
  text-align: left;
}
</style>
