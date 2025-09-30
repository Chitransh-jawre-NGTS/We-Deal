// api/payment.js
import axios from "axios";
import httpClient from "../utils/httpClient";

export const paymentApi = {
  activatePlan: (planType) => httpClient.post("/payment/activatePlan", { planType }),
};
