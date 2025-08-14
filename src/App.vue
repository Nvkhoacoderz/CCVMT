<template>
  <div>
    <template v-if="!isLoginPage">
      <Navbar @show-cart="showCartModal = true" />
      <CartModel
        :show="showCartModal"
        :cartItems="cart.items"
        @close="showCartModal = false"
        @update:cartItems="updateCartItems"
      />
    </template>
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar.vue";
import CartModel from "./components/CartModel.vue";
import { useCartStore } from "@/stores/cart";

const showCartModal = ref(false);
const cart = useCartStore();
const route = useRoute()


const isLoginPage = computed(() => route.name === 'Login')

function updateCartItems(newItems) {
  cart.items = newItems;
}
</script>

<style>
/* html, body, #app {
  height: auto !important;
  overflow: visible !important;
} */
</style>
