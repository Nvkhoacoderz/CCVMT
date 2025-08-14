<template>
  <div class="checkout-container">
    <div class="checkout-box">
      <div class="checkout-content">
        <!-- Form Thông tin giao hàng -->
        <form class="checkout-form" @submit.prevent="handleSubmit">
          <h3>Thông tin giao hàng</h3>
          <div class="form-group">
            <label>Họ và tên</label>
            <input
              v-model="shipping.name"
              required
              placeholder="Nhập họ và tên"
            />
          </div>
          <div class="form-group">
            <label>Số điện thoại</label>
            <input
              v-model="shipping.phone"
              required
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="shipping.email"
              required
              type="email"
              placeholder="Nhập email"
              @blur="checkEmailAndFillInfo"
            />
          </div>
          <div class="form-group">
            <label>Địa chỉ</label>
            <textarea
              v-model="shipping.address"
              required
              placeholder="Nhập địa chỉ giao hàng"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Ghi chú</label>
            <textarea
              v-model="shipping.note"
              placeholder="Ghi chú về đơn hàng (không bắt buộc)"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Phương thức thanh toán</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="shipping.payment" value="cod" />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label>
                <input type="radio" v-model="shipping.payment" value="bank" />
                Chuyển khoản ngân hàng
              </label>
            </div>
          </div>
          <button class="checkout-btn" type="submit">Xác nhận đặt hàng</button>
        </form>

        <!-- Đơn hàng của bạn -->
        <div class="checkout-order">
          <h3>Đơn hàng của bạn</h3>
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <img :src="item.image" class="order-img" />
            <div class="order-info">
              <div class="order-name">{{ item.name }}</div>
              <div class="order-meta">
                <span>Size: {{ item.size }}</span>
                <span>Màu: {{ item.color }}</span>
                <span v-if="item.warranty">Bảo hành: {{ item.warranty }}</span>
                <span>Số lượng: {{ item.quantity }}</span>
              </div>
            </div>
            <div class="order-price">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
          <div class="order-summary">
            <div class="summary-row">
              <span>Tạm tính:</span>
              <span>{{ formatPrice(subTotal) }}</span>
            </div>
            <div class="summary-row total">
              <span>Tổng cộng:</span>
              <span>{{ formatPrice(total) }}</span>
            </div>
          </div>
          <!-- QR chuyển khoản -->
          <div
            v-if="shipping.payment === 'bank' && total > 0"
            class="qr-container"
          >
            <h4>Quét mã QR để chuyển khoản</h4>
            <img :src="qrUrl" alt="QR chuyển khoản" v-if="qrUrl" />
            <div v-else>Không thể tạo mã QR</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Popup -->
    <div v-if="showSuccessPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#4CAF50" />
            <path
              d="M8 12l2 2 4-4"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3>Đặt hàng thành công!</h3>
        <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
        <p>Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.</p>
        <button class="popup-btn" @click="closePopup">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useHoaDonStore } from "@/stores/hoadon";
import { userAPI } from "@/stores/userAPI";
import { useOrderStore } from "@/stores/orderStore";

const orderStore = useOrderStore();
const cartStore = useCartStore();
const hoaDonStore = useHoaDonStore();
const storeUser = userAPI();
const cartItems = computed(() => cartStore.items);

const showSuccessPopup = ref(false);

const shipping = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
  note: "",
  payment: "cod",
});

// Kiểm tra và điền thông tin từ user đã đăng nhập
onMounted(async () => {
  // Nếu đã đăng nhập, tự động điền thông tin
  if (storeUser.user) {
    shipping.value.name = storeUser.user.ten || storeUser.user.username || "";
    shipping.value.email = storeUser.user.email || "";
    shipping.value.phone = storeUser.user.sdt || storeUser.user.phone || "";
    shipping.value.address =
      storeUser.user.diachi || storeUser.user.address || "";
  }
});

// Kiểm tra email và tự động điền thông tin
async function checkEmailAndFillInfo() {
  if (!shipping.value.email) return;

  try {
    // Fetch danh sách users nếu chưa có
    if (!storeUser.users || storeUser.users.length === 0) {
      await storeUser.fetchUsers();
    }

    // Tìm user theo email
    const existingUser = storeUser.users.find(
      (user) => user.email.toLowerCase() === shipping.value.email.toLowerCase()
    );

    // Nếu tìm thấy user, tự động điền thông tin
    if (existingUser) {
      if (!shipping.value.name && (existingUser.ten || existingUser.username)) {
        shipping.value.name = existingUser.ten || existingUser.username;
      }
      if (!shipping.value.phone && (existingUser.sdt || existingUser.phone)) {
        shipping.value.phone = existingUser.sdt || existingUser.phone;
      }
      if (
        !shipping.value.address &&
        (existingUser.diachi || existingUser.address)
      ) {
        shipping.value.address = existingUser.diachi || existingUser.address;
      }
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra email:", error);
  }
}

const subTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const total = computed(() => subTotal.value);

function formatPrice(val) {
  return val.toLocaleString("vi-VN") + " đ";
}

// QR chuyển khoản tự động
const qrUrl = computed(() =>
  hoaDonStore.qrImage(
    shipping.value.payment,
    { email: shipping.value.email },
    total.value
  )
);

function closePopup() {
  showSuccessPopup.value = false;
  // Reset form after closing popup
  shipping.value = {
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    payment: "cod",
  };
}

async function handleSubmit() {
  // Nếu chọn chuyển khoản, yêu cầu đăng nhập
  if (shipping.value.payment === "bank" && !storeUser.user) {
    alert("Bạn phải đăng nhập để thanh toán chuyển khoản!");
    return;
  }

  // Xác định user hiện tại
  let currentUser = storeUser.user;

  // Nếu chưa đăng nhập thì kiểm tra email
  if (!currentUser) {
    // Fetch danh sách users nếu chưa có
    if (!storeUser.users || storeUser.users.length === 0) {
      await storeUser.fetchUsers();
    }

    const existUser = storeUser.users.find(
      (u) => u.email.toLowerCase() === shipping.value.email.toLowerCase()
    );

    if (!existUser) {
      // Tạo user mới
      const newUser = {
        username: shipping.value.name,
        matkhau: "123456", // Có thể yêu cầu nhập hoặc random
        email: shipping.value.email,
        ten: shipping.value.name,
        sdt: shipping.value.phone,
        diachi: shipping.value.address,
      };

      const success = await storeUser.register(newUser);
      if (!success) {
        alert("Không thể tạo tài khoản mới: " + storeUser.error);
        return;
      }

      // Refresh danh sách users và tìm user vừa tạo
      await storeUser.fetchUsers();
      currentUser = storeUser.users.find(
        (u) => u.email.toLowerCase() === shipping.value.email.toLowerCase()
      );
    } else {
      currentUser = existUser;
    }
  }

  // Tạo đơn hàng mới
  const newOrder = {
    id: Date.now() + Math.random(), // Tạo ID unique
    user_id: currentUser?.id,
    items: [...cartItems.value], // Clone array để tránh reference
    shipping: { ...shipping.value }, // Clone object
    total: total.value,
    payment: shipping.value.payment,
    status: "pending", // Thêm trạng thái đơn hàng
    created_at: new Date().toISOString(),
  };

  // Chỉ thêm một đơn hàng duy nhất
  try {
    orderStore.addOrder(newOrder);
    cartStore.clearCart();

    // Show success popup
    showSuccessPopup.value = true;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
  }
}
</script>

<style scoped>
.checkout-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: block;
}

.checkout-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0;
  box-shadow: none;
  padding: 40px;
  width: 100%;
  margin: 0;
  margin-bottom: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* .checkout-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 40px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
} */

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  flex: 1;
  width: 100%;
}

.checkout-form {
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  margin-left: -15px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  min-width: 500px;
  width: 106.5%;
  min-height: 700px;
  height: 100%;
}

.checkout-form h3 {
  font-size: 1.4rem;
  margin-bottom: 25px;
  color: #4a5568;
  font-weight: 700;
  text-align: center;
}

.form-group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 16px;
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;
  padding: 12px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.radio-group label:hover {
  background: rgba(102, 126, 234, 0.05);
}

.radio-group input[type="radio"] {
  width: 20px;
  height: 20px;
  margin: 0;
}

.checkout-btn {
  margin-top: 30px;
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 15px;
  padding: 16px 0;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.checkout-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.checkout-btn:active {
  transform: translateY(-1px);
}

.checkout-order {
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  margin-left: -15px;
  border-radius: 20px;
  margin-right: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.checkout-order h3 {
  font-size: 1.4rem;
  margin-bottom: 25px;
  color: #4a5568;
  font-weight: 700;
  text-align: center;
}

.order-item {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f7fafc;
  padding: 20px 0;
  transition: all 0.3s ease;
}

.order-item:hover {
  background: rgba(102, 126, 234, 0.02);
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
}

.order-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 15px;
  margin-right: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.order-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-name {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 5px;
}

.order-meta {
  font-size: 14px;
  color: #718096;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.order-price {
  font-size: 18px;
  font-weight: 800;
  color: #e53e3e;
  min-width: 140px;
  text-align: right;
}

.order-summary {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px dashed #cbd5e0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 12px;
  padding: 5px 0;
}

.summary-row.total {
  font-size: 22px;
  font-weight: 800;
  color: #e53e3e;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #e2e8f0;
}

/* Success Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  background: white;
  padding: 50px 40px;
  border-radius: 25px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease;
  position: relative;
}

.popup-icon {
  margin: 0 auto 25px;
  display: flex;
  justify-content: center;
}

.popup-content h3 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
  font-weight: 800;
}

.popup-content p {
  font-size: 16px;
  color: #718096;
  line-height: 1.6;
  margin-bottom: 15px;
}

.popup-btn {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.popup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .checkout-box {
    padding: 30px;
    margin: 0;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .checkout-box {
    padding: 20px;
    margin: 0;
    margin-bottom: 0;
    min-height: 100vh;
  }

  .checkout-title {
    font-size: 2rem;
  }

  .checkout-form,
  .checkout-order {
    padding: 20px;
  }

  .popup-content {
    padding: 40px 30px;
  }

  .popup-content h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .checkout-title {
    font-size: 1.5rem;
  }

  .checkout-form,
  .checkout-order {
    padding: 15px;
  }

  .order-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .order-img {
    margin: 0;
  }

  .order-price {
    text-align: center;
    min-width: auto;
  }

  .popup-content {
    padding: 30px 20px;
  }

  .checkout-box {
    padding: 15px;
    margin: 0;
    margin-bottom: 0;
    min-height: 100vh;
  }
}
.qr-container img {
  display: block;
  margin: 0 auto;
  width: 620px;
  height: 620px;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 2px 18px rgba(102, 126, 234, 0.08);
  background: #fff;
}
</style>
