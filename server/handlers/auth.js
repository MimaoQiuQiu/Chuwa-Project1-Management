// signup, signin, password reset
const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.singin = async function (req, res, next) {
  try {
    const user = await db.User.findOne({
      email: req.body.email,
    });
    const { id, username, category, imgUrl } = user;
    const isMatch = await user.comparePassword(req.body.password, next);
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          username,
          category,
          imgUrl,
        },
        process.env.SECRET_KEY
      );

      const cart = [];
      for (const [key, value] of user.cart) {
        const product = await db.Product.findById(key).populate("createBy");
        const { id, name, description, rice, imgUrl, stockNum, createBy } =
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

      return res.status(200).json({
        id,
        username,
        category,
        imgUrl,
        cart,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      //message: err.message
      message: "Invalid Email",
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username, category, imgUrl } = user;
    const token = await jwt.sign(
      {
        id,
        username,
        category,
        imgUrl,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      category,
      imgUrl,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.resetPassword = async function (req, res, next) {
  try {
    const user = await db.User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return next({
        status: 400,
        message: "Invalid Email",
      });
    }
    user.password = req.body.password;
    await user.save();
    res.status(202).json({
      message: `${user.username}'s password updated`,
    });
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email",
    });
  }
};
