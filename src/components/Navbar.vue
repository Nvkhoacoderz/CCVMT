<template>
  <div>
    <!-- Add Font Awesome -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
    />

    <div class="banner-header">
      <div class="slider">
        <img
          v-for="(img, idx) in slides"
          :key="img.src"
          :src="img.src"
          :alt="img.alt"
          :class="{ active: idx === currentSlide }"
        />
      </div>
    </div>

    <header class="header">
      <nav class="nav-container">
        <div class="nav__data">
          <div class="left-header">
            <div class="left-inner">
              <div class="header-logo">
                <router-link to="/" class="header-logo-link">
                  <span>TEAM FOR ONE</span>
                </router-link>
              </div>
              <!-- MEGA MENU ĐỘNG -->
              <div
                class="header-item"
                @click.stop="toggleMenu"
                :aria-expanded="menuOpen"
                tabindex="0"
              >
                <div class="danhmuc-item">
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="-0.00012207"
                      y="0.000190735"
                      width="18"
                      height="2"
                      rx="1"
                      fill="white"
                    ></rect>
                    <rect
                      x="-0.00012207"
                      y="5.99999"
                      width="18"
                      height="2"
                      rx="1"
                      fill="white"
                    ></rect>
                    <rect
                      x="-0.00012207"
                      y="12.0001"
                      width="18"
                      height="2"
                      rx="1"
                      fill="white"
                    ></rect>
                  </svg>
                </div>
                <span>Danh Mục</span>
                <nav class="megamenu-nav" v-if="menuOpen">
                  <ul class="megamenu-nav-main">
                    <li
                      class="megamenu-nav-item"
                      v-for="(item, idx) in megamenu"
                      :key="item.label"
                      @mouseenter="hoveredIndex = idx"
                      @mouseleave="hoveredIndex = null"
                      :class="{ active: hoveredIndex === idx }"
                    >
                      <a class="href">
                        <span class="item" v-html="item.icon"></span>
                        <span class="item">
                          <router-link v-if="item.to" :to="item.to">{{
                            item.label
                          }}</router-link>
                          <span v-else>{{ item.label }}</span>
                        </span>
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
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div
                    class="megamenu-content"
                    v-if="hoveredIndex !== null"
                    @mouseenter="contentHover = true"
                    @mouseleave="contentHover = false"
                  >
                    <div
                      class="megamenu-content-grid"
                      v-for="(col, idx) in megamenu[hoveredIndex].children"
                      :key="idx"
                    >
                      <div class="megamenu-content-col">
                        <h4>{{ col.title }}</h4>
                        <ul>
                          <li v-for="(c, i) in col.values" :key="i">{{ c }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <!-- END MEGA MENU -->
            </div>
          </div>
          <div class="right-header">
            <div class="search-box">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Bạn cần tìm gì?"
                @focus="onSearchFocus"
                @input="onInput"
                @blur="onSearchBlur"
              />
              <i
                class="fa-solid fa-magnifying-glass"
                @click="onSearchClick"
              ></i>
              <div v-if="showSearchDropdown" class="search-dropdown">
                <div v-if="filteredProducts.length">
                  <div
                    v-for="product in filteredProducts"
                    :key="product.id + '-' + product.type"
                    class="search-item"
                    @click="goToProduct(product.id, product.type)"
                  >
                    {{ product.tensp }}
                  </div>
                </div>
                <div v-else class="search-item not-found">
                  Không tìm thấy sản phẩm.
                </div>
              </div>
            </div>
            <div
              v-for="item in rightMenu"
              :key="item.text1 + item.text2"
              :class="item.class"
            >
              <a
                :class="item.actionClass"
                :href="item.to"
                @click.prevent="item.class === 'cart-item' && showCart()"
                style="position: relative"
              >
                <span
                  class="box-icon"
                  style="position: relative"
                  v-html="item.icon"
                ></span>
                <span
                  v-if="item.class === 'cart-item' && cart.totalQuantity > 0"
                  class="cart-badge"
                  >{{ cart.totalQuantity }}</span
                >
                <span class="text-box">
                  <span class="txtnw">{{ item.text1 }}</span>
                  <span class="txt-overflow">{{ item.text2 }}</span>
                </span>
              </a>
            </div>
            <div class="login-item" v-if="!storeUser.user">
              <router-link
                class="login-action"
                to="/Login"
                style="position: relative"
              >
                <span
                  class="box-icon"
                  v-html="rightMenu[rightMenu.length - 1].icon"
                ></span>
                <span class="text-box">
                  <span class="txtnw">Đăng</span>
                  <span class="txt-overflow">Nhập</span>
                </span>
              </router-link>
            </div>
            <div class="login-item" v-else>
              <div class="navbar-user-hover">
                <span class="navbar-user-name">{{ storeUser.user.ten }}</span>
                <button class="navbar-logout-btn" @click.prevent="dangXuat">
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <div class="sub-header">
      <div class="sub-container">
        <div class="nav_sub">
          <ul class="nav_sub-list">
            <li v-for="item in subNav" :key="item.text" class="nav_sub-item">
              <a :href="item.href" class="nav_sub-link">
                <span class="sub-icon" v-html="item.icon"></span>
                <span class="sub-text">{{ item.text }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  defineEmits,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "@/stores/productAPI"; // Mobile/Tablet
import { useProducts } from "@/stores/productsAPI"; // Laptop
import { useStores } from "@/stores/useProductAPI"; // Màn hình, phụ kiện
import { useCartStore } from "@/stores/cart";
import { userAPI } from "@/stores/userAPI";
const storeUser = userAPI();
const route = useRoute();
const cart = useCartStore();
function dangXuat() {
  storeUser.user = null;
  router.push("/");
}
// SEARCH
const productsStore = useProductsStore();
const laptopStore = useProducts(); // laptop
const extraStore = useStores(); // màn hình, phụ kiện
const searchQuery = ref("");
const showSearchDropdown = ref(false);
const router = useRouter();

// 1. Gộp tất cả sản phẩm từ các store vào một mảng chung để tìm kiếm
const allProducts = computed(() => {
  // Gộp các loại sản phẩm
  const mobileTablet = (productsStore.product || [])
    .map((p) => ({
      ...p,
      tensp: p.tensp,
      id: p.id,
      type: "mobile",
    }))
    .filter((p) => p.id && p.type);

  const laptop = (laptopStore.laptop || [])
    .map((p) => ({
      ...p,
      tensp: p.tensp,
      id: p.id,
      type: "laptop",
    }))
    .filter((p) => p.id && p.type);

  const manHinh = (extraStore.manHinh || [])
    .map((p) => ({
      ...p,
      tensp: p.name,
      id: p.id,
      type: "manhinh",
    }))
    .filter((p) => p.id && p.type);

  const phuKien = (extraStore.phuKien || [])
    .map((p) => ({
      ...p,
      tensp: p.name,
      id: p.id,
      type: "phukien",
    }))
    .filter((p) => p.id && p.type);

  // Chỉ lấy sản phẩm có đủ id và type
  return [...mobileTablet, ...laptop, ...manHinh, ...phuKien];
});

// 2. Tìm kiếm trên toàn bộ mảng tổng hợp
function removeVietnameseTones(str) {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/đ/g, "d").replace(/Đ/g, "D");
  return str;
}

const filteredProducts = computed(() => {
  const q = removeVietnameseTones(searchQuery.value.trim().toLowerCase());
  if (!q) return [];
  return allProducts.value.filter((p) => {
    const name = removeVietnameseTones((p.tensp || p.name || "").toLowerCase());
    return name.includes(q);
  });
});

const emit = defineEmits(["show-cart"]);
function showCart() {
  emit("show-cart");
}

watch(
  () => route.path,
  () => {
    // Reset search khi route thay đổi
    resetSearch();
  }
);

// 3. Fetch tất cả dữ liệu sản phẩm khi mounted
onMounted(() => {
  if (!productsStore.product.length) productsStore.fetchProducts();
  if (!laptopStore.laptop.length) laptopStore.fetchProducts();
  if (!extraStore.manHinh.length) extraStore.fetchManHinh();
  if (!extraStore.phuKien.length) extraStore.fetchPhuKien();
});
function onInput() {
  // Fetch data khi cần
  if (!productsStore.product.length) productsStore.fetchProducts();
  if (!laptopStore.laptop.length) laptopStore.fetchProducts();
  if (!extraStore.manHinh.length) extraStore.fetchManHinh();
  if (!extraStore.phuKien.length) extraStore.fetchPhuKien();

  // Force re-compute filteredProducts và hiện dropdown
  showSearchDropdown.value = !!searchQuery.value.trim();
}

function onSearchClick() {
  const hasQuery = !!searchQuery.value.trim();
  showSearchDropdown.value = hasQuery;
}

function goToProduct(id, type) {
  const item = allProducts.value.find(
    (p) => String(p.id) === String(id) && p.type === type
  );
  if (!item) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  const typeToRoute = {
    mobile: "product",
    laptop: "laptop",
    manhinh: "man-hinh",
    phukien: "phu-kien",
  };

  const basePath = typeToRoute[item.type] || "product";

  searchQuery.value = "";
  showSearchDropdown.value = false;

  resetSearch(); // Reset search state

  // Navigate
  router.push(`/${basePath}/${item.id}`);
}

function resetSearch() {
  searchQuery.value = ""; // Clear input
  showSearchDropdown.value = false; // Ẩn dropdown
}

function onSearchBlur() {
  // Tăng thời gian delay và chỉ ẩn nếu không focus vào dropdown
  setTimeout(() => {
    if (!document.activeElement?.closest(".search-dropdown")) {
      showSearchDropdown.value = false;
    }
  }, 250);
}

// Thêm hàm xử lý khi click vào input để đảm bảo dropdown hiện
function onSearchFocus() {
  if (searchQuery.value.trim()) {
    showSearchDropdown.value = true;
  }
}

/* Banner Images (dynamic) */
const slides = ref([
  {
    src: "https://file.hstatic.net/200000722513/file/thang_06_hssv_1280_x_50.png",
    alt: "Banner Image 1",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_191b3b.jpg",
    alt: "Banner Image 2",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_29353a.jpg",
    alt: "Banner Image 3",
  },
  {
    src: "https://file.hstatic.net/200000722513/file/thang_06_laptop_gaming_1280_x_50.png",
    alt: "Banner Image 4",
  },
]);
const currentSlide = ref(0);
let sliderInterval;

function showSlide(index) {
  currentSlide.value = index;
}
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}
onMounted(() => {
  showSlide(0);
  sliderInterval = setInterval(nextSlide, 10000);
});
onBeforeUnmount(() => {
  clearInterval(sliderInterval);
});

/* MEGA MENU DATA DRIVEN */
const megamenu = [
  {
    label: "Mobile",
    to: "/linhkien",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      fill="currentColor" class="bi bi-phone" viewBox="0 0 20 20">
      <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
      <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    </svg>`,
    children: [
      {
        title: "Thương hiệu",
        values: ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo"],
      },
      {
        title: "Giá bán",
        values: ["Dưới 5 triệu", "5-10 triệu", "Trên 10 triệu"],
      },
      {
        title: "Phụ kiện",
        values: ["Ốp lưng", "Sạc dự phòng", "Tai nghe"],
      },
    ],
  },
  {
    label: "Tablet",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      fill="currentColor" class="bi bi-tablet" viewBox="0 0 20 20">
      <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
      <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    </svg>`,
    children: [
      {
        title: "Thương hiệu",
        values: ["iPad", "Samsung", "Lenovo", "Xiaomi"],
      },
      {
        title: "Phụ kiện",
        values: ["Bàn phím", "Bút cảm ứng", "Ốp lưng"],
      },
    ],
  },
  {
    label: "Laptop Văn Phòng",
    icon: `<svg width="20" height="13" viewBox="0 0 20 13" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002Z" fill="currentcolor"></path>
      <path d="M1 12L19 12" stroke="currentcolor" stroke-linecap="round"></path>
    </svg>`,
    children: [
      {
        title: "Thương hiệu",
        values: ["ASUS", "ACER", "MSI", "LENOVO", "DELL"],
      },
      {
        title: "CPU",
        values: [
          "Intel Core i3",
          "Intel Core i5",
          "Intel Core i7",
          "AMD Ryzen",
        ],
      },
      {
        title: "Nhu cầu",
        values: ["Văn phòng", "Học sinh - Sinh viên", "Mỏng nhẹ"],
      },
    ],
  },
  // ... Thêm các mục khác tương tự ...
];

const menuOpen = ref(false);
const hoveredIndex = ref(null);
const contentHover = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
  if (!menuOpen.value) hoveredIndex.value = null;
}
function closeMenu(e) {
  if (
    !e.target.closest(".header-item") &&
    !e.target.closest(".megamenu-content")
  ) {
    menuOpen.value = false;
    hoveredIndex.value = null;
  }
}
onMounted(() => {
  document.addEventListener("click", closeMenu);
  router.afterEach(() => {
    resetSearch();
  });
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});

/* Right Header Menu (dynamic) */
const rightMenu = [
  {
    class: "hotline-item",
    actionClass: "hotline-action",
    href: "tel:0785621591",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-headset-icon lucide-headset"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" /><path d="M21 16v2a4 4 0 0 1-4 4h-5" /></svg>`,
    text1: "Hotline",
    text2: "0785.621.591",
  },
  {
    class: "showroom-item",
    actionClass: "showroom-action",
    href: "#",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-icon lucide-map"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></svg>`,
    text1: "Hệ thống",
    text2: "Showroom",
  },
  {
    class: "order-item",
    actionClass: "order-action",
    href: "#",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-clock-icon lucide-calendar-clock"><path d="M16 14v2.2l1.6 1" /><path d="M16 2v4" /><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2-2v14a2 2 0 0 0 2 2h3.5" /><path d="M3 10h5" /><path d="M8 2v4" /><circle cx="16" cy="16" r="6" /></svg>`,
    text1: "Tra cứu",
    text2: "đơn hàng",
  },
  {
    class: "cart-item",
    actionClass: "cart-action",
    to: "/gio-hang",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M16 10a4 4 0 0 1-8 0" /><path d="M3.103 6.034h17.794" /><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>`,
    text1: "Giỏ",
    text2: "Hàng",
  },
];

/* Dynamic Subnav */
const subNav = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag-icon lucide-tag"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /></svg>`,
    text: "Build PC tặng màn 240Hz",
    href: "#",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-newspaper-icon lucide-newspaper"><path d="M15 18h-5" /><path d="M18 14h-8" /><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" /><rect width="8" height="4" x="10" y="6" rx="1" /></svg>`,
    text: "Tin Công Nghệ",
    href: "#",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database-backup-icon lucide-database-backup"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 12a9 3 0 0 0 5 2.69" /><path d="M21 9.3V5" /><path d="M3 5v14a9 3 0 0 0 6.47 2.88" /><path d="M12 12v4h4" /><path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" /></svg>`,
    text: "Thu cũ đổi mới",
    href: "#",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wrench-icon lucide-wrench"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>`,
    text: "Dịch vụ sửa chữa, kỹ thuật tại nhà",
    href: "#",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-info-icon lucide-badge-info"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><line x1="12" x2="12" y1="16" y2="12" /><line x1="12" x2="12.01" y1="8" y2="8" /></svg>`,
    text: "Tra cứu bảo hành",
    href: "#",
  },
];
</script>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.login-item {
  display: flex;
  align-items: center;
  min-width: 120px;
  padding: 0 8px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  position: relative;
}

/* Container hover */
.navbar-user-hover {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px; /* khoảng cách vừa phải */
}

/* Tên user màu vàng nổi bật */
.navbar-user-name {
  color: #ffd700;
  font-weight: bold;
  /* padding: 4px 12px; */
  width: 150px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.18s;
}

/* Nút đăng xuất luôn nằm sát cạnh tên, mặc định ẩn */
.navbar-logout-btn {
  opacity: 0;
  pointer-events: none;
  margin-left: 6px;
  background: #fff;
  color: #e30019;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  padding: 4px 14px;
  cursor: pointer;
  margin-top: 55px;
  margin-left: 15px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.07);
  transition: opacity 0.18s, background 0.18s, color 0.18s;
  white-space: nowrap;
  font-size: 15px;
  position: absolute; /* Không dùng absolute để luôn sát tên */
}

/* Khi hover vào vùng user hoặc nút có focus, hiện nút đăng xuất */
.navbar-user-hover:hover .navbar-logout-btn,
.navbar-user-hover:focus-within .navbar-logout-btn {
  opacity: 1;
  pointer-events: auto;
}

.navbar-logout-btn:hover {
  background: #ffd700;
  color: #be1529;
}
.cart-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #e60023;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 7px;
  border-radius: 24px;
  z-index: 10;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
  border: 2px solid #fff;
  pointer-events: none;
}
/* ======= Reset & Base Styles ======= */
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

a:hover {
  opacity: 0.8;
}

/* ======= Header & Navigation ======= */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #e30019;
  text-decoration: none;
  width: 100%;
  margin-left: 0;
}

.banner-header {
  height: 60px;
  background-color: blue;
  width: 120%;
  margin-left: -50px;
  margin-top: 0;
}

.nav-container {
  background-color: #d00;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.nav__data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  gap: 20px;
}

.left-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 70px;
}

.left-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
}

.header-logo {
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  transform: translateX(-10px);
  cursor: pointer;
}

.header-item {
  display: flex;
  align-items: center;
  color: white;
  background-color: #be1529;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
  width: auto;
  border-radius: 4px;
  padding: 10px 10px;
  justify-content: center;
  font-weight: bold;
  position: relative;
  user-select: none;
  opacity: 1;
  transition: opacity 0.2s;
}

.header-item:hover,
.megamenu-nav-item:hover,
.megamenu-nav-item.active {
  opacity: 1 !important;
}

/* ... các phần khác giữ nguyên ... */

.danhmuc-item {
  display: flex;
  align-items: center;
}

.danhmuc-item svg {
  width: 20px;
  height: 20px;
  display: block;
}

.right-header {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 25px;
  margin-right: 85px;
}

/* ======= Megamenu Styles ======= */
.megamenu-nav {
  display: flex;
  position: absolute;
  left: -180px;
  top: 110px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  min-width: 80px;
  color: #222;
  opacity: 1 !important;
  visibility: visible;
  padding-left: 0;
}

.megamenu-nav-main {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  min-width: 220px;
}

.megamenu-nav-item {
  min-width: 220px;
  position: relative;
  border-bottom: 1px solid #e5e5e5;
  transition: all 0.2s ease;
  background-color: #ffffff;
}

.megamenu-nav-item:last-child {
  border-bottom: none;
}

.megamenu-nav-item:hover,
.megamenu-nav-item.active {
  background-color: #ea1c04;
  color: #fff;
}

/* Active text color */
.megamenu-nav-item.active .href,
.megamenu-nav-item.active .item,
.megamenu-nav-item.active svg,
.megamenu-nav-item:hover .href,
.megamenu-nav-item:hover .item,
.megamenu-nav-item:hover svg {
  color: #fff;
  stroke: #fff;
}

.megamenu-nav-item:hover .arrow-icon,
.megamenu-nav-item.active .arrow-icon {
  opacity: 1;
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
  width: 220px;
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
  margin-top: 5px;
}

.item:nth-child(2) {
  flex: 1;
  text-align: left;
  font-weight: 500;
  margin-top: 2px;
}

.item:last-child {
  margin-left: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  width: 10px;
  height: 8px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.bi {
  fill: currentColor;
}

svg {
  transition: color 0.2s ease;
}

/* Chỉ duy nhất 1 content hiển thị cố định bên phải */
.megamenu-content {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: flex-start;
  gap: 0 48px;
  position: absolute;
  left: 210px;
  top: 0;
  height: 100%;
  min-height: 100%;
  background: #fff;
  min-width: 998px;
  /* box-shadow: 0 4px 20px rgba(0,0,0,0.25); */
  z-index: 10000;
  padding: 24px 32px;
  gap: 32px;
  /* border-radius: 10px; */
  overflow-y: hidden;
  border: 1px solid #e0e0e0;
  opacity: 1 !important;
  visibility: visible;
  pointer-events: auto;
}

.megamenu-content-grid {
  margin-right: 20px;
}

.megamenu-content-col {
  min-width: 120px;
}

.megamenu-content-col h4 {
  color: #e30019;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 0;
}

.megamenu-content-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.megamenu-content-col li {
  color: #222;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  transition: color 0.2s;
}

.megamenu-content-col li:hover {
  color: #e30019;
}

/* ======= Search Box & Icons ======= */
/* Search Box - Fixed */
.search-box {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  width: 350px;
  height: 40px;
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.search-box:focus-within {
  border-color: #e30019;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

.search-box input {
  width: 100%;
  height: 100%;
  padding: 10px 40px 10px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #111827;
  background: transparent;
  border-radius: 8px;
}

.search-box i.fa-magnifying-glass {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6b7280;
  cursor: pointer;
  z-index: 2;
}

/* Search Dropdown - Fixed */
.search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  z-index: 10000;
  padding: 8px;
  max-height: 320px;
  overflow-y: auto;
  display: block;
}

.search-item {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.2;
  color: #111827;
  cursor: pointer;
  transition: background-color 0.12s, color 0.12s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-item + .search-item {
  margin-top: 4px;
}

.search-item:hover,
.search-item:focus {
  background: #fff1f2;
  color: #b91c1c;
  outline: none;
}

.search-item.not-found {
  color: #6b7280;
  cursor: default;
  background: #f9fafb;
}

.hotline-item,
.showroom-item,
.order-item,
.cart-item,
.login-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.hotline-action,
.showroom-action,
.order-action,
.cart-action,
.login-action {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  gap: 8px;
}

.box-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.box-icon i,
.box-icon svg {
  width: 24px;
  height: 24px;
  stroke: white;
  fill: none;
}

.text-box {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.txtnw {
  font-size: 12px;
  white-space: nowrap;
  font-weight: normal;
}

.txt-overflow {
  font-size: 14px;
  text-overflow: ellipsis;
  max-width: 120px;
  font-weight: bold;
  white-space: nowrap;
}

/* Adjustments for specific icons if needed */
.lucide-calendar-clock,
.lucide-shopping-bag,
.lucide-shield-user {
  stroke-width: 1.5;
}

/* ======= Sub Header ======= */
.sub-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  position: sticky;
  z-index: 10;
  top: 65px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.sub-container {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 90px;
  display: flex;
  justify-content: space-between;
}

.nav_sub {
  display: flex;
  justify-content: center;
}

.nav_sub-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  gap: 60px;
}

.nav_sub-item {
  margin: 0;
  position: relative;
}

.nav_sub-item::after {
  content: "";
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background-color: #e0e0e0;
}

.nav_sub-item:last-child::after {
  display: none;
}

.nav_sub-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.sub-icon {
  margin-right: 8px;
}

.sub-icon svg {
  width: 24px;
  height: 24px;
  stroke: #000000;
}

.sub-text {
  line-height: 1.2;
  font-size: 16px;
}

.nav_sub-link:hover {
  color: #e30019;
}
.nav_sub-link:hover .sub-icon svg {
  stroke: #e30019;
}

/* ======= Main & Section ======= */
.main {
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: calc(100vh - 122px);
}

.section-slider {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: transparent;
  width: 100%;
  border-radius: 8px;
  overflow: visible;
}

.container-header {
  padding: 0;
  overflow: visible;
}

/* ======= Index & Banner ======= */
.index-wrap {
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  position: relative;
  right: 50px;
}

.index-nav {
  width: 260px;
  flex: 1;
}

.index-banner {
  flex: 1;
  display: flex;
  gap: 10px;
  height: 500px;
}

/* ======= Slider ======= */
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

.banner-top img:target,
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

/* ======= Responsive ======= */
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

.href,
.href a,
.meagamenu-nav-main a,
.megamenu-nav-item .item a,
.megamenu-nav-item a,
.megamenu-content-col a,
.router-link-active,
.router-link-exact-active {
  text-decoration: none !important;
  color: inherit;
}

.header-logo-link {
  text-decoration: none !important;
  color: inherit;
}

.header-logo-link:hover,
.header-logo-link:focus,
.header-logo-link:active,
.header-logo-link:visited {
  text-decoration: none !important;
  color: inherit;
}
</style>
