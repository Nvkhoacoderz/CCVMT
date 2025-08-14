import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../components/HomePage.vue";
import MobileDetail from "../components/MobileDetail.vue";
import Cart from "../components/CartModel.vue";
import loginComponent from "@/components/loginComponent.vue";
import checkoutPage from "@/components/checkoutPage.vue";
import PhuKienDetail from "@/components/PhuKienDetail.vue";
import ManHinhDetail from "@/components/ManHinhDetail.vue";
import Detail from "@/components/ProductDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/product/:id",
    name: "MobileDetail",
    component: MobileDetail,
    props: true,
  },
  {
    path: "/gio-hang",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/Login",
    name: "Login",
    component: loginComponent,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: checkoutPage,
  },
  {
    path: "/man-hinh/:id",
    name: "ManHinhDetail",
    component: ManHinhDetail,
    props: true,
  },
  {
    path: "/phu-kien/:id",
    name: "PhuKienDetail",
    component: PhuKienDetail,
    props: true,
  },
  {
    path: "/laptop/:id",
    name: "Detail",
    component: Detail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
