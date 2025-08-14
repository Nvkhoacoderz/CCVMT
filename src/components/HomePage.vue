<template>
  <div>
    <!-- Main Content -->
    <main class="main">
      <section class="section-slider">
        <div class="container-header">
          <div class="index-wrap">
            <!-- Sidebar Menu -->
            <div class="index-nav">
              <div class="slidebar-menu" @mouseleave="hideMegaMenu">
                <nav class="megamenu-nav">
                  <ul class="megamenu-nav-main">
                    <li
                      class="megamenu-nav-item"
                      v-for="(category, index) in categories"
                      :key="index"
                      @mouseenter="showMegaMenu(index)"
                    >
                      <a class="href">
                        <span class="item" v-html="category.icon"></span>
                        <span class="item">{{ category.name }}</span>
                        <span class="item">
                          <svg
                            class="arrow-icon"
                            viewBox="0 0 6 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.5 1.5L4.5 4L1.5 6.5"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                      </a>
                      <div
                        class="megamenu-content"
                        v-if="activeMegaMenu === index"
                      >
                        <div
                          class="megamenu-content-grid"
                          v-for="(column, colIndex) in category.megaMenu"
                          :key="colIndex"
                        >
                          <div class="megamenu-content-col">
                            <h4>{{ column.title }}</h4>
                            <ul>
                              <li
                                v-for="(item, itemIndex) in column.items"
                                :key="itemIndex"
                              >
                                {{ item }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <!-- Banner Area -->
            <div class="index-banner">
              <div class="slider-left">
                <div class="banner-top">
                  <img
                    v-for="(banner, index) in bannerImages"
                    :key="index"
                    :id="`banner-top-${index + 1}`"
                    :src="banner.src"
                    :style="{ opacity: currentBannerIndex === index ? 1 : 0 }"
                  />
                  <div class="slider-nav">
                    <a
                      v-for="(banner, index) in bannerImages"
                      :key="index"
                      :href="`#banner-top-${index + 1}`"
                      :class="{ active: currentBannerIndex === index }"
                      @click.prevent="setActiveBanner(index)"
                    ></a>
                  </div>
                </div>
                <div class="banner-bottom">
                  <div class="banner-bottom-list">
                    <div
                      class="banner-bottom-item"
                      v-for="(item, index) in bottomBanners"
                      :key="index"
                    >
                      <a href="#">
                        <img :src="item.src" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider-right">
                <div class="slider-list">
                  <div
                    class="slider-right-item"
                    v-for="(item, index) in rightBanners"
                    :key="index"
                  >
                    <a href="#">
                      <img :src="item.src" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Banner -->
          <div class="inner-banner-bottom">
            <div class="index-banner-bottom-list">
              <div
                class="inner-banner-bottom-item"
                v-for="(item, index) in innerBottomBanners"
                :key="index"
              >
                <a href="#">
                  <img :src="item.src" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <div class="wrapper-content">
        <div class="wrapper-header">
          <h2 class="wrapper-header-title">MOBILE</h2>
        </div>
        <div class="wrapper-product">
          <div class="badge">
            <div class="flash-sale-badge">FEATURED MOBILE</div>
          </div>

          <!-- Filter Section -->
          <div class="filter-section">
            <!-- Brand Filter -->
            <div class="filter-group">
              <label class="filter-label">Thương hiệu:</label>
              <select
                v-model="selectedBrand"
                @change="handleFilterChange"
                class="filter-select"
              >
                <option value="">Tất cả thương hiệu</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="ASUS">ASUS</option>
                <option value="Acer">Acer</option>
                <option value="MSI">MSI</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
              </select>
            </div>

            <!-- Price Filter -->
            <div class="filter-group">
              <label class="filter-label">Khoảng giá:</label>
              <select
                v-model="selectedPriceRange"
                @change="handleFilterChange"
                class="filter-select"
              >
                <option value="">Tất cả mức giá</option>
                <option value="0-10">Dưới 10 triệu</option>
                <option value="10-20">10 - 20 triệu</option>
                <option value="20-30">20 - 30 triệu</option>
                <option value="30-50">30 - 50 triệu</option>
                <option value="50+">Trên 50 triệu</option>
              </select>
            </div>

            <!-- Sort Filter -->
            <div class="filter-group">
              <label class="filter-label">Sắp xếp:</label>
              <select
                v-model="sortOption"
                @change="handleSortChange"
                class="filter-select"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="newest">Mới nhất</option>
                <option value="bestseller">Bán chạy</option>
              </select>
            </div>

            <!-- Clear Filters Button -->
            <div class="filter-group">
              <button
                @click="clearAllFilters"
                class="clear-filters-btn"
                v-if="hasActiveFilters"
              >
                <i class="fas fa-times"></i>
                Xóa bộ lọc
              </button>
            </div>
          </div>

          <!-- Active Filters Display -->
          <div class="active-filters" v-if="hasActiveFilters">
            <span class="active-filters-label">Bộ lọc đang áp dụng:</span>
            <div class="filter-tags">
              <span v-if="selectedBrand" class="filter-tag">
                {{ selectedBrand }}
                <button
                  @click="
                    selectedBrand = '';
                    handleFilterChange();
                  "
                  class="remove-tag"
                >
                  ×
                </button>
              </span>
              <span v-if="selectedPriceRange" class="filter-tag">
                {{ getPriceRangeLabel(selectedPriceRange) }}
                <button
                  @click="
                    selectedPriceRange = '';
                    handleFilterChange();
                  "
                  class="remove-tag"
                >
                  ×
                </button>
              </span>
              <span v-if="sortOption !== 'default'" class="filter-tag">
                {{ getSortLabel(sortOption) }}
                <button
                  @click="
                    sortOption = 'default';
                    handleFilterChange();
                  "
                  class="remove-tag"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <!-- Product List -->
          <div class="product-list">
            <!-- Products Grid -->
            <div class="products-grid" v-if="pageProducts.length > 0">
              <div class="product-item" v-for="sp in pageProducts" :key="sp.id">
                <MobileProduct :product="sp" />
              </div>
            </div>

            <!-- No Products Found -->
            <div v-else class="no-products">
              <div class="no-products-content">
                <i class="fas fa-search no-products-icon"></i>
                <h3>Không tìm thấy sản phẩm phù hợp</h3>
                <p>Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác</p>
                <button @click="clearAllFilters" class="retry-btn">
                  Xóa tất cả bộ lọc
                </button>
              </div>
            </div>

            <!-- Pagination -->
            <div
              class="product-pagination"
              v-if="totalPages > 1 && pageProducts.length > 0"
            >
              <button
                class="page-btn Prev"
                :disabled="page <= 1"
                @click="gotoPage(page - 1)"
              >
                <i class="fas fa-angle-left"></i> Prev
              </button>

              <button
                class="page-btn"
                v-for="pageNum in totalPages"
                :key="pageNum"
                :class="{ active: page === pageNum }"
                @click="gotoPage(pageNum)"
              >
                {{ pageNum }}
              </button>

              <button
                class="page-btn Next"
                :disabled="page >= totalPages"
                @click="gotoPage(page + 1)"
              >
                Next <i class="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-content">
        <div class="wrapper-header">
          <h2 class="wrapper-header2-title">PHỤ KIỆN, MÀN HÌNH</h2>
        </div>
        <div class="wrapper-product">
          <div class="badge2">
            <div class="flash-sale-badge2">FEATURED PHỤ KIỆN, MÀN HÌNH</div>
          </div>
          <div class="product-list">
            <div class="products-grid">
              <div
                class="product-item"
                v-for="sp in accessoryPageProducts"
                :key="sp.id"
              >
                <ManHinhComponent v-if="sp.type === 'manHinh'" :product="sp" />
                <PhuKienComponent v-else :product="sp" />
              </div>
            </div>
            <div
              class="product-pagination"
              v-if="totalAccessoryPages > 1 && accessoryPageProducts.length > 0"
            >
              <button
                class="page-btn Prev"
                :disabled="pageAccessory <= 1"
                @click="gotoAccessoryPage(pageAccessory - 1)"
              >
                <i class="fas fa-angle-left"></i> Prev
              </button>

              <button
                class="page-btn"
                v-for="pageNum in totalAccessoryPages"
                :key="pageNum"
                :class="{ active: pageAccessory === pageNum }"
                @click="gotoAccessoryPage(pageNum)"
              >
                {{ pageNum }}
              </button>

              <button
                class="page-btn Next"
                :disabled="pageAccessory >= totalAccessoryPages"
                @click="gotoAccessoryPage(pageAccessory + 1)"
              >
                Next <i class="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper-content">
        <div class="wrapper-header">
          <h2 class="wrapper-header3-title">LAPTOP</h2>
        </div>
        <div class="wrapper-product">
          <div class="badge2">
            <div class="flash-sale-badge3">FEATURED LAPTOP</div>
          </div>
          <div class="product-list">
            <div class="products-grid">
              <ProductItem
                v-for="laptop in laptopPageProducts"
                :key="laptop.id"
                :laptop="laptop"
              />
            </div>
            <div
              class="product-pagination"
              v-if="totalLaptopPages > 1 && laptopPageProducts.length > 0"
            >
              <button
                class="page-btn Prev"
                :disabled="pageLaptop <= 1"
                @click="gotoLaptopPage(pageLaptop - 1)"
              >
                <i class="fas fa-angle-left"></i> Prev
              </button>

              <button
                class="page-btn"
                v-for="pageNum in totalLaptopPages"
                :key="pageNum"
                :class="{ active: pageLaptop === pageNum }"
                @click="gotoLaptopPage(pageNum)"
              >
                {{ pageNum }}
              </button>

              <button
                class="page-btn Next"
                :disabled="pageLaptop >= totalLaptopPages"
                @click="gotoLaptopPage(pageLaptop + 1)"
              >
                Next <i class="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import MobileProduct from "../components/MobileProduct.vue";
import { useProductsStore } from "../stores/productAPI.js";
import { useRoute, useRouter } from "vue-router";
import { usePageStore } from "../stores/pageStore.js";
import PhuKienComponent from "../components/PhuKienComponent.vue";
import { useStores } from "../stores/useProductAPI.js";
import ManHinhComponent from "../components/ManHinhComponent.vue";
import ProductItem from "@/components/ProductItem.vue";
import { useProducts } from "@/stores/productsAPI";

const storeS = useProducts();
const pageLaptop = ref(1);
const laptopLimit = ref(4); // số sản phẩm mỗi trang

const totalLaptopPages = computed(() =>
  Math.ceil((storeS.laptop?.length || 0) / laptopLimit.value)
);

const laptopPageProducts = computed(() => {
  const start = (pageLaptop.value - 1) * laptopLimit.value;
  const end = start + laptopLimit.value;
  return storeS.laptop ? storeS.laptop.slice(start, end) : [];
});
function gotoLaptopPage(p) {
  if (p >= 1 && p <= totalLaptopPages.value) {
    pageLaptop.value = p;
  }
}

const stores = useStores();

const pageStore = usePageStore();
const route = useRoute();
const router = useRouter();
const store = useProductsStore();

// Filter states
const sortOption = ref("default");
const selectedBrand = ref("");
const selectedPriceRange = ref("");

// UI states
const currentBannerIndex = ref(0);
const activeMegaMenu = ref(-1);
const page = ref(1);
const limit = ref(4);
const pageAccessory = ref(1);
const limitAccessory = ref(4);

const allAccessoryProducts = computed(() => [
  ...(stores.manHinh || []).map((p) => ({ ...p, type: "manHinh" })),
  ...(stores.phuKien || []).map((p) => ({ ...p, type: "phuKien" })),
]);

const totalAccessoryPages = computed(() =>
  Math.ceil(allAccessoryProducts.value.length / limitAccessory.value)
);

const accessoryPageProducts = computed(() => {
  const start = (pageAccessory.value - 1) * limitAccessory.value;
  const end = start + limitAccessory.value;
  return allAccessoryProducts.value.slice(start, end);
});

function gotoAccessoryPage(p) {
  if (p >= 1 && p <= totalAccessoryPages.value) {
    pageAccessory.value = p;
  }
}

// Computed properties
const hasActiveFilters = computed(
  () =>
    selectedBrand.value !== "" ||
    selectedPriceRange.value !== "" ||
    sortOption.value !== "default"
);

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / limit.value)
);

// Helper functions
const parsePrice = (value) => {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const digits = value.replace(/[^\d]/g, "");
    const n = Number(digits);
    return isNaN(n) ? 0 : n;
  }
  return 0;
};

const getDateValue = (p) => {
  const v = p.created_at ?? p.createdAt ?? p.date ?? p.ngay_tao;
  const d = v ? new Date(v) : new Date(0);
  return isNaN(d.getTime()) ? new Date(0) : d;
};

const getBrand = (product) => {
  return product.brand || product.thuong_hieu || product.manufacturer || "";
};

const isInPriceRange = (price, range) => {
  const priceInMillions = price / 1000000;

  switch (range) {
    case "0-10":
      return priceInMillions < 10;
    case "10-20":
      return priceInMillions >= 10 && priceInMillions < 20;
    case "20-30":
      return priceInMillions >= 20 && priceInMillions < 30;
    case "30-50":
      return priceInMillions >= 30 && priceInMillions < 50;
    case "50+":
      return priceInMillions >= 50;
    default:
      return true;
  }
};

const getPriceRangeLabel = (range) => {
  const labels = {
    "0-10": "Dưới 10 triệu",
    "10-20": "10 - 20 triệu",
    "20-30": "20 - 30 triệu",
    "30-50": "30 - 50 triệu",
    "50+": "Trên 50 triệu",
  };
  return labels[range] || "";
};

const getSortLabel = (sort) => {
  const labels = {
    "price-asc": "Giá tăng dần",
    "price-desc": "Giá giảm dần",
    newest: "Mới nhất",
    bestseller: "Bán chạy",
  };
  return labels[sort] || "";
};

// Filtered products
const filteredProducts = computed(() => {
  let products = [...(store.product || [])];

  // Filter by brand
  if (selectedBrand.value) {
    products = products.filter((product) =>
      getBrand(product)
        .toLowerCase()
        .includes(selectedBrand.value.toLowerCase())
    );
  }

  // Filter by price range
  if (selectedPriceRange.value) {
    products = products.filter((product) => {
      const price = parsePrice(
        product.price ?? product.gia ?? product.price_sale
      );
      return isInPriceRange(price, selectedPriceRange.value);
    });
  }

  return products;
});

// Sorted products
const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value];
  if (!arr.length) return arr;

  switch (sortOption.value) {
    case "price-asc":
      return arr.sort(
        (a, b) =>
          parsePrice(a.price ?? a.gia ?? a.price_sale) -
          parsePrice(b.price ?? b.gia ?? b.price_sale)
      );
    case "price-desc":
      return arr.sort(
        (a, b) =>
          parsePrice(b.price ?? b.gia ?? b.price_sale) -
          parsePrice(a.price ?? a.gia ?? a.price_sale)
      );
    case "newest":
      return arr.sort((a, b) => getDateValue(b) - getDateValue(a));
    case "bestseller":
      return arr.sort((a, b) => (Number(b.sold) || 0) - (Number(a.sold) || 0));
    default:
      return arr;
  }
});

// Paginated products
const pageProducts = computed(() => {
  const start = (page.value - 1) * limit.value;
  const end = start + limit.value;
  return sortedProducts.value.slice(start, end);
});

// Methods
const handleFilterChange = () => {
  page.value = 1; // Reset to first page when filters change
  updateURL();
};

const handleSortChange = () => {
  page.value = 1; // Reset to first page when sort changes
  updateURL();
};

const clearAllFilters = () => {
  selectedBrand.value = "";
  selectedPriceRange.value = "";
  sortOption.value = "default";
  page.value = 1;
  updateURL();
};

const updateURL = () => {
  const query = {};

  if (page.value > 1) query.page = page.value;
  if (selectedBrand.value) query.brand = selectedBrand.value;
  if (selectedPriceRange.value) query.price = selectedPriceRange.value;
  if (sortOption.value !== "default") query.sort = sortOption.value;

  router.push({ path: "/", query });
};

const gotoPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
    pageStore.setPage(p);
    updateURL();

    // Smooth scroll to top of product list
    const productList = document.querySelector(".product-list");
    if (productList) {
      productList.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
};

// Watch route changes
watch(
  () => route.query,
  (newQuery) => {
    page.value = Number(newQuery.page) || 1;
    selectedBrand.value = newQuery.brand || "";
    selectedPriceRange.value = newQuery.price || "";
    sortOption.value = newQuery.sort || "default";
  },
  { immediate: true }
);

// Category and banner data
const categories = [
  {
    name: "Mobile",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-phone" viewBox="0 0 20 20"><path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>`,
    megaMenu: [
      {
        title: "Thương hiệu",
        items: ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo"],
      },
      {
        title: "Giá bán",
        items: ["Dưới 5 triệu", "5-10 triệu", "Trên 10 triệu"],
      },
      {
        title: "Phụ kiện",
        items: ["Ốp lưng", "Sạc dự phòng", "Tai nghe"],
      },
    ],
  },
  {
    name: "Tablet",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-tablet" viewBox="0 0 20 20"><path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>`,
    megaMenu: [
      {
        title: "Thương hiệu",
        items: ["iPad", "Samsung", "Lenovo", "Xiaomi"],
      },
      {
        title: "Phụ kiện",
        items: ["Bàn phím", "Bút cảm ứng", "Ốp lưng"],
      },
    ],
  },
  {
    name: "Laptop Văn Phòng",
    icon: `<svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z" fill="currentcolor"></path><path d="M1 12L19 12" stroke="currentcolor" stroke-linecap="round"></path></svg>`,
    megaMenu: [
      {
        title: "Thương hiệu",
        items: ["ASUS", "ACER", "MSI", "LENOVO", "DELL"],
      },
      {
        title: "CPU",
        items: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "AMD Ryzen"],
      },
      {
        title: "Nhu cầu",
        items: ["Văn phòng", "Học sinh - Sinh viên", "Mỏng nhẹ"],
      },
    ],
  },
  {
    name: "Laptop Gaming",
    icon: `<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.96432 4C3.41203 4 2.96432 4.44772 2.96432 5V11.5C2.96432 12.0523 3.41203 12.5 3.96432 12.5H15.9643C16.5166 12.5 16.9643 12.0523 16.9643 11.5V4H3.96432ZM3.66432 3H9.96432H16.2643C16.7417 3 17.1995 3.18437 17.5371 3.51256C17.8747 3.84075 18.0643 4.28587 18.0643 4.75V11.75C18.0643 12.2141 17.8747 12.6592 17.5371 12.9874C17.1995 13.3156 16.7417 13.5 16.2643 13.5H3.66432C3.18693 13.5 2.72909 13.3156 2.39153 12.9874C2.05396 12.6592 1.86432 12.2141 1.86432 11.75V4.75C1.86432 4.28587 2.05396 3.84075 2.39153 3.51256C2.72909 3.18437 3.18693 3 3.66432 3Z" fill="currentcolor"></path><path d="M0.964294 15L18.9643 15" stroke="currentcolor" stroke-linecap="round"></path></svg>`,
    megaMenu: [
      {
        title: "Thương hiệu",
        items: [
          "ASUS ROG",
          "MSI",
          "Acer Predator",
          "Lenovo Legion",
          "Dell G Series",
        ],
      },
      {
        title: "Card đồ họa",
        items: ["NVIDIA RTX 40xx", "NVIDIA RTX 30xx", "AMD Radeon"],
      },
      {
        title: "Màn hình",
        items: ["144Hz", "165Hz", "240Hz"],
      },
    ],
  },
  {
    name: "PC",
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="19" width="18" height="10" rx="1" transform="rotate(-90 1 19)" stroke="currentcolor"></rect><path d="M13 3H17C18.1046 3 19 3.89543 19 5V13C19 14.1046 18.1046 15 17 15H13" stroke="currentcolor"></path><path d="M16.5 18.5C16.7761 18.5 17 18.2761 17 18C17 17.7239 16.7761 17.5 16.5 17.5V18.5ZM13 18.5H16.5V17.5H13V18.5Z" fill="currentcolor"></path><circle cx="6" cy="5" r="1" fill="currentcolor"></circle><circle cx="6" cy="9" r="1" fill="currentcolor"></circle></svg>`,
    megaMenu: [
      {
        title: "Loại PC",
        items: ["PC Gaming", "PC Văn phòng", "PC Đồ họa"],
      },
      {
        title: "Linh kiện",
        items: ["Mainboard", "CPU", "RAM", "VGA"],
      },
      {
        title: "Phụ kiện",
        items: ["Bàn phím", "Chuột", "Tai nghe"],
      },
    ],
  },
  {
    name: "Phụ Kiện",
    icon: `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H8.90909M6.5 3.5V8.3M10 1C12.0438 1.0352 13.2776 1 14.0909 1C15.7273 1 17.3636 1.4 18.1818 4.2C19 7 19 8.6 19 10.6C19 12.6 17.3636 13 15.7273 13C14.0909 13 13.2285 9.8 10 9.8C6.77145 9.8 5.90909 13 4.27273 13C2.63636 13 1 12.6 1 10.6C1 8.6 1 7 1.81818 4.2C2.63636 1.4 4.27273 1 5.90909 1C6.72236 1 7.95618 1.0352 10 1Z" stroke="currentcolor"></path><circle cx="13" cy="5" r="1" fill="currentcolor"></circle><circle cx="15" cy="7" r="1" fill="currentcolor"></circle></svg>`,
    megaMenu: [
      {
        title: "Phụ kiện PC",
        items: ["Bàn phím", "Chuột", "Tai nghe", "Webcam"],
      },
      {
        title: "Phụ kiện Laptop",
        items: ["Đế tản nhiệt", "Hub chuyển đổi", "Ổ cứng di động"],
      },
    ],
  },
  {
    name: "Dịch vụ và thông tin khác",
    icon: `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.5V6M9 3.5C9 3.00555 9.14662 2.5222 9.42133 2.11108C9.69603 1.69995 10.0865 1.37952 10.5433 1.1903C11.0001 1.00108 11.5028 0.951575 11.9877 1.04804C12.4727 1.1445 12.9181 1.3826 13.2678 1.73223C13.6174 2.08187 13.8555 2.52732 13.952 3.01228C14.0484 3.49723 13.9989 3.99989 13.8097 4.45671C13.6205 4.91352 13.3 5.30397 12.8889 5.57867C12.4778 5.85338 11.9945 6 11.5 6H9M9 3.5C9 3.00555 8.85338 2.5222 8.57867 2.11108C8.30397 1.69995 7.91352 1.37952 7.45671 1.1903C6.99989 1.00108 6.49723 0.951575 6.01227 1.04804C5.52732 1.1445 5.08187 1.3826 4.73223 1.73223C4.3826 2.08187 4.1445 2.52732 4.04804 3.01228C3.95157 3.49723 4.00108 3.99989 4.1903 4.45671C4.37952 4.91352 4.69995 5.30397 5.11108 5.57867C5.5222 5.85338 6.00555 6 6.5 6H9" stroke="currentcolor" stroke-miterlimit="10" stroke-linecap="round"></path><path d="M15.6667 6H2.33333C1.59695 6 1 6.63959 1 7.42857V9.57143C1 10.3604 1.59695 11 2.33333 11H15.6667C16.403 11 17 10.3604 17 9.57143V7.42857C17 6.63959 16.403 6 15.6667 6Z" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10.7895V16.9474C16 17.4918 15.7788 18.0139 15.3849 18.3988C14.9911 18.7837 14.457 19 13.9 19H4.1C3.54305 19 3.0089 18.7837 2.61508 18.3988C2.22125 18.0139 2 17.4918 2 16.9474V10.7895M9 6V19" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
    megaMenu: [
      {
        title: "Dịch vụ",
        items: ["Bảo hành", "Sửa chữa", "Thu cũ đổi mới"],
      },
      {
        title: "Thông tin",
        items: ["Tin tức công nghệ", "Khuyến mãi", "Hướng dẫn sử dụng"],
      },
    ],
  },
];

const bannerImages = [
  {
    src: "https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_web_slider_800x400.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/thang_06_laptop_gaming_800x400_-_web_slider.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-laptop-gigabyte-rtx-50-series-slider-t7.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-acer-back-to-school-2025-slider.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-msi-amg-slider.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/thang_06_800x400_-_web_slider.png",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/thu_cu_doi_moi_banner_web_slider_800x400.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_web_slider_800x400.jpg",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/thang_06_peri_800x400_-_web_slider.png",
  },
];

const bottomBanners = [
  { src: "https://file.hstatic.net/200000722513/file/lp_gaming.png" },
  { src: "https://file.hstatic.net/200000722513/file/lp_gearvn.png" },
];

const rightBanners = [
  { src: "https://file.hstatic.net/200000722513/file/tcdm.png" },
  { src: "https://file.hstatic.net/200000722513/file/ph_m_c_.png" },
  { src: "https://file.hstatic.net/200000722513/file/pc.png" },
];

const innerBottomBanners = [
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-gaming-gear-deal-hoi-sub-banners.png",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-man-hinh-sub-t8.png",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-gaming-gear-sub-t8.png",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/gearvn-pc-amd-sub-t8.png",
  },
];

// Component methods
const setActiveBanner = (index) => {
  currentBannerIndex.value = index;
};

const showMegaMenu = (index) => {
  activeMegaMenu.value = index;
};

const hideMegaMenu = () => {
  activeMegaMenu.value = -1;
};

// Lifecycle
onMounted(() => {
  // Banner auto slide
  setInterval(() => {
    currentBannerIndex.value =
      (currentBannerIndex.value + 1) % bannerImages.length;
  }, 3000);

  store.fetchProducts();
  store.fetchSize();
  store.fetchRam();
  store.fetchKichThuoc();
  stores.fetchManHinh();
  stores.fetchPhuKien();
  storeS.fetchProducts();
  storeS.fetchCategory();
  storeS.fetchInfoMuakem();
  storeS.fetchInformation();
  storeS.fetchInfoShowroom();
  storeS.fetchInfoUudai();
  storeS.fetchProductDetail();
});
</script>

<style>
/* Filter Section Styles */
.filter-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin: 20px 25px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
  white-space: nowrap;
}

.filter-select {
  padding: 10px 36px 10px 16px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
  appearance: none;
  outline: none;
  transition: all 0.2s ease;
  min-width: 160px;
  cursor: pointer;
  position: relative;
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg fill='%232d3748' height='16' viewBox='0 0 20 20' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M5.516 7.548a1 1 0 0 1 1.415-.032L10 10.205l3.07-2.689a1 1 0 1 1 1.384 1.446l-3.777 3.312a1 1 0 0 1-1.29 0L5.548 8.963a1 1 0 0 1-.032-1.415z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px 16px;
}

.filter-select:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.filter-select:hover {
  border-color: #cbd5e0;
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #e53e3e, #c53030);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background: linear-gradient(135deg, #c53030, #9c2626);
  transform: translateY(-1px);
}

.clear-filters-btn i {
  font-size: 12px;
}

/* Active Filters Display */
.active-filters {
  margin: 0 25px 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  border-radius: 10px;
  /* border-left: 4px solid #4299e1; */
}

.active-filters-label {
  font-weight: 600;
  color: #2d3748;
  margin-right: 12px;
  font-size: 14px;
}

.filter-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  margin-left: 4px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.remove-tag:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* No Products Found */
.no-products {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
}

.no-products-content {
  text-align: center;
  max-width: 400px;
  padding: 40px 20px;
}

.no-products-icon {
  font-size: 64px;
  color: #cbd5e0;
  margin-bottom: 20px;
}

.no-products-content h3 {
  color: #2d3748;
  margin-bottom: 12px;
  font-size: 24px;
}

.no-products-content p {
  color: #718096;
  margin-bottom: 24px;
  line-height: 1.6;
}

.retry-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: linear-gradient(135deg, #3182ce, #2c5aa0);
  transform: translateY(-1px);
}

/* Responsive Design for Filters */
@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    margin: 15px 10px;
    padding: 16px;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }

  .filter-select {
    min-width: auto;
    width: 100%;
  }

  .filter-label {
    font-size: 13px;
  }

  .active-filters {
    margin: 0 10px 15px;
    padding: 12px 16px;
  }

  .active-filters-label {
    display: block;
    margin-bottom: 8px;
  }
}

@media (max-width: 480px) {
  .filter-section {
    margin: 10px 5px;
    padding: 12px;
  }

  .filter-select {
    padding: 8px 28px 8px 12px;
    font-size: 13px;
  }

  .clear-filters-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
}

/* Product List Styles - Improved Layout */
.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Products Grid Container */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  gap: 25px;
  width: 100%;
  justify-items: center;
  margin-bottom: 30px;
}

/* Individual Product Item Styling */
.product-item {
  width: 100%;
  max-width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Product Pagination Styles - Modern Design */
.product-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-top: 30px;
  padding: 20px 0;
  width: 100%;
}

/* Container wrapper for the pagination */
.product-pagination {
  background: linear-gradient(135deg, #fff5e4, #ffffff);
  border-radius: 25px;
  padding: 8px 12px;
  box-shadow: 0 8px 30px rgba(255, 148, 148, 0.15);
  backdrop-filter: blur(10px);
  display: inline-flex;
  margin: 30px auto;
  max-width: fit-content;
  border: 1px solid rgba(255, 227, 225, 0.3);
}

.page-btn {
  min-width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: #8b4513;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
  position: relative;
  gap: 6px;
}

.page-btn:hover:not(.active):not(:disabled) {
  background: linear-gradient(135deg, #fff5e4, #ffe3e1);
  color: #8b4513;
  transform: scale(1.05);
}

.page-btn:active {
  transform: scale(0.95);
}

/* Active page button */
.page-btn.active {
  background: linear-gradient(135deg, #ffe3e1, #ffd1d1, #ff9494);
  color: #8b4513;
  box-shadow: 0 4px 12px rgba(255, 148, 148, 0.4);
  font-weight: 700;
}

.page-btn.active:hover {
  background: linear-gradient(135deg, #ffd1d1, #ff9494, #ff7b7b);
  transform: scale(1.05);
}

/* Prev/Next buttons styling */
.page-btn.Prev,
.page-btn.Next {
  font-size: 14px;
  font-weight: 600;
  color: #ea1c04;
  padding: 0 12px;
  min-width: auto;
}

.page-btn.Prev i,
.page-btn.Next i {
  font-size: 12px;
}

.page-btn.Prev:hover:not(:disabled),
.page-btn.Next:hover:not(:disabled) {
  background: linear-gradient(135deg, #fff5e4, #ffe3e1);
  color: #ea1c04;
}

/* Disabled state for Prev/Next */
.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: none !important;
}

.page-btn:disabled:hover {
  background: transparent;
  color: #d2b48c;
}

/* Responsive design */
@media (max-width: 768px) {
  .page-btn.Prev,
  .page-btn.Next {
    padding: 0 8px;
    font-size: 12px;
  }

  .page-btn {
    min-width: 40px;
    height: 40px;
    font-size: 14px;
    margin: 0 1px;
  }

  .product-pagination {
    padding: 6px 8px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 0 10px;
  }

  .product-item {
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .product-item {
    max-width: 100%;
  }
}

/* Rest of existing styles remain the same */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f5f5;
  padding: 0;
  overflow-x: hidden;
}

.main {
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: calc(100vh - 122px);
}

.section-slider {
  max-width: 2000px;
  margin: 0 auto;
  width: 100%;
  border-radius: 8px;
  overflow: visible;
  display: flex;
  flex-direction: column;
}

.container-header {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  right: 40px;
}

.index-wrap {
  display: flex;
  flex-direction: row;
  gap: 20px;
  position: relative;
  max-width: 1280px;
}

.index-nav {
  flex: 1;
}

.megamenu-nav {
  width: 260px;
  border: #222 1px solid;
}

.megamenu-nav-main {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: block;
  flex-direction: column;
  margin-bottom: 0;
}

.megamenu-nav-item {
  border-bottom: 1px solid #e5e5e5;
  transition: all 0.2s ease;
  background-color: #ffffff;
}

.megamenu-nav-item:last-child {
  border-bottom: none;
}

.megamenu-nav-item:hover {
  background-color: #ea1c04;
}

.megamenu-nav-item:hover .href {
  color: white;
  opacity: 1;
}

.megamenu-nav-item:hover .item {
  color: #fff;
}

.megamenu-nav-item:hover svg {
  color: white;
}

.href {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: black;
  font-size: 14px;
  min-height: 70px;
  transition: color 0.2s ease;
  cursor: pointer;
  position: relative;
  margin: 0;
}

.item {
  display: inline-block;
  width: 24px;
  text-align: center;
  margin-right: 8px;
  color: black;
  transition: color 0.2s ease;
}

.item:first-child {
  margin-right: 12px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.item:nth-child(2) {
  flex: 1;
  text-align: left;
  font-weight: 500;
}

.item:last-child {
  margin-left: 8px;
  flex-shrink: 0;
  width: 6px;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  width: 6px;
  height: 8px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.megamenu-nav-item:hover .arrow-icon {
  opacity: 1;
}

.bi {
  fill: currentColor;
}

svg {
  transition: color 0.2s ease;
}

/* Responsive design */
@media (max-width: 480px) {
  .section-slider {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
  }

  .href {
    padding: 14px 16px;
    font-size: 15px;
  }
}

.megamenu-content {
  display: none;
  position: absolute;
  left: 280px;
  top: 0;
  height: 100%;
  background: #fff;
  min-width: 998px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 24px 32px;
  gap: 32px;
  border-radius: 10px;
  overflow-y: auto;
}

.megamenu-nav-item:hover > .megamenu-content {
  display: flex;
}

.megamenu-content-col h4 {
  color: #ea1c04;
  margin-bottom: 8px;
  font-size: 16px;
}

.megamenu-content-col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.megamenu-content-col li {
  margin-bottom: 6px;
  color: #222;
  font-size: 14px;
}

.slider {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slider img.active {
  opacity: 1;
  z-index: 1;
}

.section-slider {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: transparent;
}

.index-nav {
  width: 260px;
}

.index-banner {
  flex: 1;
  display: flex;
  gap: 10px;
  height: 500px;
  max-width: 1400px;
}

.slider-left {
  flex: 2;
  position: relative;
  border-radius: 10px;
  width: 1000px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
}

.slider-left .banner-top {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100%;
}

.slider-left .banner-top img {
  width: 100%;
  flex-shrink: 0;
  scroll-snap-align: start;
  border-radius: 10px;
}

.slider-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  max-height: unset;
  box-sizing: border-box;
}

.slider-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.banner-top {
  position: relative;
  width: 100%;
  height: 332px;
  overflow: hidden;
  flex-shrink: 0;
}

.banner-top img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.banner-top img:target {
  opacity: 1;
}

/* Default show first image */
.banner-top img:first-child {
  opacity: 1;
}

.slider-nav {
  position: absolute;
  top: 315px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
  align-items: center;
}

.slider-nav a {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 3px 5px;
  margin: 0 5px;
  display: block;
  text-indent: -9999px;
  transition: width 0.3s, height 0.3s, border-radius 0.3s, background 0.3s,
    opacity 0.3s;
}

.slider-nav a.active {
  background-color: #be1529;
  width: 20px;
  height: 5px;
  border-radius: 0;
}

.banner-bottom {
  width: 100%;
}

.banner-bottom-list {
  display: flex;
  flex-direction: row;
}

.banner-bottom-item {
  width: 50%;
}

.banner-bottom-item a {
  display: block;
}

.banner-bottom-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

.slider-list {
  display: flex;
  flex-direction: column;
}

.slider-right-item {
  flex: 1;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
}

.slider-right-item a {
  display: block;
  width: 100%;
}

.slider-right-item img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
}

.inner-banner-bottom {
  width: 100%;
  margin-top: 10px;
  position: relative;
  left: -5px;
}

.index-banner-bottom-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.inner-banner-bottom-item {
  flex: 1;
}

.inner-banner-bottom-item a {
  display: block;
}

.inner-banner-bottom-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}

.wrapper-header-title {
  font-family: "SVN-Gilroy";
  font-style: italic;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  padding-left: 26px;
  padding-right: 8px;
  position: relative;
  white-space: initial;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: #ffd700;
  text-align: center;
}

.wrapper-header-title::before {
  content: "";
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23FFD700' d='M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'/%3E%3Cpath fill='%23FFD700' d='M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  border-radius: 100%;
  display: block;
  left: 0px;
  width: 24px;
  height: 40px;
  position: absolute;
  right: 110px;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: flash 1.5s infinite;
}

.wrapper-header2-title {
  font-family: "SVN-Gilroy";
  font-style: italic;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  padding-left: 26px;
  padding-right: 8px;
  position: relative;
  white-space: initial;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: #ffd700;
  text-align: center;
}

.wrapper-header3-title {
  font-family: "SVN-Gilroy";
  font-style: italic;
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  padding-left: 26px;
  padding-right: 8px;
  position: relative;
  white-space: initial;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: #ffd700;
  text-align: center;
}

@keyframes flash {
  0%,
  50% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0.5;
  }
}

.wrapper-content {
  max-width: 1278px;
  margin-top: 20px;
  margin-left: 70px;
}

.wrapper-header {
  padding: 12px 16px;
  background: linear-gradient(180deg, #003bb8 0%, #003bb8 100%);
  border-radius: 4px 4px 0px 0px;
  max-width: 1400px;
}

.wrapper-product {
  padding: 10px 4px 0;
  background: url(https://file.hstatic.net/200000722513/file/artboard_35-1.png)
    center center/cover no-repeat;
  border-radius: 0px 0px 4px 4px;
}

.badge {
  margin-left: 20px;
  margin-top: 10px;
}

.flash-sale-badge {
  background: white;
  color: #1e40af;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.flash-sale-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.badge2 {
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 50px;
}

.flash-sale-badge2 {
  background: white;
  color: #1e40af;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.flash-sale-badge2:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.badge3 {
  margin-left: 20px;
  margin-top: 10px;
}

.flash-sale-badge3 {
  background: white;
  color: #1e40af;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.flash-sale-badge3:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
