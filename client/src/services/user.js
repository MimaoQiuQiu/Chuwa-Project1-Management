import makeApiCall from "./apiCall";

/**
 * router.get("/cart", getAllProductsInCart);
 * router.put("/cart/:productId", editProductQuantityInCart);
 * router.delete("/cart/:productId", deleteProductInCart);
 * router.post("/cart/checkout", checkout);
 */

export const getAllProductsInCart = async (userId) => {
  const res = await makeApiCall({
    url: `/api/users/${userId}/cart`,
    method: "GET",
  });
  return res;
};

export const editProductQuantityInCart = async ({
  userId,
  productId,
  curQuantity,
}) => {
  const res = await makeApiCall({
    url: `/api/users/${userId}/cart/${productId}`,
    method: "PUT",
    data: { quantity: curQuantity },
  });
  return res;
};

export const deleteProductInCart = async ({ userId, productId }) => {
  const res = await makeApiCall({
    url: `/api/users/${userId}/cart/${productId}`,
    method: "DELETE",
  });
  return res;
};

export const checkout = async ({ userId, charge }) => {
  const res = await makeApiCall({
    url: `/api/users/${userId}/cart/checkout`,
    method: "POST",
    data: { charge },
  });
  return res;
};
