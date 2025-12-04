"use client"; // make this a client component for next.js 13+

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if userData exists in localStorage
    const userDataString = localStorage.getItem("userData");
    const rememberMe = localStorage.getItem("rememberMe");
    if (userDataString && rememberMe) {
      // Optionally, you can parse and check refreshToken or idToken
      router.push("/vendor");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"></div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// export default function Home() {
//   const [stripeData, setStripeData] = useState(null);

//   useEffect(() => {
//     async function fetchPaymentData() {
//       try {
//         const res = await fetch("http://localhost:3000/staging/checkout/premium", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             customerId: "cus_TWVI6OQ4DezEjU",
//             metadata: {
//               type: "premium_payment_setup",
//             },
//           }),
//         });

//         const data = await res.json();
//         setStripeData(data.checkoutData);
//       } catch (error) {
//         console.error("Error fetching Stripe checkout data:", error);
//       }
//     }

//     fetchPaymentData();
//   }, []);

//   if (!stripeData) return <div>Loading...</div>;

//   return <StripePayment stripeData={stripeData} />;
// }

// function StripePayment({ stripeData }) {
//   const stripePromise = loadStripe('pk_test_51M2nJUJrxBkS4J3XAg7p9jmzGr2aNJ9VNF2xqyjqPgBeDwkAQOVLBS948fQKBhQE0fsk0leFshfIJV5tnhHHZbqb00W0GrRyBV');

//   const options = {
//     clientSecret: stripeData.paymentIntentSecret,
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// }

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/login`,
//       },
//     });

//     if (error) {
//       setMessage(error.message);
//     } else {
//       setMessage("Payment successful!");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <PaymentElement />
//       <button
//         disabled={loading || !stripe}
//         type="submit"
//         className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay"}
//       </button>
//       {message && <div className="text-red-500">{message}</div>}
//     </form>
//   );
// }
