<template>
  <div class="main-content" v-if="store.MobileDetail">
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-house-icon lucide-house"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path
            d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          />
        </svg>
        <span>Trang chủ</span>
      </router-link>
      <span class="breadcrumb-separator">/</span>
      <router-link
        :to="`/product/${store.MobileDetail.id}`"
        class="breadcrumb-link"
      >
        <span>Điện thoại</span>
      </router-link>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">
        {{ store.MobileDetail.tensp }}
      </span>
    </nav>
    <div class="product-title">
      <h1>{{ store.MobileDetail.tensp }} | Chính hãng VN/A</h1>
      <div class="product-rating">
        <span class="star">★</span>
        <span>{{
          reviewStore.reviews.length > 0 ? reviewStore.averageRating : "0.0"
        }}</span>
        <span>({{ reviewStore.reviews.length }} đánh giá)</span>
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
          <img
            v-if="sliderImages.length > 0"
            :src="`/assets/image/${sliderImages[currentImgIndex].hinh}`"
            :alt="sliderImages[currentImgIndex].ten"
          />
          <span v-else>Không có ảnh</span>
        </div>
        <div class="product-thumbnails" v-if="sliderImages.length > 1">
          <button
            class="nav-button prev"
            @click="prevImg"
            :disabled="sliderImages.length === 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevrons-left-icon lucide-chevrons-left"
            >
              <path d="m11 17-5-5 5-5" />
              <path d="m18 17-5-5 5-5" />
            </svg>
          </button>
          <div
            v-for="(img, idx) in sliderImages"
            :key="img.hinh"
            :class="['product-thumb', { active: idx === currentImgIndex }]"
            @click="currentImgIndex = idx"
          >
            <img :src="`/assets/image/${img.hinh}`" :alt="img.ten" />
          </div>
          <button
            class="nav-button next"
            @click="nextImg"
            :disabled="sliderImages.length === 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevrons-right-icon lucide-chevrons-right"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
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
            <span class="price">{{ totalPrice.toLocaleString() }}₫</span>
            <span class="old-price">{{ totalPrice1.toLocaleString() }}₫</span>
          </div>
        </div>
        <div class="option-group">
          <span class="option-label">Phiên bản</span>
          <div class="option-select">
            <button
              v-for="size in store.size"
              :key="size.id"
              :class="[
                'option-select button',
                { active: Number(selectedSize) == Number(size.id) },
              ]"
              @click="selectedSize = size.id"
              type="button"
            >
              {{ size.name }} ( + {{ size.gia.toLocaleString() }}₫ )
            </button>
          </div>
        </div>
        <div class="option-group">
          <span class="option-label">Màu sắc</span>
          <div class="option-select color">
            <button
              v-for="color in store.color"
              :key="color.id"
              :class="[
                'option-select.color button',
                { active: Number(selectedColor) == Number(color.id) },
              ]"
              @click="selectedColor = color.id"
              type="button"
            >
              {{ color.name }} ( + {{ color.gia.toLocaleString() }}₫ )
            </button>
          </div>
        </div>
        <div class="option-group">
          <span class="option-label">Chọn gói bảo hành</span>
          <div class="option-select baohanh">
            <button
              v-for="bh in store.baohanh"
              :key="bh.id"
              :class="[
                'option-select.baohanh button',
                { active: Number(selectedBH) == Number(bh.id) },
              ]"
              @click="selectedBH = bh.id"
              type="button"
            >
              {{ bh.ten }} ( + {{ bh.price.toLocaleString() }}₫ )
            </button>
          </div>
        </div>
        <div class="buy-group">
          <button class="add-cart-btn" @click="addToCart()">
            Thêm vào giỏ hàng
          </button>
          <button class="buy-btn" @click="goToPay()">Mua</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="no-product">
    <h2>Không tìm thấy sản phẩm</h2>
  </div>

  <div class="product-okey">
    <MobileProduct
      v-for="sp in store.product
        ? store.product
            .filter((p) => p.id !== store.MobileDetail?.id)
            .slice(0, 5)
        : []"
      :key="sp.id"
      :product="sp"
      @click="store.fetchProductDetail(sp.id)"
    />
  </div>

  <div class="specs-2col-container" v-if="productSpecs">
    <div class="specs-header">
      <h2>Thông số kỹ thuật</h2>
    </div>
    <div class="specs-tables">
      <table class="specs-table specs-table-left">
        <tbody>
          <tr>
            <th>Kích thước màn hình</th>
            <td>{{ productSpecs.display?.size || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Công nghệ màn hình</th>
            <td>{{ productSpecs.display?.technology || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Độ phân giải</th>
            <td>{{ productSpecs.display?.resolution || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Tần số quét</th>
            <td>{{ productSpecs.display?.refresh_rate || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Camera sau</th>
            <td>
              <template v-if="productSpecs.camera?.rear?.main?.megapixels">
                {{ productSpecs.camera.rear.main.megapixels }}
                <template
                  v-if="
                    productSpecs.camera.rear.main.features &&
                    productSpecs.camera.rear.main.features.length
                  "
                >
                  + {{ productSpecs.camera.rear.main.features.join(", ") }}
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Camera telephoto</th>
            <td>
              <template v-if="productSpecs.camera?.rear?.telephoto?.megapixels">
                {{ productSpecs.camera.rear.telephoto.megapixels }}
                <template v-if="productSpecs.camera.rear.telephoto.zoom">
                  (Zoom: {{ productSpecs.camera.rear.telephoto.zoom }})
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Camera góc rộng</th>
            <td>
              <template
                v-if="productSpecs.camera?.rear?.ultra_wide?.megapixels"
              >
                {{ productSpecs.camera.rear.ultra_wide.megapixels }}
                <template
                  v-if="
                    productSpecs.camera.rear.ultra_wide.features &&
                    productSpecs.camera.rear.ultra_wide.features.length
                  "
                >
                  +
                  {{ productSpecs.camera.rear.ultra_wide.features.join(", ") }}
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Camera trước</th>
            <td>
              <template v-if="productSpecs.camera?.front?.megapixels">
                {{ productSpecs.camera.front.megapixels }}MP
                <template
                  v-if="
                    productSpecs.camera.front.features &&
                    productSpecs.camera.front.features.length
                  "
                >
                  + {{ productSpecs.camera.front.features.join(", ") }}
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Chipset</th>
            <td>{{ productSpecs.processor?.chipset || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>CPU</th>
            <td>
              <template v-if="Array.isArray(productSpecs.processor?.cpu)">
                {{ productSpecs.processor.cpu.join(", ") }}
              </template>
              <template v-else>
                {{ productSpecs.processor?.cpu || "Đang cập nhật" }}
              </template>
            </td>
          </tr>
          <tr>
            <th>GPU</th>
            <td>{{ productSpecs.processor?.gpu || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Dung lượng RAM</th>
            <td>{{ productSpecs.storage?.RAM || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Bộ nhớ trong</th>
            <td>{{ productSpecs.storage?.internal || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>SIM</th>
            <td>{{ productSpecs.connectivity?.sim || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Mạng di động</th>
            <td>{{ productSpecs.connectivity?.network || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Wi-Fi</th>
            <td>{{ productSpecs.connectivity?.wifi || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Bluetooth</th>
            <td>
              {{ productSpecs.connectivity?.bluetooth || "Đang cập nhật" }}
            </td>
          </tr>
          <tr>
            <th>NFC</th>
            <td>{{ productSpecs.connectivity?.nfc || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>GPS</th>
            <td>
              <template v-if="Array.isArray(productSpecs.connectivity?.gps)">
                {{ productSpecs.connectivity.gps.join(", ") }}
              </template>
              <template v-else>
                {{ productSpecs.connectivity?.gps || "Đang cập nhật" }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="specs-table specs-table-right">
        <tbody>
          <tr>
            <th>Pin</th>
            <td>
              {{
                productSpecs.other_features?.charging?.battery ||
                "Đang cập nhật"
              }}
            </td>
          </tr>
          <tr>
            <th>Công nghệ sạc</th>
            <td>
              <template
                v-if="
                  productSpecs.other_features?.charging?.wireless &&
                  productSpecs.other_features.charging.wireless.length
                "
              >
                {{ productSpecs.other_features.charging.wireless.join(", ") }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Cổng sạc</th>
            <td>
              {{
                productSpecs.other_features?.charging?.port || "Đang cập nhật"
              }}
            </td>
          </tr>
          <tr>
            <th>Hệ điều hành</th>
            <td>{{ productSpecs.operating_system?.os || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Tính năng màn hình</th>
            <td>
              <template v-if="productSpecs.display?.features">
                {{ productSpecs.display.features.join(", ") }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Tính năng camera</th>
            <td>
              <template
                v-if="
                  productSpecs.camera?.rear?.camera_features &&
                  productSpecs.camera.rear.camera_features.length
                "
              >
                {{ productSpecs.camera.rear.camera_features.join(", ") }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Quay video</th>
            <td>
              <template
                v-if="
                  productSpecs.camera?.rear?.video_recording &&
                  productSpecs.camera.rear.video_recording.length
                "
              >
                {{ productSpecs.camera.rear.video_recording.join(", ") }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Kích thước (mm)</th>
            <td>
              <template v-if="productSpecs.dimensions">
                {{ productSpecs.dimensions.height || "—" }} x
                {{ productSpecs.dimensions.width || "—" }} x
                {{ productSpecs.dimensions.depth || "—" }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Trọng lượng</th>
            <td>{{ productSpecs.dimensions?.weight || "Đang cập nhật" }}</td>
          </tr>
          <tr>
            <th>Mặt lưng</th>
            <td>
              {{ productSpecs.dimensions?.back_material || "Đang cập nhật" }}
            </td>
          </tr>
          <tr>
            <th>Khung viền</th>
            <td>
              {{ productSpecs.dimensions?.frame_material || "Đang cập nhật" }}
            </td>
          </tr>
          <tr>
            <th>Tính năng khác</th>
            <td>
              <template
                v-if="
                  productSpecs.other_features?.special_features &&
                  productSpecs.other_features.special_features.length
                "
              >
                {{ productSpecs.other_features.special_features.join(", ") }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Âm thanh</th>
            <td>
              <template v-if="productSpecs.other_features?.audio">
                <template
                  v-if="Array.isArray(productSpecs.other_features.audio)"
                >
                  {{ productSpecs.other_features.audio.join(", ") }}
                </template>
                <template v-else>
                  {{ productSpecs.other_features.audio }}
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Cảm biến</th>
            <td>
              <template
                v-if="
                  productSpecs.other_features?.sensors &&
                  productSpecs.other_features.sensors.length
                "
              >
                {{ productSpecs.other_features.sensors.join(", ") }}
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Bảo mật/Sinh trắc</th>
            <td>
              <template v-if="productSpecs.other_features?.biometrics">
                <template
                  v-if="Array.isArray(productSpecs.other_features.biometrics)"
                >
                  {{ productSpecs.other_features.biometrics.join(", ") }}
                </template>
                <template v-else>
                  {{ productSpecs.other_features.biometrics }}
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Kháng nước/bụi</th>
            <td>
              {{
                productSpecs.other_features?.dust_water_resistance ||
                "Đang cập nhật"
              }}
            </td>
          </tr>
          <tr>
            <th>Thanh toán</th>
            <td>
              {{ productSpecs.other_features?.payment || "Đang cập nhật" }}
            </td>
          </tr>
          <tr>
            <th>Tương thích</th>
            <td>
              <template v-if="productSpecs.other_features?.compatibility">
                <template
                  v-if="
                    Array.isArray(productSpecs.other_features.compatibility)
                  "
                >
                  {{ productSpecs.other_features.compatibility.join(", ") }}
                </template>
                <template v-else>
                  {{ productSpecs.other_features.compatibility }}
                </template>
              </template>
              <template v-else>Đang cập nhật</template>
            </td>
          </tr>
          <tr>
            <th>Ngày ra mắt</th>
            <td>
              {{ productSpecs.G_information?.release_date || "Đang cập nhật" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <ProductReview />
</template>

<script setup>
import { watch, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useProductsStore } from "../stores/productAPI";
import { useRoute, useRouter } from "vue-router";
import MobileProduct from "../components/MobileProduct.vue";
import ProductReview from "../components/ProductReview.vue";
import { useAppStore } from "@/stores/reviewsAPI";
import { useCartStore } from "@/stores/cart";
import { userAPI } from "@/stores/userAPI";

const storeUser = userAPI();
const cartStore = useCartStore();
const selectedSize = ref(null);
const selectedColor = ref(null);
const selectedBH = ref(null);
const sliderImages = ref([]);
const currentImgIndex = ref(0);
const routers = useRouter();
const totalPrice = computed(() => {
  if (!store.MobileDetail) return 0;

  const base = Number(store.MobileDetail.gia) || 0;

  const sizeObj = store.size.find(
    (s) => Number(s.id) === Number(selectedSize.value)
  );
  const sizePrice = sizeObj ? Number(sizeObj.gia) : 0;

  const ramObj = store.color.find(
    (s) => Number(s.id) === Number(selectedColor.value)
  );
  const colorPrice = ramObj ? Number(ramObj.gia) : 0;

  const bhObj = store.baohanh.find(
    (s) => Number(s.id) === Number(selectedBH.value)
  );
  const bhPrice = bhObj ? Number(bhObj.price) : 0;

  return base + sizePrice + colorPrice + bhPrice;
});

const totalPrice1 = computed(() => {
  if (!store.MobileDetail) return 0;

  const base = Number(store.MobileDetail.gia_cu) || 0;

  const sizeObj = store.size.find(
    (s) => Number(s.id) === Number(selectedSize.value)
  );
  const sizePrice = sizeObj ? Number(sizeObj.gia) : 0;

  const ramObj = store.color.find(
    (s) => Number(s.id) === Number(selectedColor.value)
  );
  const colorPrice = ramObj ? Number(ramObj.gia) : 0;

  const bhObj = store.baohanh.find(
    (s) => Number(s.id) === Number(selectedBH.value)
  );
  const bhPrice = bhObj ? Number(bhObj.price) : 0;

  return base + sizePrice + colorPrice + bhPrice;
});
function goToPay() {
  if (!storeUser.user) {
    alert("Bạn phải đăng nhập để mua/đặt hàng!");
    routers.push("/Login");
    return;
  }
  // Kiểm tra sản phẩm đã chọn các option chưa
  if (!selectedSize.value || !selectedColor.value ) {
    alert("Vui lòng chọn đầy đủ phiên bản, màu sắc và bảo hành trước khi mua!");
    return;
  }
  // Tạo sản phẩm với các option đang chọn
  const sizeObj = store.size.find(
    (s) => Number(s.id) === Number(selectedSize.value)
  );
  const colorObj = store.color.find(
    (c) => Number(c.id) === Number(selectedColor.value)
  );
  const bhObj = store.baohanh.find(
    (b) => Number(b.id) === Number(selectedBH.value)
  );
  const product = {
    id: store.MobileDetail.id,
    name: store.MobileDetail.tensp,
    image:
      sliderImages.value.length > 0
        ? `/assets/image/${sliderImages.value[0].hinh}`
        : "",
    size: sizeObj ? sizeObj.name : "128GB",
    color: colorObj ? colorObj.name : "Đen",
    warranty: bhObj ? bhObj.ten : null,
    price: totalPrice.value,
    quantity: 1,
    note: "",
  };
  // Thêm vào cart (giả sử dùng cartStore)
  cartStore.clearCart(); // Nếu muốn thanh toán chỉ 1 sản phẩm này, clear trước
  cartStore.addToCart(product);

  // Chuyển sang trang Checkout
  routers.push({ name: "Checkout" });
}
function addToCart() {
  if (!store.MobileDetail) return;

  // Lấy thông tin size đang chọn
  const sizeObj = store.size.find(
    (s) => Number(s.id) === Number(selectedSize.value)
  );
  const colorObj = store.color.find(
    (c) => Number(c.id) === Number(selectedColor.value)
  );
  const bhObj = store.baohanh.find(
    (b) => Number(b.id) === Number(selectedBH.value)
  );
  const product = {
    id: store.MobileDetail.id,
    name: store.MobileDetail.tensp,
    image:
      sliderImages.value.length > 0
        ? `/assets/image/${sliderImages.value[0].hinh}`
        : "",
    size: sizeObj ? sizeObj.name : "128GB",
    // type: sizeObj ? sizeObj.name : null, // nếu store.addToCart dùng 'type'
    color: colorObj ? colorObj.name : "Đen",
    warranty: bhObj ? bhObj.ten : null,
    note: "",
    price: totalPrice.value,
  };

  cartStore.addToCart(product);
}

const reviewStore = useAppStore();
const router = useRoute();
const store = useProductsStore();
onMounted(async () => {
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
    store.fetchImage(),
    store.fetchProducts(),
    store.fetchSpecifications(),
    reviewStore.fetchReviewsByProduct(id),
  ]);
  sliderImages.value = store.image.filter(
    (img) => Number(img.product_id) === Number(id)
  );
  console.log("sliderImages", sliderImages.value);
  currentImgIndex.value = 0;
});

onBeforeUnmount(() => {
  // Clear khi rời khỏi trang
  reviewStore.clearCurrentProduct();
});

watch(
  () => router.params.id,
  async (newId) => {
    const id = Number(newId);
    await store.fetchProductDetail(id);
    sliderImages.value = store.image.filter(
      (img) => Number(img.product_id) === id
    );
    currentImgIndex.value = 0;
  }
);

function nextImg() {
  if (sliderImages.value.length === 0) return;
  currentImgIndex.value =
    (currentImgIndex.value + 1) % sliderImages.value.length;
}
function prevImg() {
  if (sliderImages.value.length === 0) return;
  currentImgIndex.value =
    (currentImgIndex.value - 1 + sliderImages.value.length) %
    sliderImages.value.length;
}

const productSpecs = computed(() => {
  // store.MobileDetail.id = id sản phẩm, specs trong store.specifications
  if (!store.MobileDetail) return null;
  return store.specifications?.find(
    (s) => Number(s.product_id) === Number(store.MobileDetail.id)
  );
});
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
  margin-left: 288px;
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
  margin-top: 10px;
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
  justify-content: center; /* Căn ngang */
  align-items: center; /* Căn dọc */
  height: 60vh; /* Chiều cao vùng hiển thị */
  text-align: center;
}

.no-product h2 {
  font-size: 40px;
  color: red;
  padding: 15px 25px;
  border-radius: 8px;
}

.specs-2col-container {
  border-radius: 12px;
  max-width: 1350px;
  margin: 0 auto;
  padding: 24px 16px 32px 16px;
  background: #fff;
  box-sizing: border-box;
  margin-top: 24px;
  margin-bottom: 30px;
}

.specs-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 18px;
  align-content: center;
}

.specs-header h2 {
  font-size: 40px;
  font-weight: bold;
  margin: 0;
  color: #242424;
  letter-spacing: -0.5px;
}

.specs-tables {
  display: flex;
  gap: 20px;
  justify-content: stretch;
}

.specs-table {
  flex: 1;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #ededed;
  width: 100%;
  max-width: 1500px;
  min-width: 0;
}

.specs-table th,
.specs-table td {
  font-size: 16px;
  padding: 13px 14px;
  text-align: left;
  vertical-align: top;
  background: #fff;
}

.specs-table th {
  background: #f6f7f9;
  font-weight: 500;
  color: #3d3d3d;
  width: 170px;
  border-bottom: 1px solid #ededed;
  border-right: 1px solid #ededed;
  border-left: none;
  border-top: none;
}

.specs-table td {
  color: #222;
  border-bottom: 1px solid #ededed;
  border-top: none;
  border-right: none;
  border-left: none;
  word-break: break-word;
}

.specs-table tr:last-child th,
.specs-table tr:last-child td {
  border-bottom: none;
}

.specs-table tr th {
  border-left: none;
}

@media (max-width: 900px) {
  .specs-tables {
    flex-direction: column;
    gap: 0;
  }
  .specs-table {
    margin-bottom: 16px;
  }
  .specs-header h2 {
    font-size: 18px;
  }
  .specs-table th,
  .specs-table td {
    font-size: 14px;
    padding: 10px 6px;
  }
}

.product-okey {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1350px;
  margin: 40px auto 0 auto;
  justify-content: flex-start;
  overflow-x: auto;
  padding-bottom: 16px;
}

.breadcrumb {
  /* background: #f3f3f3; */
  padding: 14px 20px 9px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid #e2e2e2; */
  font-family: inherit;
}
.breadcrumb-link {
  color: #1967d2;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.breadcrumb span {
  align-items: center;
  margin-left: 5px;
  margin-top: 2px;
}
.breadcrumb-link:hover {
  text-decoration: underline;
  color: #ea1c04;
}
.breadcrumb-link i {
  margin-right: 5px;
  font-size: 16px;
}
.breadcrumb-separator {
  color: #888;
  margin: 0 7px;
  font-weight: 300;
  user-select: none;
}
.breadcrumb-current {
  color: #757575;
  font-weight: 400;
}
</style>
