import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
  state: () => ({
    currentPage: 1,
  }),
  actions: {
    setPage(page) {
      this.currentPage = page;
    },
  },
  persist: true, // nếu muốn lưu cả khi F5
});
