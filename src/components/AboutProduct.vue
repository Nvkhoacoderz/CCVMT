<template>
  <section class="productLap">
    <div class="product-1">
        <img src="@/assets/ld_-_big_tag.png" alt="">
        <div class="product-list-1">
            <ProductItem v-for="sp in pageProducts" :key="sp.id" :product="sp"/>
        </div>

        <!-- Phân trang tại đây -->
        <div>
          <button class="page-btn" v-if="page > 1" @click="gotoPage(page - 1)">&lt;</button>
          <button class="page-btn" v-for="page in totalPages" :key="page" @click="gotoPage(page)">  {{ page }} </button>
          <button class="page-btn" v-if="page < totalPages" @click="gotoPage(page + 1)">&gt;</button>
        </div>
    </div>

    <div class="product-2">
        <img src="@\assets\ld_-_big_tag_best_seller_92859dc8015b43dcad2f111241dad4c7.png" alt="">
        <div class="product-list-2">
            <ProductItem v-for="sp in pageProducts" :key="sp.id" :product="sp"/>
        </div>
         <!-- Phân trang tại đây -->
        <div>
          <button class="page-btn" v-if="page > 1" @click="gotoPage(page - 1)">&lt;</button>
          <button class="page-btn" v-for="page in totalPages" :key="page" @click="gotoPage(page)">  {{ page }} </button>
          <button class="page-btn" v-if="page < totalPages" @click="gotoPage(page + 1)">&gt;</button>
        </div>
    </div>
  </section>
  
   

  
</template>

<script setup>
import ProductItem from "./ProductItem.vue";
import { computed,onMounted, ref } from "vue";
import {useProducts } from "../stores/productsAPI";

const page = ref(1)
const limit = ref(4)
const store = useProducts();
const totalPages = computed(() => Math.ceil(store.laptop.length / limit.value))

const pageProducts = computed(() => {
  const start = (page.value - 1) * limit.value;
  const end = start + limit.value;
  return store.laptop.slice(start, end)
})
console.log(pageProducts.value)

function gotoPage(p) {
  if(p >= 1 && p <= totalPages.value) {
    page.value = p;
  }
}

onMounted(() => {
  store.fetchProducts();
  page.value = 1; // Reset page to 1 on mount
});

</script>

<style>
.product-1 {
  background:antiquewhite ;
  padding: 60px 20px;
   text-align: center;
}
.product-2 {
  background: beige ;
  padding: 60px 20px;
   text-align: center;
}

.product-list-1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
.product-list-2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
.view-more {
  margin-top: 40px;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: bold;
  background-color: #e74c3c; /* đỏ nổi bật */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.view-more:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}
.page-btn {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  color: #333;
  border-radius: 6px;
  padding: 6px 12px;
  margin: 0 2px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.page-btn:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.page-btn:disabled {
  background-color: #e9ecef;
  color: #aaa;
  border-color: #ddd;
  cursor: not-allowed;
}

.page-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}


</style>