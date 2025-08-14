<template>
    <!-- SẢN PHẨM TƯƠNG TỰ (NẰM TRÊN) -->
  <div class="similar-productsLap">
  <h2>Sản phẩm tương tự</h2>
  <div class="slider-containerLap">
    <button class="nav-button left" @click="scrollLeft">❮</button>

    <div class="product-listLap" ref="carousel">
      <ProductItem
        v-for="sp in similarProducts"
        :key="sp.id"
        :laptop="sp"
      />
    </div>

    <button class="nav-button right" @click="scrollRight">❯</button>
  </div>
</div>


  <!-- THÔNG TIN SẢN PHẨM VÀ TIN TỨC (NẰM DƯỚI, NẰM NGANG NHAU) -->
  <div class="product-infoLap">
    <div class="info-left">
      <div class="product-info-1" v-if="productInfo">
      <h2>Thông số kỹ thuật</h2>
        <ul class="specs">
        <li><strong>CPU:</strong> {{ productInfo.CPU }}</li>
        <li><strong>RAM:</strong> {{ productInfo.RAM }}</li>
        <li><strong>Ổ cứng:</strong> {{ productInfo.Ocung }}</li>
        <li><strong>Card:</strong> {{ productInfo.Card }}</li>
        <li><strong>Màn hình:</strong> {{ productInfo.ManHinh }}</li>
        <li><strong>Hệ điều hành:</strong> {{ productInfo.HeDieuHanh }}</li>
        <li><strong>Pin:</strong> {{ productInfo.Pin }}</li>
        <li><strong>Trọng lượng:</strong> {{ productInfo.TrongLuong }}</li>
        <li><strong>Màu sắc:</strong> {{ productInfo.MauSac }}</li>
        <li><strong>Kích thước:</strong> {{ productInfo.KichThuoc }}</li>
        </ul>
    </div>

    </div>

    <div class="info-right">
      <h2>Tin tức sản phẩm</h2>
      <ul>
        <li>🔥 Khuyến mãi cuối tuần</li>
        <li>🆕 Hàng mới về tháng này</li>
        <li>⭐ Đánh giá từ khách hàng nổi bật</li>
      </ul>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProducts } from '@/stores/productsAPI'
import ProductItem from '../components/ProductItem.vue'

const store = useProducts()

// eslint-disable-next-line no-undef
const props = defineProps({
  productId: Number
});

// Sản phẩm tương tự
const similarProducts = computed(() => {
  if (!store.productDetail) return []
  return store.laptop.filter(
    sp => sp.id !== store.productDetail.id 
  )
})

// Thông tin sản phẩm từ bảng information
const productInfo = computed(() => {
  if (!store || !store.information) return null;
  return store.information.find(info => info.Product_id === Number(props.productId));
});

console.log("productId:", props.productId)
console.log("store.information:", store.information)
console.log("productInfo:", productInfo.value)


// Carousel
const carousel = ref(null)
const scrollLeft = () => {
  carousel.value.scrollBy({ left: -300, behavior: 'smooth' })
}
const scrollRight = () => {
  carousel.value.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>

<style scoped>
.similar-productsLap {
  margin: 10px 120px;
  background: #fff;
}

.slider-containerLap {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.product-listLap {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  scrollbar-width: none; /* Firefox */
}

.product-listLap::-webkit-scrollbar {
  display: none; /* Chrome */
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 50%;
}

.nav-button.left {
  left: -10px;
}

.nav-button.right {
  right: -10px;
}

/* THÔNG TIN & TIN TỨC NẰM NGANG */
.product-infoLap {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin: 20px 100px;
  align-items: flex-start;
}

/* Bên trái: Thông tin sản phẩm */
.info-left {
  flex: 2;
  background-color: #fff;
  text-align: left;
  padding: 10px;
}

.info-left h2 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

/* Danh sách thông số kỹ thuật */
.specs {
  list-style: none;
  padding: 0;
  margin: 0;
}

.specs li {
  display: flex;
  align-items: flex-start; /* hoặc center nếu bạn muốn căn giữa theo chiều cao */
  margin-bottom: 10px;
}

.specs li strong {
  width: 150px; /* Cố định chiều rộng cho tất cả */
  flex-shrink: 0;
  padding: 4px 8px;
  background-color: cornsilk;
  border-radius: 4px;
  font-weight: bold;
  text-align: left;
  color: #333;
}


/* Bên phải: Tin tức */
.info-right {
  flex: 1;
  position: sticky;
  top: 100px;
  height: fit-content;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.info-right ul {
  list-style: none;
  text-align: left;
}

</style>
