<template>
  <div
    class="product-content"
    v-if="props.product && props.product.img.img1"
    @click="goToManHinhDetail"
  >
    <h3 class="product-title">{{ props.product.name }}</h3>
    <img
      :src="require(`@/assets/image/man-hinh/${props.product.img.img1}`)"
      :alt="props.product.name"
    />
    <p class="product-price">{{ props.product.price.toLocaleString() }}₫</p>
  </div>
  <div v-else class="product-content product--empty">
    <span>Sản phẩm không hợp lệ</span>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";
const router = useRouter();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

function goToManHinhDetail() {
  router.push({ name: "ManHinhDetail", params: { id: props.product.id } });
}
</script>

<style scoped>
.product-content {
  width: 100%;
  height: 100%;
  padding: 20px 12px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
}

.product-title {
  margin-bottom: 10px;
  min-height: 46px;
  font-size: 18px;
  color: #333;
  font-weight: 600;
  transition: color 0.2s;
}

.product-content:hover .product-title {
  color: #ea1c04;
}

.product-content img {
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: contain;
  border-radius: 8px;
  background: #f5f5f5;
  margin-bottom: 10px;
}

.product-price {
  font-size: 16px;
  color: #d0021b;
  font-weight: 700;
  margin: 8px 0 18px;
  letter-spacing: 0.5px;
}

.product--empty {
  min-height: 150px;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
}
</style>
