import {APIURL} from "@/constaint"
import { defineStore } from "pinia"

export const useStores = defineStore('manHinh', {
    state: () => ({
        manHinh: [],
        phuKien: [],
        productDetail: null,
        error: null
    }),
    actions: {
        async fetchManHinh() {
            try {
                const response = await fetch(`${APIURL}/man-hinh`)

                if (!response.ok) {
                    this.error = "Lỗi khi gọi API"
                    this.manHinh = []
                }

                const data = await response.json()
                this.manHinh = data
            } catch (error) {
                this.error = error
            }
        },
        async fetchPhuKien() {
            try {
                const response = await fetch(`${APIURL}/phu-kien`)

                if (!response.ok) {
                    this.error = "Lỗi khi gọi API"
                    this.manHinh = []
                }

                const data = await response.json()
                this.phuKien = data
            } catch (error) {
                this.error = error
            }
        },
        async fetchManHinhDetail(id) {
            try {
                const response = await fetch(`${APIURL}/man-hinh/${id}`);

                if (!response.ok) {
                    throw new Error("Lỗi khi gọi API: " + response.status);
                }

                const data = await response.json();
                this.productDetail = data;
                this.error = null;
            } catch (error) {
                this.error = error.message || "Có lỗi xảy ra";
                this.productDetail = null;
            }
        },
        async fetchPhuKienDetail(id) {
            try {
                const response = await fetch(`${APIURL}/phu-kien/${id}`);

                if (!response.ok) {
                    throw new Error("Lỗi khi gọi API: " + response.status);
                }

                const data = await response.json();
                this.productDetail = data;
                this.error = null;
            } catch (error) {
                this.error = error.message || "Có lỗi xảy ra";
                this.productDetail = null;
            }
        },
        resetProductDetail() {
            this.productDetail = null
            this.error = null
        }
    }
})