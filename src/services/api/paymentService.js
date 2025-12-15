import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const paymentService = {
  // Get student fees
  getStudentFees: async (studentId) => {
    return await axios.get(`${API_BASE_URL}/payments/fees/${studentId}`);
  },

  // Create Razorpay order
  createOrder: async (orderData) => {
    return await axios.post(`${API_BASE_URL}/payments/create-order`, orderData);
  },

  // Verify Razorpay payment
  verifyPayment: async (paymentData) => {
    return await axios.post(`${API_BASE_URL}/payments/verify`, paymentData);
  },

  // Get payment history
  getPaymentHistory: async (studentId) => {
    return await axios.get(`${API_BASE_URL}/payments/history/${studentId}`);
  },
};
