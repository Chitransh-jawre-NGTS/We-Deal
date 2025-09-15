import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";

export const productApi = {
  getAll: () => httpClient.get(endpoints.product.list),

  // Fixed create function
  create: (formData) => {
    return httpClient.post(endpoints.product.create, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
