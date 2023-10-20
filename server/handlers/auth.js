// signup, signin, password reset
const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signin = async function (req, res, next) {
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
        // populate let you get the whole object, which is the creator(vendor), other than just the id of the creator(vendor)
        // const product = await db.Product.findById(123).populate("createBy");
        // not receive
        // {
        //   _id: 123,
        //   name: 'Laptop',
        //   price: 1000,
        //   createBy: 789
        // }
        // instead receive
        // {
        //   _id: 123,
        //   name: 'Laptop',
        //   price: 1000,
        //   createBy: {
        //     _id: 789,
        //     username: 'john_doe',
        //     email: 'john@example.com'
        //   }
        // }

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

const signup = async function (req, res, next) {
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
    // 11000: duplicate key error in mongodb
    if (err.code === 11000) {
      err.message = "Email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const resetPassword = async function (req, res, next) {
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

module.exports = {
  signin,
  signup,
  resetPassword,
};
