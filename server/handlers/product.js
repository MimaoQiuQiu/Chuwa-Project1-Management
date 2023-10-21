// all product related operations

const db = require("../models");
const { setCartGuard, dismissCartGuard } = require("./cartGuard");

/**
 * Get all products
 * @return {Product[]} All Products
 */
const getAllProducts = async (req, res, next) => {
  try {
    const products = await db.Product.find();
    return res.status(200).json(products);
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
};

/**
 * Get a product by id
 * @return {Product} Product Info
 */
const getAProduct = async (req, res, next) => {
  try {
    const product = await db.Product.findById(req.params?.productId);
    return res.status(200).json(product);
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
};

/**
 * Create a product, only for vendor
 * @return {Product} Product Info
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await db.Product.create({
      ...req.body,
      createBy: req.params.id,
    });

    // find vendor, save the product to vendor's products stock
    const vendor = await db.User.findById(req.params.id);
    if (!vendor) {
      return res.status(401).json({
        error: "Vendor not found",
      });
    }
    vendor.products.push(product.id);
    await vendor.save();

    const newProduct = await db.Product.findById(product.id).populate(
      "createBy",
      {
        username: true,
        imgUrl: true,
        category: true,
      }
    );
    return res.status(200).json(newProduct);
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Product name already exists";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

/**
 * Edit/Update a product, only for vendor & creator
 * @return {Product} Product Info
 */
const editProduct = async (req, res, next) => {
  try {
    const product = await db.Product.findByIdAndUpdate(
      req.params?.productId,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(401).json({
        error: "Product not found",
      });
    }

    // check if the product is created the a vender
    if (product.createBy.toString() !== req.params.id) {
      return res.status(401).json({
        error: "You are not authorized to do that",
      });
    }
    return res.json(product);
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Product name already exists";
    }
    return next({
      status: 500,
      message: err.message,
    });
  }
};

/**
 * Delete a product, only for vendor & creator
 * @return {Product} Product Info
 */
const deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await db.Product.findById(req.params.productId);
    if (!deleteProduct) {
      return res.status(401).json({
        error: "Product not found",
      });
    }

    // check if the product belongs to vendor
    if (deleteProduct.createBy.toString() !== req.params.id) {
      return res.status(401).json({
        error: "You are not authorized to do that",
      });
    }

    await deleteProduct.deleteOne();
    return res.status(204).json(deleteProduct);
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
};

/**
 * Add a product to cart
 * @return {id, username, category, imgUrl, cart} User Info
 */
const addProductToCart = async (req, res, next) => {
  try {
    // find user
    const user = await db.User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    // find product
    const product = await db.Product.findById(req.body.productId);
    const quantity = req.body.quantity;

    // check if quantity is valid (less than stock quantity)
    if (!product || !product.stockNum) {
      return res.status(401).json({
        error: "Product not found",
      });
    } else if (product.stockNum < quantity) {
      return res.status(401).json({
        error: "Not enough stock",
      });
    }

    // add product to cart
    if (user.cart.has(product.id)) {
      const curQuantity = user.cart.get(product.id);
      if (product.stockNum < curQuantity + quantity) {
        return res.status(401).json({
          error: "Not enough stock",
        });
      }
      user.cart.set(product.id, curQuantity + quantity);
    } else {
      user.cart.set(product.id, quantity);
    }

    // save user
    await user.save();

    const { id, username, category, imgUrl, cart } = user;
    return res.status(200).json({
      id,
      username,
      category,
      imgUrl,
      cart,
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * Get all products in cart
 * @return {Product[]} Cart Products
 */
const getAllProductsInCart = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    const cart = [];
    for (const [key, value] of user.cart) {
      const product = await db.Product.findById(key).populate("createBy");
      const { id, name, description, price, imgUrl, stockNum, createBy } =
        product;
      cart.push({
        id: id,
        name: name,
        description: description,
        price: price,
        quantity: value,
        imgUrl: imgUrl,
        stockNum,
        vendor: {
          id: createBy.id,
          username: createBy.username,
          imgUrl: createBy.imgUrl,
        },
      });
    }
    return res.status(200).json(cart);
  } catch (err) {
    return next(err);
  }
};

/**
 * Get a product in cart
 * @return {id, name, description, price, quantity, imgUrl, vendor} Product Info
 */
const getOneProductInCart = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    if (user.cart.has(req.params.productId)) {
      const product = await db.Product.findById(req.params.productId).populate(
        "createBy"
      );
      if (!product || !product.stockNum) {
        return res.status(401).json({
          error: "Product not found",
        });
      }
      const { id, name, description, price, imgUrl, createBy } = product;
      return res.status(200).json({
        id: id,
        name: name,
        description: description,
        price: price,
        quantity: user.cart.get(req.params.productId),
        imgUrl: imgUrl,
        vendor: {
          id: createBy.id,
          username: createBy.username,
          imgUrl: createBy.imgUrl,
        },
      });
    } else {
      return res.status(404).json({
        error: "Product not in cart",
      });
    }
  } catch (err) {
    return next(err);
  }
};

/**
 * Edit/Update quantity of a product in cart
 * @return {id, username, category, imgUrl, cart} User Info
 */
const editProductQuantityInCart = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    // guard the cart for concurrent update
    const cartGuard = await setCartGuard(req.params.id);

    if (user.cart.has(req.params.productId)) {
      const quantity = req.body.quantity;

      user.cart.set(req.params.productId, quantity);

      // save user
      await user.save();

      // dismiss the cart guard
      await dismissCartGuard(req.params.id, cartGuard);

      const { id, username, category, imgUrl, cart } = user;

      return res.status(200).json({
        id,
        username,
        category,
        imgUrl,
        cart,
      });
    } else {
      await dismissCartGuard(req.params.id, cartGuard);
      return res.status(404).json({
        error: "Product not in cart",
      });
    }
  } catch (err) {
    return next(err);
  }
};

/**
 * Delete a product in cart
 * @return {id, username, category, imgUrl, cart} User Info
 */
const deleteProductInCart = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (!user.cart.has(req.params.productId)) {
      return res.status(404).json({
        error: "Product not in cart",
      });
    }

    // delete product in cart
    user.cart.delete(req.params.productId);

    // save user
    await user.save();

    const curCart = [];
    for (const [key, value] of user.cart) {
      const product = await db.Product.findById(key).populate("createBy");
      const { id, name, description, price, imgUrl, stockNum, createBy } =
        product;
      curCart.push({
        id,
        name,
        description,
        price,
        quantity: value,
        imgUrl: imgUrl,
        stockNum,
        vendor: {
          id: createBy.id,
          username: createBy.username,
          imgUrl: createBy.imgUrl,
        },
      });
    }

    const { id, username, category, imgUrl } = user;
    return res.status(200).json({
      id,
      username,
      category,
      imgUrl,
      cart: curCart,
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * Checkout Operations
 * Calculate price of selected products
 * @return {number} Total Product Price
 * Update the stock quantity (stockNum - product quantity)
 * @return {Product[]}
 */
const checkout = async (req, res, next) => {
  try {
    // find user
    const user = await db.User.findById(req.params.id);
    if (user.cart.size === 0) {
      return res.status(200).json({
        message: "Cart is empty",
      });
    }

    // update stock quantity
    const charge = +req.body.charge;
    for (const [productId, quantity] of user.cart) {
      // find the product in stock
      const product = await db.Product.findById(productId);
      if (!product) {
        return res.status(401).json({
          error: "Product not found",
        });
      } else if (product.stockNum < quantity) {
        return res.status(401).json({
          error: "Not enough stock",
        });
      }
      // update stock quantity
      product.stockNum -= quantity;
      user.cart.delete(productId);
      await product.save();
    }
    // calculate total charge
    // const charge = +req.body.charge;
    await user.save();
    return res.status(200).json({
      message: `Total charge is ${charge}.`,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
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
};
