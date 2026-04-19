import { useCallback } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const useRazorpay = () => {

  const initiatePayment = useCallback(
    async ({
      amount,
      userId,
      hotelId,
      hotelName,
      userName,
      userEmail,
      onSuccess,
      onFailure,
    }) => {
      try {
        // 1️⃣ Create dummy order (backend)
        const { data } = await axios.post(
          `${API_BASE}/api/payment/create-order`,
          {
            amount,
            userId,
            hotelId,
          }
        );

        if (!data.success) throw new Error(data.message);

        const { bookingId } = data;

        // 2️⃣ Fake loading (simulate payment)
        console.log("Processing payment...");
        await new Promise((res) => setTimeout(res, 2000));

        // 3️⃣ Fake verification (backend)
        const verifyRes = await axios.post(
          `${API_BASE}/api/payment/verify`,
          {
            bookingId,
          }
        );

        if (verifyRes.data.success) {
          onSuccess && onSuccess({
            _id: bookingId,
            paymentId: "fake_payment_" + Date.now(),
          });
        } else {
          onFailure && onFailure("Payment failed.");
        }

      } catch (err) {
        console.error("Dummy payment error:", err);
        onFailure && onFailure(err.message || "Something went wrong.");
      }
    },
    []
  );

  return { initiatePayment };
};

export default useRazorpay;