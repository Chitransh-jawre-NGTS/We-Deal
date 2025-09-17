import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";

export const productApi = {
  getAll: () => httpClient.get(endpoints.product.list),

  create: (formData) =>
    httpClient.post(endpoints.product.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getUserProducts: (userId) =>
    httpClient.get(endpoints.product.userProducts(userId)),

  update: (id, formData) =>
    httpClient.put(endpoints.product.update(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id) => httpClient.delete(endpoints.product.delete(id)),
};
