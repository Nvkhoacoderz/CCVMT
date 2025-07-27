<template>
    <div>
        <!-- Add Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
        
        <div class="banner-header">
            <div class="slider">
                <img id="slide-1" src="https://file.hstatic.net/200000722513/file/thang_06_hssv_1280_x_50.png"
                    alt="Banner Image 1">
                <img id="slide-2" src="https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_191b3b.jpg"
                    alt="Banner Image 2">
                <img id="slide-3" src="https://file.hstatic.net/200000722513/file/man_hinh_thang_04_banner_29353a.jpg"
                    alt="Banner Image 3">
                <img id="slide-4" src="https://file.hstatic.net/200000722513/file/thang_06_laptop_gaming_1280_x_50.png"
                    alt="Banner Image 4">
            </div>
        </div>
        
        <header class="header">
            <nav class="nav-container">
                <div class="nav__data">
                    <div class="left-header">
                        <div class="left-inner">
                            <div class="header-logo">
                                <span>TEAM FOR ONE</span>
                            </div>
                            <div class="header-item">
                                <div class="danhmuc-item">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect x="-0.00012207" y="0.000190735" width="18" height="2" rx="1" fill="white"></rect>
                                        <rect x="-0.00012207" y="5.99999" width="18" height="2" rx="1" fill="white"></rect>
                                        <rect x="-0.00012207" y="12.0001" width="18" height="2" rx="1" fill="white"></rect>
                                    </svg>
                                </div>
                                <span>Danh Mục</span>
                            </div>
                        </div>
                    </div>
                    <div class="right-header">
                        <div class="search-box">
                            <input type="text" placeholder="Bạn cần tìm gì?">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div class="hotline-item">
                            <a class="hotline-action" href="tel:0785621591">
                                <span class="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-headset-icon lucide-headset">
                                        <path
                                            d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
                                        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
                                    </svg>
                                </span>
                                <span class="text-box">
                                    <span class="txtnw">Hotline</span>
                                    <span class="txt-overflow">0785.621.591</span>
                                </span>
                            </a>
                        </div>
                        <div class="showroom-item">
                            <a class="showroom-action" href="">
                                <span class="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-map-icon lucide-map">
                                        <path
                                            d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                                        <path d="M15 5.764v15" />
                                        <path d="M9 3.236v15" />
                                    </svg>
                                </span>
                                <span class="text-box">
                                    <span class="txtnw">Hệ thống</span>
                                    <span class="txt-overflow">Showroom</span>
                                </span>
                            </a>
                        </div>
                        <div class="order-item">
                            <a class="order-action" href="">
                                <span class="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-calendar-clock-icon lucide-calendar-clock">
                                        <path d="M16 14v2.2l1.6 1" />
                                        <path d="M16 2v4" />
                                        <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                                        <path d="M3 10h5" />
                                        <path d="M8 2v4" />
                                        <circle cx="16" cy="16" r="6" />
                                    </svg>
                                </span>
                                <span class="text-box">
                                    <span class="txtnw">Tra cứu</span>
                                    <span class="txt-overflow">đơn hàng</span>
                                </span>
                            </a>
                        </div>
                        <div class="cart-item">
                            <a class="cart-action" href="">
                                <span class="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag">
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                        <path d="M3.103 6.034h17.794" />
                                        <path
                                            d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                                    </svg>
                                </span>
                                <span class="text-box">
                                    <span class="txtnw">Giỏ</span>
                                    <span class="txt-overflow">Hàng</span>
                                </span>
                            </a>
                        </div>
                        <div class="login-item">
                            <a class="login-action" href="">
                                <span class="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-shield-user-icon lucide-shield-user">
                                        <path
                                            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                        <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                                        <circle cx="12" cy="11" r="4" />
                                    </svg>
                                </span>
                                <span class="text-box">
                                    <span class="txtnw">Đăng</span>
                                    <span class="txt-overflow">Nhập</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        
        <div class="sub-header">
            <div class="sub-container">
                <div class="nav_sub">
                    <ul class="nav_sub-list">
                        <li class="nav_sub-item">
                            <a href="#" class="nav_sub-link">
                                <span class="sub-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-tag-icon lucide-tag">
                                        <path
                                            d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                                        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                                    </svg>
                                </span>
                                <span class="sub-text">Build PC tặng màn 240Hz</span>
                            </a>
                        </li>
                        <li class="nav_sub-item">
                            <a href="#" class="nav_sub-link">
                                <span class="sub-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-newspaper-icon lucide-newspaper">
                                        <path d="M15 18h-5" />
                                        <path d="M18 14h-8" />
                                        <path
                                            d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                                        <rect width="8" height="4" x="10" y="6" rx="1" />
                                    </svg>
                                </span>
                                <span class="sub-text">Tin Công Nghệ</span>
                            </a>
                        </li>
                        <li class="nav_sub-item">
                            <a href="#" class="nav_sub-link">
                                <span class="sub-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-database-backup-icon lucide-database-backup">
                                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                                        <path d="M3 12a9 3 0 0 0 5 2.69" />
                                        <path d="M21 9.3V5" />
                                        <path d="M3 5v14a9 3 0 0 0 6.47 2.88" />
                                        <path d="M12 12v4h4" />
                                        <path
                                            d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />
                                    </svg>
                                </span>
                                <span class="sub-text">Thu cũ đổi mới</span>
                            </a>
                        </li>
                        <li class="nav_sub-item">
                            <a href="#" class="nav_sub-link">
                                <span class="sub-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-wrench-icon lucide-wrench">
                                        <path
                                            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                </span>
                                <span class="sub-text">Dịch vụ sửa chữa, kỹ thuật tại nhà</span>
                            </a>
                        </li>
                        <li class="nav_sub-item">
                            <a href="#" class="nav_sub-link">
                                <span class="sub-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-badge-info-icon lucide-badge-info">
                                        <path
                                            d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                        <line x1="12" x2="12" y1="16" y2="12" />
                                        <line x1="12" x2="12.01" y1="8" y2="8" />
                                    </svg>
                                </span>
                                <span class="sub-text">Tra cứu bảo hành</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nav-bar'
}
</script>

<!-- Remove scoped to apply global styles -->
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
    padding: 0;
    overflow-x: hidden;
}

.header {
    /* position: relative; */
    position: sticky;
    top: 0;
    z-index: 1000;
    background: #E30019;
    text-decoration: none;
}

.banner-header {
    height: 60px;
    background-color: blue;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
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

.nav-container {
    background-color: #d00;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    /* position: relative; */
    width: 100vw;
    /* z-index: 1000; */
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
    margin-left: 50px;
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
    background-color: #BE1529;
    gap: 5px;
    cursor: pointer;
    font-size: 14px;
    width: auto;
    border-radius: 4px;
    padding: 10px 10px;
    justify-content: center;
    font-weight: bold;
}

.header-item:hover {
    opacity: 0.8;
}

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
    display: flex;
    align-items: center;
    gap: 25px;
    margin-right: 85px;
}

.search-box {
    position: relative;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    width: 350px;
    height: 40px;
    cursor: pointer;
}

.search-box input {
    width: 100%;
    padding: 12px 40px 8px 15px;
    border: none;
    outline: none;
    font-size: 14px;
    font-family: sans-serif;
    color: #000;
}

.search-box i {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #000;
    font-size: 16px;
}

.search-box i:hover {
    opacity: 0.5;
}

.search-box input:focus {
    outline: none;
}

.hotline-item,
.showroom-item,
.order-item,
.cart-item,
.login-item {
    display: flex;
    align-items: center;
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
    font-size: 16px;
    text-overflow: ellipsis;
    max-width: 120px;
    font-weight: bold;
    white-space: nowrap;
}

a:hover {
    opacity: 0.8;
}

.nav-container * {
    color: white;
}

.lucide-calendar-clock,
.lucide-shopping-bag,
.lucide-shield-user {
    stroke-width: 1.5;
}

.sub-header {
    background-color: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    position: sticky;
    /* top: 0; */
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
    content: '';
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
    color: #E30019;
}

.nav_sub-link:hover .sub-icon svg {
    stroke: #E30019;
}
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // Banner slider logic
    const slides = document.querySelectorAll('.slider img');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 10000); // Change every 10 seconds
});
</script>