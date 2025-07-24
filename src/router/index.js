import { createRouter, createWebHistory } from "vue-router"

import HomePage from "../components/HomePage.vue"
import MobileProduct from "../components/MobileProduct.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
    path: '/mobile/:id',
    name: 'MobileProduct',
    component: MobileProduct,
    props: true
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router