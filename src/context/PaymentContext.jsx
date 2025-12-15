import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
// import { paymentService } from '@/services/api/paymentService'; // Future API integration

const PaymentContext = createContext();

export const PaymentProvider = ({ children, initialFees }) => {
  const [fees, setFees] = useState(initialFees);

  // TODO: Replace with API call when backend is ready
  // useEffect(() => {
  //   const fetchFees = async () => {
  //     try {
  //       const response = await paymentService.getStudentFees();
  //       setFees(response.data);
  //     } catch (error) {
  //       toast.error('Failed to load fees');
  //     }
  //   };
  //   fetchFees();
  // }, []);

  const processSinglePayment = async (feeId, razorpayResponse) => {
    const fee = fees.feeTypes.find((f) => f.name === feeId);
    if (!fee || fee.due === 0) return null;

    // TODO: Call backend API to verify payment
    // try {
    //   const response = await paymentService.verifyPayment({
    //     razorpay_payment_id: razorpayResponse.razorpay_payment_id,
    //     fee_id: feeId,
    //     amount: fee.due
    //   });
    //
    //   if (response.data.success) {
    //     setFees(response.data.updatedFees);
    //     return response.data.paymentInfo;
    //   }
    // } catch (error) {
    //   toast.error('Payment verification failed');
    //   return null;
    // }

    // For now, update locally
    const updatedFeeTypes = fees.feeTypes.map((f) => (f.name === feeId ? { ...f, status: "Paid", due: 0 } : f));

    const newHistory = {
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      amount: fee.due,
      type: fee.name,
      status: "Paid",
      transactionId: razorpayResponse?.razorpay_payment_id || `TXN${Date.now()}`,
      paymentMethod: "Razorpay",
    };

    const updatedFees = {
      ...fees,
      pending: fees.pending - fee.due,
      feeTypes: updatedFeeTypes,
      history: [newHistory, ...fees.history],
    };

    setFees(updatedFees);
    return { amount: fee.due, type: fee.name, ...newHistory };
  };

  const processAllPayments = async (razorpayResponse) => {
    const pendingAmount = fees.pending;
    if (pendingAmount === 0) return null;

    // TODO: Call backend API to verify payment
    // Similar to processSinglePayment

    const updatedFeeTypes = fees.feeTypes.map((f) => (f.due > 0 ? { ...f, status: "Paid", due: 0 } : f));

    const newHistory = {
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      amount: pendingAmount,
      type: "All Pending Fees",
      status: "Paid",
      transactionId: razorpayResponse?.razorpay_payment_id || `TXN${Date.now()}`,
      paymentMethod: "Razorpay",
    };

    const updatedFees = {
      ...fees,
      pending: 0,
      feeTypes: updatedFeeTypes,
      history: [newHistory, ...fees.history],
    };

    setFees(updatedFees);
    return { amount: pendingAmount, type: "All Pending Fees", ...newHistory };
  };

  return <PaymentContext.Provider value={{ fees, processSinglePayment, processAllPayments }}>{children}</PaymentContext.Provider>;
};

export const usePayment = () => useContext(PaymentContext);
