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
              require(`@/assets/image/man-hinh/${
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
              <strong>Nhà sản xuất: </strong>
              {{ store.productDetail.manufactory.toUpperCase() }}
            </li>
            <li>
              <strong>Kích thước: </strong>{{ store.productDetail.stats.size }}
            </li>
            <li>
              <strong>Tần số quét: </strong
              >{{ store.productDetail.stats.refreshRate }}
            </li>
            <li>
              <strong>Tấm nền: </strong
              >{{ store.productDetail.stats.screenType }}
            </li>
            <li>
              <strong>Hỗ trợ đổi mới trong: </strong
              >{{ store.productDetail.support }} ngày
            </li>
            <li>
              <strong>Bảo hành : </strong>{{ store.productDetail.warranty }}
            </li>
          </ul>
        </div>

        <div>
          <button class="add-cart-btn" @click="addToCart()">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStores } from "../stores/useProductAPI";
import { useCartStore } from "../stores/cart";
import { userAPI } from "../stores/userAPI";

const storeUser = userAPI();

const cartStore = useCartStore();

const route = useRoute();
const store = useStores();

const currentImgIndex = ref(0);

onMounted(async () => {
  const id = Number(route.params.id);
  await Promise.all([store.fetchManHinhDetail(id)]);
});

console.log("Prouct detail ", store.productDetail);

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
    type: "4",
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
  border-radius: 10px;
  box-shadow: #ccc 2px 2px;
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
  flex-wrap: nowrap;
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
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.img-slider button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Bên phải: thông tin sản phẩm */
.info-box {
  flex: 1;
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
  text-align: center;
}

/* Giá */
.price {
  font-size: 30px;
  font-weight: bold;
  color: #d0021b;
  text-align: center;
  padding-bottom: 10px;
}

/* Nút thêm vào giỏ */
.add-cart-btn {
  margin-top: 10px;
  padding: 12px 24px;
  background-color: #d0021b;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
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
