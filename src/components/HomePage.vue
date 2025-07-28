<template>
  <section class="products">
    <div class="section-intro">
                <h1>Laptop Văn Phòng</h1>
                <p>Lựa chọn đa dạng, giá tốt, dịch vụ tận tâm tại GEARVN.</p>
            </div>
            <div class="filter-bar">
                <span>Sắp xếp: </span>
                <select>
                    <option>Mặc định</option>
                    <option>Giá tăng dần</option>
                    <option>Giá giảm dần</option>
                    <option>Mới nhất</option>
                    <option>Bán chạy</option>
                </select>
            </div>
    <div class="product-list">
      <MobileProduct v-for="sp in store.product" :key="sp.id" :product="sp"/>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import MobileProduct from '../components/MobileProduct.vue'
import { useProductsStore } from '../stores/productAPI.js'

const store = useProductsStore()

onMounted(() => {
  store.fetchProducts();
  store.fetchSize();
  store.fetchRam();
  store.fetchKichThuoc();
});
</script>

<style>
    .products {
  background: #fff;
  padding: 60px 20px;
  text-align: center;
}
.products h2 {
  font-size: 36px;
  color: #0c2b44;
}
.products p {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}



.section-intro {
    text-align: center;
    padding: 30px 0 10px 0;
}

.section-intro h1 {
    color: #e11d48;
    font-size: 2.2rem;
    margin: 0 0 8px 0;
}

.section-intro p {
    color: #555;
    font-size: 1.1rem;
    margin: 0;
}

.filter-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 18px 0 12px 0;
    gap: 8px;
}

.filter-bar select {
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 1rem;
}
</style>