<template>
  <div v-if="show" class="cart-modal-overlay" @click.self="close">
    <div class="cart-modal">
      <h2>Giỏ hàng</h2>
      <div v-if="cartItems.length === 0">Giỏ hàng trống</div>
      <div v-else>
        <div v-for="item in cartItems" :key="itemKey(item)" class="cart-item">
          <img
            v-if="item.image"
            :src="
              isRequireImage(item.image)
                ? require('@/assets/image/' + item.image)
                : item.image
            "
            alt="Hình món"
            class="cart-item-img"
          />
          <div class="cart-item-info">
            <div class="cart-item-name">{{ item.name }}</div>
            <div v-if="item.size" class="cart-item-detail">
              <span class="cart-item-label">Size:</span>
              <span class="cart-item-size">{{ item.size }}</span>
            </div>
            <div v-if="item.color" class="cart-item-detail">
              <span class="cart-item-label">Màu sắc:</span>
              <span class="cart-item-type">{{ item.color }}</span>
            </div>
            <div v-if="item.warranty" class="cart-item-detail">
              <span class="cart-item-label">Gói bảo hành:</span>
              <span class="cart-item-price">{{ item.warranty }}</span>
            </div>
            <div v-if="item.note !== undefined" class="cart-item-detail">
              <span class="cart-item-label">Ghi chú:</span>
              <input
                class="cart-item-note-input"
                type="text"
                v-model="item.note"
                @input="updateNote(item, item.note)"
                placeholder="Nhập ghi chú cho món này"
              />
            </div>
            <div class="cart-item-qty">
              <button @click="decreaseQty(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQty(item)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" @click="removeItem(item)">
            Xóa
          </button>
        </div>
        <div class="cart-total">
          <span>Tổng tiền:</span>
          <span class="cart-total-value"
            >{{ totalPrice.toLocaleString() }} đ</span
          >
        </div>
      </div>
      <button class="cart-modal-close" @click="close">Đóng</button>
      <button class="cart-modal-pay" @click="goToPay()">Thanh toán</button>
    </div>
  </div>
</template>

<script>
import { userAPI } from "@/stores/userAPI";
import { useRouter } from "vue-router";
export default {
  name: "CartModal",
  props: {
    show: Boolean,
    cartItems: Array,
  },
  setup(props, { emit }) {
    const userStore = userAPI();
    const router = useRouter();

    const goToPay = () => {
      if (!userStore.user) {
        alert("Bạn phải đăng nhập để mua/đặt hàng!");
        router.push("/Login");
        return;
      }
      router.push({
        name: "Checkout",
        params: { cart: JSON.stringify(props.cartItems) },
      });
      emit("close");
    };

    return { goToPay };
  },
  emits: ["close", "update:cartItems"],
  computed: {
    totalPrice() {
      // Tính tổng tiền, mặc định 0 nếu không có price
      return this.cartItems.reduce((sum, item) => {
        const price = item.price ? item.price : 0;
        return sum + price * (item.quantity || 1);
      }, 0);
    },
  },
  methods: {
    itemKey(item) {
      // Ghép các trường đặc trưng để key cho từng loại sản phẩm
      return [
        item.id,
        item.size || "",
        item.color || "",
        item.warranty || "",
        item.type || "",
      ].join("-");
    },
    isRequireImage(image) {
      // Nếu image chỉ là tên file thì dùng require
      return image && !image.startsWith("/") && !image.startsWith("http");
    },
    close() {
      this.$emit("close");
    },
    increaseQty(item) {
      item.quantity = (item.quantity || 1) + 1;
      this.$emit("update:cartItems", [...this.cartItems]);
    },
    decreaseQty(item) {
      if ((item.quantity || 1) > 1) {
        item.quantity--;
        this.$emit("update:cartItems", [...this.cartItems]);
      } else {
        this.removeItem(item);
      }
    },
    updateNote(item, newNote) {
      item.note = newNote;
      this.$emit("update:cartItems", [...this.cartItems]);
    },
    removeItem(item) {
      const idx = this.cartItems.findIndex(
        (i) => this.itemKey(i) === this.itemKey(item)
      );
      if (idx !== -1) {
        const newCart = [...this.cartItems];
        newCart.splice(idx, 1);
        this.$emit("update:cartItems", newCart);
      }
    },
  },
};
</script>

<style scoped>
.cart-item-note-input {
  width: 220px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
  margin-top: 3px;
}
.cart-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000000;
}
.cart-modal {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  min-width: 350px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
}
.cart-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  gap: 16px;
}
.cart-item-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 0;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}
.cart-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cart-item-name {
  font-weight: bold;
  font-size: 17px;
}
.cart-item-detail {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #555;
}
.cart-item-label {
  color: #888;
  font-size: 13px;
  min-width: 60px;
}
.cart-item-size,
.cart-item-type,
.cart-item-note,
.cart-item-price {
  font-weight: 500;
  color: #333;
}
.cart-item-qty {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.cart-item-qty button {
  width: 26px;
  height: 26px;
  border: none;
  background: #eee;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}
.cart-item-remove {
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 8px;
  align-self: flex-start;
  font-size: 14px;
}
.cart-modal-close {
  margin-top: 16px;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.cart-modal-pay {
  margin-top: 12px;
  background-color: #e60023;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.cart-modal-pay:hover {
  background-color: #c1001e;
}
.cart-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 18px;
  gap: 10px;
}
.cart-total-value {
  color: #b30404;
  font-size: 20px;
}
</style>
