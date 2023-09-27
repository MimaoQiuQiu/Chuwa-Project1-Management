const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (emailInput) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(emailInput);
      },
      message: "Invalid Email",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
  },

  username: {
    type: String,
    required: [true, "Username is required"],
  },

  // User Image
  imgUrl: {
    type: String,
    default: "https://unsplash.com/photos/kmYw-PkX5M4",
  },

  // VENDOR or USER
  category: {
    type: String,
    default: "USER",
  },

  cart: {
    type: Map,

    // quantity of each item in the cart
    of: Number,

    // by default is an empty cart
    default: new Map(),

    // cart validated by checking if the keys are valid ObjectID
    validate: {
      validator: function (value) {
        for (const key of value.keys()) {
          if (!mongoose.Types.ObjectId.isValid(key)) {
            return false;
          }
        }
        return true;
      },
    },

    // product(or stock) that the user has
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
});

// ecrypt password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const ecryptedPassword = await bcrypt.hash(this.password, 10);
    this.password = ecryptedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// compare password
userSchema.methods.comparePassword = async function (inputPassword, next) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

// check if the user is a vendor
userSchema.pre("save", async function (next) {
  try {
    if (this.email.includes("@vendor.com")) {
      this.category = "VENDOR";
      this.username = "VENDOR";
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
