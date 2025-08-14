import { defineStore } from "pinia";
import axios from "axios";
import { APIURL } from "@/constaint";

export const useProducts = defineStore('products',{
    state:()=>({
        laptop:[],
        categories:[],
        information:[],
        productDetail: null,
        uudai:[],
        showroom:[],
        muaKem: [],
        error: null
    }),
    actions:{
        // phương thức lấy dữ liệu Product từ API về
        async fetchProducts(){
            try {
                const reponse= await axios.get(`${APIURL}/laptop`)
                this.laptop=reponse.data
                this.error=null
            } catch (error) {
                this.error=error
                console.error('Lỗi ko tải được dữ liệu',error)
                
            }
        },
        async fetchCategory(){
            try {
                const reponse= await axios.get(`${APIURL}/categories`)
                this.categories=reponse.data
                this.error=null
            } catch (error) {
                this.error=error
                console.error('Lỗi ko tải được dữ liệu',error)
                
            }
        },
        async fetchInformation(){
            try {
                const reponse= await axios.get(`${APIURL}/information`)
                this.information=reponse.data
                this.error=null
            } catch (error) {
                this.error=error
                this.information=null;
                console.error('Lỗi ko tải được dữ liệu',error)
            }
        },
        async fetchProductDetail(id){
            try {
                const res= await axios.get(`${APIURL}/laptop/${id}`)
                this.productDetail=res.data
                this.error=null
            } catch (error) {
                this.error=error
                this.productDetail=null;
                console.error('Lỗi ko tải được dữ liệu',error)
            }
        },
        async fetchInfoUudai(){
            try {
                const res= await axios.get(`${APIURL}/uudai`)
                this.uudai=res.data
                this.error=null
            } catch (error) {
                this.error=error
                this.uudai=null;
                console.error('Lỗi ko tải được dữ liệu',error)
            }
        },
        async fetchInfoShowroom(){
            try {
                const res= await axios.get(`${APIURL}/showroom`)
                this.showroom=res.data
                this.error=null
            } catch (error) {
                this.error=error
                this.showroom=null;
                console.error('Lỗi ko tải được dữ liệu',error)
            }
        },
        async fetchInfoMuakem(){
            try {
                const res= await axios.get(`${APIURL}/muaKem`)
                this.muaKem=res.data
                this.error=null
            } catch (error) {
                this.error=error
                this.muaKem=null;
                console.error('Lỗi ko tải được dữ liệu',error)
            }
        }
        
        

    }
})