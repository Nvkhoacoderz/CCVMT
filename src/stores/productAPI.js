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
        baohanh: [],
        image: [],
        MobileDetail: null,
        error: null
    }),
    getters: {
        getSizeByProduct: (state) => (product) => {
            return state.size.find(s => Number(s.id) === Number(product.size_id))
        },
        getRamByProduct: (state) => (product) => {
            return state.ram.find(r => Number(r.id) === Number(product.ram_id))
        },
        getKichThuocByProduct: (state) => (product) => {
            return state.kichthuoc.find(k => Number(k.id) === Number(product.kichthuoc_id))
        }

    },
    actions: {
        async fetchImage() {
            try {
                const response = await axios.get(`${APIURL}/images`);
                this.image = response.data;
                this.error = null;
            } catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        },
        async fetchBaohanh() {
            try {
                const response = await axios.get(`${APIURL}/baohanh`);
                this.baohanh = response.data;
                this.error = null;
            } catch (error) {
                this.error = error;
                console.error('Lỗi không tải được dữ liễu', error);
            }
        },
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
        },
        async fetchProductDetail(id) {
            try {
                const res = await axios.get(`${APIURL}/products/${id}`)
                this.MobileDetail = res.data
                this.error = null
            } catch (error) {
                this.error = error
                console.error('Lỗi khi tải chi tiết sản phẩm', error)
            }
        }
    }
})