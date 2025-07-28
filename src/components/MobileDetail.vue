<template>
    <div class="main-content" v-if="store.MobileDetail">
        <div class="product-title">
            <h1>{{ store.MobileDetail.tensp }} | Chính hãng VN/A</h1>
            <div class="product-rating">
                <span class="star">★</span>
                <span>4.9</span>
                <span>(325 đánh giá)</span>
            </div>
            <div class="product-actions">
                <a href="#">Yêu thích</a>
                <a href="#">Hỏi đáp</a>
                <a href="#">Thông số</a>
                <a href="#">So sánh</a>
            </div>
        </div>
        <div class="product-section">
            <div class="product-info">
                <div class="product-image">
                    <img v-if="sliderImages.length > 0"
                    :src="`/assets/image/${sliderImages[currentImgIndex].hinh}`"
                    :alt="sliderImages[currentImgIndex].ten"
                    />
                    <span v-else>Không có ảnh</span>
                </div>
                <div class="product-thumbnails" v-if="sliderImages.length > 1">
                        <button class="nav-button prev" @click="prevImg" :disabled="sliderImages.length === 0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left-icon lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
                        </button>
                        <div
                            v-for="(img, idx) in sliderImages"
                            :key="img.hinh"
                            :class="['product-thumb', {active: idx === currentImgIndex}]"
                            @click="currentImgIndex = idx"
                        >
                            <img :src="`/assets/image/${img.hinh}`" :alt="img.ten" />
                        </div>
                        <button class="nav-button next" @click="nextImg" :disabled="sliderImages.length === 0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right-icon lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                        </button>
                </div>
                <div class="nav">
                    <span>{{ currentImgIndex + 1 }}/{{ sliderImages.length }}</span>
                </div>
            </div>
            <div class="product-buy">
                <div class="price-box">
                    <span>Giá sản phẩm</span>
                    <div class="bottom-price">
                        <span class="price">{{ store.MobileDetail.gia }}₫</span>
                        <span class="old-price">{{ store.MobileDetail.gia_cu }}₫</span>
                    </div>
                </div>
                <div class="option-group">
                    <span class="option-label">Phiên bản</span>
                    <div class="option-select">
                        <button v-for="size in store.size" :key="size.id"
                        :class="['option-select button' ,{active:Number(selectedSize) == Number(size.id)}]"
                        @click="selectedSize = size.id" type="button"
                        >
                        {{ size.name }} ( + {{ size.gia.toLocaleString() }}₫ )
                        </button>
                    </div>
                </div>
                <div class="option-group">
                    <span class="option-label">Màu sắc</span>
                    <div class="option-select color">
                        <button v-for="color in store.color" :key="color.id"
                        :class="['option-select.color button' ,{active:Number(selectedColor) == Number(color.id)}]"
                        @click="selectedColor = color.id" type="button"
                        >
                        {{ color.name }} ( + {{ color.gia.toLocaleString() }}₫ )
                        </button>
                    </div>
                </div>
                <div class="option-group">
                    <span class="option-label">Chọn gói bảo hành</span>
                    <div class="option-select baohanh">
                        <button v-for="bh in store.baohanh" :key="bh.id"
                        :class="['option-select.baohanh button' ,{active:Number(selectedBH) == Number(bh.id)}]"
                        @click="selectedBH = bh.id" type="button"
                        >
                        {{ bh.ten }} ( + {{ bh.price.toLocaleString() }}₫ )
                        </button>
                    </div>
                </div>
                <div class="buy-group">
                    <button class="add-cart-btn" @click="addToCart()">Thêm vào giỏ hàng</button>
                    <button class="buy-btn" @click="addToCart()">Mua</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="no-product">
        <h2>Không tìm thấy sản phẩm</h2>
    </div>
</template>

<script setup>
import { ref} from 'vue';
import { useProductsStore } from '../stores/productAPI';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const selectedSize = ref(null);
const selectedColor = ref(null);
const selectedBH = ref(null);
const sliderImages = ref([]);
const currentImgIndex = ref(0);

const router = useRoute();
const store = useProductsStore();
onMounted(async() => {
  const id = Number(router.params.id);
  console.log(id);
  await Promise.all([
    // Gọi API để lấy thông tin sản phẩm theo id
    store.fetchProductDetail(id),
    store.fetchSize(),
    store.fetchRam(),
    store.fetchKichThuoc(),
    store.fetchColor(),
    store.fetchBaohanh(),
    store.fetchImage()
  ])
 sliderImages.value = store.image.filter(img => Number(img.product_id) === Number(id));
 console.log('sliderImages', sliderImages.value);
  currentImgIndex.value = 0;
});

function nextImg() {
  if (sliderImages.value.length === 0) return;
  currentImgIndex.value = (currentImgIndex.value + 1) % sliderImages.value.length;
}
function prevImg() {
  if (sliderImages.value.length === 0) return;
  currentImgIndex.value =
    (currentImgIndex.value - 1 + sliderImages.value.length) % sliderImages.value.length;
}
</script>

<style scope>
body {
    background: #fff;
}
.main-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
}

/* Tiêu đề sản phẩm */
.product-title h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 30px;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    color: #444;
    margin-bottom: 10px;
}

.product-rating .star {
    color: #f5b400;
    font-size: 18px;
}

.product-actions {
    display: flex;
    gap: 15px;
    margin-top: 5px;
}

.product-actions a {
    text-decoration: none;
    color: #0071e3;
    font-size: 14px;
}

/* Khối thông tin sản phẩm */
.product-section {
    display: flex;
    gap: 30px;
    margin-top: 20px;
}

/* Hình ảnh */
.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-image {
    width: 600px;
    height: 372px;
    background: #fff;
    border-radius: 18px;
    border: 1.5px solid #e3e8ee;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.product-image img {
    max-width: 340px;
    max-height: 335px;
    margin: auto;
    display: block;
    background: transparent;
    width: 600px;
    height: auto;
    object-fit: cover;
}

.product-thumbnails {
    display: flex;
    gap: 14px;
    margin-top: 12px;
    margin-bottom: 6px;
    width: 100%;
    justify-content: center;
}

.product-thumb {
    width: 62px;
    height: 62px;
    background: #fff;
    border: 1.5px solid #e3e8ee;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border 0.2s;
}
.product-thumb img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    display: block;
}
.product-thumb.active {
    border: 2.5px solid #d0021b;
}
.product-thumb:hover {
    border-color: #d0021b;
}

.nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
}

.nav span {
    font-weight: bold;
    margin-left:288px;
}

.nav-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px; /* Kích thước icon hoặc chữ */
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-top:10px;
}

.nav-button:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
}

.nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Khối mua hàng */
.product-buy {
    flex: 1;
}

.price-box {
    display: flex;
    flex-direction: column; /* xếp theo cột */
    gap: 6px;
    margin-bottom: 25px;
    background: #f7fbff;
    border: 1.5px solid #bad2f6;
    border-radius: 16px;
    padding: 18px 20px 12px 20px;
    box-sizing: border-box;
    width: 60%;
}

/* bọc 2 giá dưới nằm ngang */
.price-box .bottom-price {
    display: flex;
    /* align-items: baseline; căn cho giá cũ thấp hơn */
    gap: 0;
    height: 40px;
    padding-top: 3px;
    justify-content: space-between; /* Đẩy old-price ra cạnh phải */
    align-items: center; 
}

.price-box .price {
    font-size: 35px;
    font-weight: bold;
    color: #111;
    line-height: 1.1;
    margin-right: 8px;
}

.price-box .old-price {
    font-size: 18px;
    color: #b8b8b8;
    text-decoration: line-through;
    font-weight: 400;
}

/* Nhóm tùy chọn */
.option-group {
    margin-bottom: 20px;
}

.option-label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: #d0021b;
}

.option-select {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.option-select button {
    padding: 8px 14px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    color: #444;
    font-weight: bold;
}

.option-select button:hover {
    border-color: #0071e3;
}

.option-select button.active {
    border: 2.5px solid #d0021b;
    color: #d0021b;
    background: #fff4f5;
    font-weight: bold;
}
/* .option-select button.active,
        .option-select.color button.active {
            border: 2.5px solid #e7222e;
            color: #e7222e;
            background: #fff4f5;
            font-weight: bold;
            padding: auto;
        } */

        /* Chỉ chỉnh phần nút chọn màu sắc cho giống ảnh CellphoneS */

.option-select.color {
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 0;
}

/* .option-select.color button {
    min-width: 170px;
    min-height: 30px;
    padding: 10px 20px;
    border-radius: 12px;
    border: 2px solid #e5e5e5;
    background: #fff;
    color: #444;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 8px;
    transition: border 0.2s, background 0.2s, color 0.2s;
    box-sizing: border-box;
    position: relative;
} */

/* Active: Viền đỏ, nền nhạt, chữ đỏ đậm */
.option-select.color button.active {
    border: 2.5px solid #d0021b;
    color: #d0021b;
    background: #fff4f5;
    font-weight: bold;
}

/* Khi hover: viền đỏ, chữ đỏ */
.option-select.color button:hover {
    border-color: #d0021b;
    color: #d0021b;
}

/* Màu sắc */
/* .option-select.color button {
    display: flex;
    justify-content: space-between;
    width: 225px;
    padding: 8px 12px;
    font-weight: bold;
    color: #444;
} */

.option-select.color button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 150px;
    justify-content: center;
    gap: 3px;
    padding: 10px 16px;
    color: #444;
    font-weight: bold;
}

.option-select.baohanh button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 150px;
    justify-content: center;
    gap: 3px;
    padding: 10px 16px;
    color: #444;
    font-weight: bold;
}

.option-select.baohanh {
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 0;
}

.option-select.baohanh button:active {
    border: 2.5px solid #d0021b;
    color: #d0021b;
    background: #fff4f5;
    font-weight: bold;
}

/* .color-price {
    font-weight: bold;
    color: #444;
    padding: auto;
} */

/* Nhóm nút */
.buy-group .add-cart-btn,
.buy-group .buy-btn {
    width: 48%;
    padding: 12px 0;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Nút Thêm vào giỏ hàng */
.add-cart-btn {
    background: #0c2b44;
    color: #fff;
    border: 2px solid #d0021b;
    cursor: pointer;
    transition: background 0.2s;
}

.add-cart-btn:hover {
    background-color: #d0021b;
    color: #fff;
}

/* Nút Mua */
.buy-btn {
    background-color: #0c2b44;
    color: #fff;
    border: 2px solid #d0021b;
}

.buy-btn:hover {
    background-color: #d0021b;
    color: #fff;
}

.buy-group {
    display: flex;
    gap: 12px;
    margin-top: 15px;
}

.no-product {
    display: flex;
    justify-content: center;   /* Căn ngang */
    align-items: center;       /* Căn dọc */
    height: 60vh;              /* Chiều cao vùng hiển thị */
    text-align: center;
}

.no-product h2 {
    font-size: 40px;
    color: red;
    padding: 15px 25px;
    border-radius: 8px;
}

</style>