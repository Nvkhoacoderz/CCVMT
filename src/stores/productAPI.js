import { defineStore } from 'pinia';
import axios from 'axios';
import { APIURL } from '@/constaint';
export const useProductsStore = defineStore('product', {
    state: () => ({
        product: [],
        color: [],
        size: [],
        ram: [],
        kichthuoc: [],
        productDetail: null,
        error: null
    }),
    getters: {
        getSizeByProduct: (state) => (product) => {
            // ví dụ product.size_id
            return state.size.find(s => s.id === product.size_id)
        },
        getRamByProduct: (state) => (product) => {
            return state.ram.find(r => r.id === product.ram_id)
        },
        getKichThuocByProduct: (state) => (product) => {
            return state.kichthuoc.find(k => k.id === product.kichthuoc_id)
        }
    },
    actions: {
        async fetchRam() {
            try {
                const response = await axios.get(`${APIURL}/ram`);
                this.ram = response.data;
                this.error = null;
            } catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        },
        async fetchSize() {
            try {
                const response = await axios.get(`${APIURL}/sizes`);
                this.size = response.data;
                this.error = null;
            } catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        },
        async fetchKichThuoc() {
            try {
                const response = await axios.get(`${APIURL}/kichthuoc`);
                this.kichthuoc = response.data;
                this.error = null;
            } catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        },
        async fetchProducts() {
            try {
                const response = await axios.get(`${APIURL}/products`);
                this.product = response.data;
                this.error = null;
            } catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        },
        async fetchColor() {
            try {
                const response = await axios.get(`${APIURL}/colors`);
                this.color = response.data;
                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        }
        // async fetchSize() {
        //     try {
        //         const response = await axios.get(`${APIURL}/size`);
        //         this.size = response.data;
        //         this.error = null;
        //     } catch (error) {
        //         this.error = error;
        //         console.error('Lỗi không tải được dữ liễu', error);
        //     }
        // },
        // async fetchToppings() {
        //     try {
        //         const response = await axios.get(`${APIURL}/topping`);
        //         this.topping = response.data;
        //         this.error = null;
        //     } catch (error) {
        //         this.error = error;
        //         console.error('Lỗi không tải được dữ liễu', error);
        //     }
        // },
        // async fetchProductDetail(id) {
        //     try {
        //         const res = await axios.get(`${APIURL}/products/${id}`)
        //         this.productDetail = res.data
        //         this.error = null
        //     } catch (error) {
        //         this.error = error
        //         this.productDetail = null
        //         console.error('Lỗi khi tải chi tiết sản phẩm', error)
        //     }
        // }
    }
})