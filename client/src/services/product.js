// import makeApiCall from './apiCall'

// /**
//  * router.post("/products", isVendor, createProduct);
//  * router.get("/products", getAllProducts);
//  * router.get("/products/:productId", getAProduct);
//  * router.delete("/products/:productId", isVendor, deleteProduct);
//  * router.put("/products/:productId", isVendor, editProduct);
//  * router.post("/cart", addProductToCart);
//  *
//  * app.get("/api/products/:productId", isLogin, async function (req, res, next)
//  * app.get("/api/products", isLogin, isUser, async function (req, res, next)
//  */

// export const createProduct = async ({ id, product }) => {
//   return await makeApiCall({
//     url: `/api/users/${id}/products`,
//     method: 'POST',
//     data: product,
//   })
// }

// export const getAllProducts = async ({ id }) => {
//   return await makeApiCall({
//     url: `/api/users/${id}/products`,
//     method: 'GET',
//   })
// }

// export const getAProduct = async (productId) => {
//   return await makeApiCall({
//     url: `/api/products/${productId}`,
//     method: 'GET',
//   })
// }

// export const deleteProduct = async ({ id, productId }) => {
//   return await makeApiCall({
//     url: `/api/users/${id}/products/${productId}`,
//     method: 'DELETE',
//   })
// }

// export const editProduct = async ({ id, productId, product }) => {
//   return await makeApiCall({
//     url: `/api/users/${id}/products/${productId}`,
//     method: 'PUT',
//     data: product,
//   })
// }

// export const addProductToCart = async ({ id, product }) => {
//   return await makeApiCall({
//     url: `api/users/${id}/cart`,
//     method: 'POST',
//     data: product,
//   })
// }
