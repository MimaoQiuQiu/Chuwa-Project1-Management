// routes for user's operation on products and carts
const express = require("express");
const {
  getAllProducts,
  getAProduct,
  createProduct,
  editProduct,
  deleteProduct,
  addProductToCart,
  getAllProductsInCart,
  getOneProductInCart,
  editProductQuantityInCart,
  deleteProductInCart,
  checkout,
} = require("../handlers/product");
// allow child route access parameter from parent route
const router = express.Router({ mergeParams: true });
const { isVendor } = require("../middleware/auth");

// path: /api/users/:id
router.get("/products", getAllProducts);
router.post("/products", isVendor, createProduct);
router.get("/products/:productId", getAProduct);
router.put("/products/:productId", isVendor, editProduct);
router.delete("/products/:productId", isVendor, deleteProduct);

router.get("/cart", getAllProductsInCart);
router.post("/cart", addProductToCart);
router.get("/cart/:productId", getOneProductInCart);
router.put("/cart/:productId", editProductQuantityInCart);
router.delete("/cart/:productId", deleteProductInCart);

router.post("/cart/checkout", checkout);

module.exports = router;
