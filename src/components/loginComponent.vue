<template>
  <div class="login-bg">
    <div :class="['wrapper', { active: isActive }]">
      <span class="bg-animate"></span>
      <span class="bg-animate2"></span>

      <div class="formbox login">
        <h2 class="animation" style="--i: 0; --j: 21">Đăng nhập</h2>
        <form action="">
          <div class="input-box animation" style="--i: 1; --j: 22">
            <input
              type="text"
              name=""
              id=""
              v-model="loginForm.username"
              required
            />
            <label for="">Tên đăng nhập</label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box animation" style="--i: 2; --j: 23">
            <input
              type="password"
              name=""
              id=""
              v-model="loginForm.password"
              required
            />
            <label for="">Mật khẩu</label>
            <i class="bx bx-lock"></i>
          </div>
          <button
            type="submit"
            class="btn animation"
            style="--i: 3; --j: 24"
            @click.prevent="handleLogin()"
          >
            Đăng nhập
          </button>
          <div class="logreg-link animation" style="--i: 4; --j: 25">
            <p>
              Không có tài khoản?
              <a
                href=""
                class="register-link"
                @click.prevent="isActive = !isActive"
                >Đăng ký</a
              >
            </p>
          </div>
        </form>
      </div>
      <div class="info-text login">
        <h2 class="animation" style="--i: 0; --j: 20">Chào mừng trở lại!</h2>
        <p class="animation" style="--i: 1; --j: 21">Vui lòng đăng nhập</p>
      </div>

      <div class="formbox register">
        <h2 class="animation" style="--i: 17; --j: 0">Đăng ký</h2>
        <form action="">
          <div class="input-box animation" style="--i: 18; --j: 1">
            <input
              type="text"
              name=""
              id=""
              v-model="registerForm.username"
              required
            />
            <label for="">Tên người dùng</label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box animation" style="--i: 19; --j: 2">
            <input
              type="text"
              name=""
              id=""
              v-model="registerForm.email"
              required
            />
            <label for="">Email</label>
            <i class="bxr bx-envelope"></i>
          </div>
          <div class="input-box animation" style="--i: 20; --j: 3">
            <input
              type="password"
              name=""
              id=""
              v-model="registerForm.password"
              required
            />
            <label for="">Mật khẩu</label>
            <i class="bx bx-lock"></i>
          </div>
          <div class="input-box animation" style="--i: 21; --j: 4">
            <input
              type="password"
              name=""
              id=""
              v-model="registerForm.confirmPassword"
              required
            />
            <label for="">Xác nhận mật khẩu</label>
            <i class="bx bx-lock"></i>
          </div>
          <button
            type="submit"
            class="btn animation"
            style="--i: 21; --j: 4"
            @click.prevent="handlRegister()"
          >
            Đăng ký
          </button>
          <div class="logreg-link animation" style="--i: 22; --j: 5">
            <p>
              Đã có tài khoản?
              <a
                href=""
                class="register-link"
                @click.prevent="isActive = !isActive"
                >Đăng nhập</a
              >
            </p>
          </div>
        </form>
      </div>
      <div class="info-text register">
        <h2 class="animation" style="--i: 23; --j: 0">Chào mừng!</h2>
        <p class="animation" style="--i: 24; --j: 1">Vui lòng đăng ký</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { userAPI } from "../stores/userAPI";
import { useRouter } from "vue-router";

const storeUse = userAPI();
const isActive = ref(false);
const router = useRouter();

const loginForm = ref({
  username: "",
  password: "",
});

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
});

onMounted(() => {
  storeUse.fetchUsers();
});

async function handleLogin() {
  const { username, password } = loginForm.value;
  const success = await storeUse.login(username, password);
  console.log("User after login:", storeUse.user);

  if (success) {
    alert("Đăng nhập thành công");
    router.push({ name: "Home" });
  } else {
    alert(`Đăng nhập thất bại ${storeUse.error}`);
  }
}

async function handlRegister() {
  const { username, password, confirmPassword, email } = registerForm.value;
  if (!username || !password || !confirmPassword || !email) {
    alert("vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Không đúng định dạng email");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp");
    return;
  }

  if (!isValidPassword(password)) {
    alert("Không đúng định dạng mật khẩu");
    return;
  }

  const success = await storeUse.register({
    username,
    matkhau: password,
    email,
    ten: username,
  });

  if (success) {
    alert("Đăng ký thành công");

    isActive.value = false;

    registerForm.value = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  } else {
    alert("Đăng ký thất bại: " + storeUse.error);
  }
}

function isValidPassword(password) {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passRegex.test(password);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  width: 100vw;
  background: #081b29;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  position: relative;
  width: 900px;
  height: 550px;
  background: transparent;
  border: 2px solid #0ef;
  box-shadow: 0 0 25px #0ef;
  overflow: hidden;
}

.wrapper .formbox {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper .formbox.login {
  left: 0;
  padding: 0 60px 0 40px;
}

.wrapper .formbox.login .animation {
  transform: translateX(0);
  opacity: 1;
  filter: blur(0);
  transition: 0.7s ease;
  transition-delay: calc(0.1s * var(--j));
}

.wrapper.active .formbox.login .animation {
  transform: translateX(-120%);
  opacity: 0;
  filter: blur(2px);
  transition-delay: calc(0.1s * var(--i));
}

.wrapper .formbox.register {
  right: 0;
  padding: 0 40px 0 60px;
}

.wrapper .formbox.register .animation {
  transform: translateX(120%);
  opacity: 0;
  filter: blur(2px);
  transition: 0.7s ease;
}

.wrapper.active .formbox.register .animation {
  transform: translateX(0);
  opacity: 1;
  filter: blur(0px);
  transition-delay: calc(0.1s * var(--i));
  /* transition-delay: ; */
}

.formbox h2 {
  font-size: 32px;
  color: #fff;
  text-align: center;
}

.formbox .input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 25px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent !important;
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;
  padding-right: 23px;
  border-bottom: 2px solid #fff;
}

.input-box input:focus,
.input-box input:valid {
  border-bottom: 2px solid #0ef;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -5px;
  color: #0ef;
}

.input-box i {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 18px;
  color: #fff;
  transition: 0.5s;
}

.input-box input:focus ~ i,
.input-box input:valid ~ i {
  color: #0ef;
}

.btn {
  position: relative;
  width: 100%;
  height: 45px;
  background: transparent;
  border: 2px solid #0ef;
  border-radius: 40px;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  z-index: 1;
  overflow: hidden;
}

.btn::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0%;
  width: 100%;
  height: 300%;
  background: linear-gradient(#081b29, #0ef, #081b29, #0ef);
  z-index: -1;
  transition: 0.5s;
}

.btn:hover::before {
  top: 0;
}

.formbox .logreg-link {
  font-size: 14.5px;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px;
}

.logreg-link p a {
  color: #0ef;
  text-decoration: none;
  font-weight: 500;
}

.logreg-link a:hover {
  text-decoration: underline;
}

.wrapper .info-text {
  position: absolute;
  top: 0%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper .info-text.login {
  right: 0;
  text-align: right;
  padding: 0 25px 60px 150px;
}

.wrapper .info-text.login .animation {
  transform: translateX(0);
  opacity: 1;
  filter: blur(0px);
  transition: 0.7s ease;
  transition-delay: calc(0.1s * var(--j));
}

.wrapper.active .info-text.login .animation {
  transform: translateX(120%);
  opacity: 0;
  filter: blur(2px);
  transition-delay: calc(0.1s * var(--i));
}

.wrapper .info-text.register {
  left: 0;
  text-align: left;
  padding: 0 150px 60px 25px;
  pointer-events: none;
}

.wrapper .info-text.register .animation {
  transform: translateX(-120%);
  opacity: 0;
  filter: blur(2px);
  transition: 0.7s ease;
  transition-delay: calc(0.1s * var(--j));
}

.wrapper.active .info-text.register .animation {
  transform: translateX(0);
  opacity: 1;
  filter: blur(0);
  transition-delay: calc(0.1s * var(--i));
}

.info-text h2 {
  font-size: 30px;
  color: #fff;
  line-height: 1.3;
  text-transform: uppercase;
}

.info-text p {
  font-size: 16px;
  color: #fff;
}

.wrapper .bg-animate {
  position: absolute;
  top: -4px;
  right: 0;
  width: 950px;
  height: 700px;
  background: linear-gradient(45deg, #081b29, #0ef);
  border-bottom: 2px solid #0ef;
  transform: rotate(10deg) skewY(40deg);
  transform-origin: bottom right;
  transition: 1.5s ease;
  transition-delay: 1.6s;
}

.wrapper.active .bg-animate {
  transform: rotate(0deg) skewY(0deg);
  transition-delay: 0.5s;
}

.wrapper .bg-animate2 {
  position: absolute;
  top: 100%;
  left: 250px;
  width: 900px;
  height: 750px;
  background: #081b29;
  border-top: 2px solid #0ef;
  transform: rotate(0deg) skewY(0deg);
  transform-origin: bottom left;
  transition: 1.5s ease;
  transition-delay: 0.5s;
}

.wrapper.active .bg-animate2 {
  transform: rotate(-11deg) skewY(-41deg);
  transition-delay: 1.2s;
}
</style>
