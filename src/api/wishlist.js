import httpClient from "../utils/httpClient";
import endpoints from "../utils/endpoint";
export const wishlistApi = {
  get: () => httpClient.get("/wishlist"),
  add: (productId) => httpClient.post("/wishlist/add", { productId }),
  remove: (productId) => httpClient.post("/wishlist/remove", { productId }),
};
