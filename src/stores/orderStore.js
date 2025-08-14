import { defineStore } from "pinia";
import { APIURL } from "@/constaint";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    currentOrder: null,
    error: null,
    loading: false,
  }),

  getters: {
    orderCount: (state) => state.orders.length,
    getOrderById: (state) => (id) => state.orders.find((o) => o.id === id),
    lastOrder: (state) =>
      state.orders.length > 0 ? state.orders[state.orders.length - 1] : null,
  },

  actions: {
    async fetchOrders() {
      this.loading = true;
      try {
        const res = await fetch(`${APIURL}/orders`);
        if (!res.ok) throw new Error("Không thể lấy danh sách đơn hàng");
        this.orders = await res.json();
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async addOrder(order) {
      this.loading = true;
      try {
        // Tạo mã đơn ngẫu nhiên nếu chưa có
        if (!order.id) {
          order.id = Math.random().toString(16).slice(2, 6);
        }
        // Thêm thời gian đặt hàng nếu chưa có
        if (!order.timestamp) {
          const now = new Date();
          const pad = (num) => num.toString().padStart(2, "0");
          order.timestamp = `${pad(now.getHours())}:${pad(
            now.getMinutes()
          )}:${pad(now.getSeconds())} ${pad(now.getDate())}/${pad(
            now.getMonth() + 1
          )}/${now.getFullYear()}`;
        }
        const res = await fetch(`${APIURL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });
        if (!res.ok) throw new Error("Không thể lưu đơn hàng");
        const savedOrder = await res.json();
        this.orders.push(savedOrder);
        this.currentOrder = savedOrder;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async removeOrder(id) {
      this.loading = true;
      try {
        const res = await fetch(`${APIURL}/orders/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Không thể xoá đơn hàng");
        this.orders = this.orders.filter((o) => o.id !== id);
        if (this.currentOrder?.id === id) this.currentOrder = null;
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    setCurrentOrder(order) {
      this.currentOrder = order;
    },
  },
});
