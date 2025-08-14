import { APIURL } from "@/constaint";
import { defineStore } from "pinia";

export const userAPI = defineStore("userLogin", {
  state: () => ({
    users: [],
    user: null,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch(`${APIURL}/users`);

        if (!response.ok) {
          this.error = "Lỗi khi gọi API";
          this.users = [];
          return;
        }

        const data = await response.json();
        this.users = data;
      } catch (error) {
        this.error = error;
        this.users = [];
        console.error("Lỗi ", error);
      }
    },

    async login(username, password) {
      try {
        if (this.users.length === 0) {
          await this.fetchUsers();
        }

        const userData = this.users.find(
          (u) =>
            u.username.trim().toLowerCase() === username.trim().toLowerCase() &&
            u.matkhau === password
        );

        if (!userData) {
          this.error = "Sai tên đăng nhập hoặc mật khẩu";
          this.user = null;
          return false;
        }

        this.user = userData;
        this.error = null;
        return true;
      } catch (error) {
        this.error = error;
        this.user = null;
        return false;
      }
    },
    async register(newUser) {
      try {
        await this.fetchUsers();

        const existUser = this.users.find(
          (eU) => eU.username.toLowerCase() === newUser.username.toLowerCase()
        );
        const existEmail = this.users.find(
          (eU) => eU.email.toLowerCase() === newUser.email.toLowerCase()
        );

        if (existUser) {
          this.error = "Tên người dùng đã tồn tại";
          return false;
        }

        if (existEmail) {
          this.error = "Email đã được sử dụng";
          return false;
        }

        localStorage.setItem(
          "Danh sách người đăng ký",
          JSON.stringify(newUser)
        );

        const response = await fetch(`${APIURL}/users`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          this.error = "Lỗi khi lưu người dùng mới";
          return false;
        }
        await this.fetchUsers();

        return true;
      } catch (error) {
        this.error = error;
        return false;
      }
    },
  },
});
