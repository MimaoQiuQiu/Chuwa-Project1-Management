// a middleware for verify user's identity (user or vendor) and login status
const jwt = require("jsonwebtoken");

// verify the login status
exports.isLogin = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      return next();
    } else {
      return next({
        status: 401,
        message: "You need to login first",
      });
    }
  } catch (err) {
    return next(err);
  }
};

// verify the user identity
exports.isUser = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded && decoded.id === req.params.id) {
      return next();
    } else {
      return next({
        status: 401,
        message: "You are not authorized to do that",
      });
    }
  } catch (err) {
    return next(err);
  }
};

// verify the vendor identity
exports.isVendor = async function (req, res, next) {
  try {
    // check header authorization format
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return next({
        status: 401,
        message: "No token provided or token format is incorrect.",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded && decoded.category === "VENDOR") {
      return next();
    } else {
      return next({
        status: 401,
        message: "You are not a vendor",
      });
    }
  } catch (err) {
    return next(err);
  }
};
