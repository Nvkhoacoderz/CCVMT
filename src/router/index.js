import { createRouter, createWebHistory } from "vue-router"

import HomePage from "../components/HomePage.vue"
import MobileDetail from "../components/MobileDetail.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/product/:id',
        name: 'MobileDetail',
        component: MobileDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router