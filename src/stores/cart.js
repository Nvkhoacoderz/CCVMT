import { defineStore } from "pinia";

function getCartKey(item) {
  // Ghép các trường phân biệt sản phẩm
  return [
    item.id,
    item.size || "",
    item.color || "",
    item.warranty || "",
    item.type || "",
  ].join("-");
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [], // {id, name, image, price, size, color, warranty, type, quantity, ...}
  }),
  getters: {
    totalQuantity: (state) =>
      state.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
  },
  actions: {
    addToCart(product) {
      // product: {id, name, image, ...}
      const key = getCartKey(product);
      const idx = this.items.findIndex((i) => getCartKey(i) === key);
      if (idx !== -1) {
        this.items[idx].quantity = (this.items[idx].quantity || 1) + 1;
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 });
      }
    },
    increaseQty(item) {
      const key = getCartKey(item);
      const idx = this.items.findIndex((i) => getCartKey(i) === key);
      if (idx !== -1)
        this.items[idx].quantity = (this.items[idx].quantity || 1) + 1;
    },
    decreaseQty(item) {
      const key = getCartKey(item);
      const idx = this.items.findIndex((i) => getCartKey(i) === key);
      if (idx !== -1) {
        if ((this.items[idx].quantity || 1) > 1) {
          this.items[idx].quantity--;
        } else {
          this.items.splice(idx, 1);
        }
      }
    },
    removeItem(item) {
      const key = getCartKey(item);
      const idx = this.items.findIndex((i) => getCartKey(i) === key);
      if (idx !== -1) this.items.splice(idx, 1);
    },
    clearCart() {
      this.items = [];
    },
    updateNote(item, newNote) {
      const key = getCartKey(item);
      const idx = this.items.findIndex((i) => getCartKey(i) === key);
      if (idx !== -1) {
        this.items[idx].note = newNote;
      }
    },
  },
});
