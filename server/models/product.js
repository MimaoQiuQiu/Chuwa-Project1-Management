const mongoose = require("mongoose");
const User = require("./user");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: true,
  },
  description: {
    type: String,
    default: "None",
  },
  category: {
    type: String,
    default: "DefaultCategory",
  },
  price: {
    type: Number,
    default: 0,
  },
  // quantity in stock
  stockNum: {
    type: Number,
    default: 1,
  },
  imgUrl: {
    type: String,
    default: "https://unsplash.com/photos/kmYw-PkX5M4",
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createDate: {
    type: Date,
    default: Date.now,
    readonly: true,
  },
});

productSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    // find vendor who created the product
    const vendor = await User.findById(this.createBy);

    // remove product from vendor's product list
    vendor.product.remove(this.id);
    await vendor.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
