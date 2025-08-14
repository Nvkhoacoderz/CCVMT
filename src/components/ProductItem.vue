<template>
    <div class="product-Lap" v-if="props.laptop && props.laptop.hinh" @click="goToDetail()">
      <img :src="require(`@/assets/${props.laptop.hinh}`)" :alt="props.laptop.tensp" />
      <h3>{{props.laptop.tensp}}</h3>
      <p>Giá: {{ props.laptop.gia.toLocaleString('vi-VN') }}₫</p>
    </div>
    <div v-else class="product product--empty">
        <span>Sản phẩm không hợp lệ</span>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router"
const router =useRouter()

function goToDetail(){
  router.push({name:'Detail',params:{id:props.laptop.id}})

}
// eslint-disable-next-line no-undef
const props= defineProps({
  laptop:{
    type: Object,
    required: true
  }
})

</script>

<style>
.product-Lap {
  background: #f5f2ed;
  padding: 20px;
  width: 220px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.product-Lap img {
  height: 150px;
  width: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.product-Lap:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.product-Lap h3 {
  margin-top: 15px;
  font-size: 18px;
  color: #333;
}

.product-Lap::after {
  content: "Mua";
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: rgba(179, 4, 4, 0.7);
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.4s, transform 0.4s;
}

.product-Lap:hover::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.product-Lap p{
  color: red;
  font-weight: bolder;
}

</style>