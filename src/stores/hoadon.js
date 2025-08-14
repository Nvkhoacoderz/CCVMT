import { defineStore } from 'pinia';

export const useHoaDonStore = defineStore('hoadon', {
  state: () => ({
    bankAccount: '666666666602', // Số tài khoản ngân hàng
    bankName: 'TCB',          // Mã ngân hàng (ví dụ: VCB cho Vietcombank)
    bankOwner: 'NGUYEN VU KHOA', // Tên chủ tài khoản
  }),
  // Getter sinh mã QR
  getters: {
    qrImage: (state) => (paymentMethod, customer, total) => {
      if (paymentMethod !== 'bank' || !total || total <= 0) return '';
      const content = `THANHTOAN-${customer.email || 'guest'}-${total}`;
      return `https://img.vietqr.io/image/${state.bankName}-${state.bankAccount}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(state.bankOwner)}`;
    },
  },
});