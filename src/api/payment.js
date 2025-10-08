// // api/payment.js
// import axios from "axios";
// import httpClient from "../utils/httpClient";

// export const paymentApi = {
//   activatePlan: (planType) => httpClient.post("/payment/activatePlan", { planType }),
// };


// api/payment.js
import httpClient from "../utils/httpClient";

export const paymentApi = {
  activatePlan: (planType) => 
    httpClient.post("/payments/create", { 
      planId: planType === "base" ? "BASE_PLAN_ID" : "PREMIUM_PLAN_ID",
      role: "user" // or "seller"
    }),
      // activatePlan: (planType) => httpClient.post("/payment/activatePlan", { planType }),
  getMyTransactions: () => httpClient.get("/payments/my-transactions"),
};
