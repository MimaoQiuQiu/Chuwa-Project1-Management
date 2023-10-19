// a locking machanism for cart
// prevent race condition and concurrent updating of cart
// e.g. a user try to update the cart on both laptop and mobile phone at the same time, which causes order fulfillment problem
// ensuring that a user can only modify their cart if they hold the lock for it
// When a user wants to modify their cart, the application would call setCartGuard to set a guard for that user's cart.
// Once the guard is set, the application can safely make modifications to the cart.
// After the modifications are done, the application would call dismissCartGuard to unset the gurad, allowing other modifications to be made.

const cartGuard = new Map();

exports.setCartGuard = async function (userId) {
  return new Promise((resolve, reject) => {
    const guard = setInterval(() => {
      // check if there is a guard, if no, set one
      if (!cartGuard.has(userId)) {
        cartGuard.set(userId, true);
        // stop the interval for continuous checking
        // once the guard is set, there is no need to keep checking the condition, and leaving the interval running would be a waste of resources. Clearing the interval, stops the repeated execution of the callback function, freeing up system resources.
        clearInterval(guard);
        // resolve with the interval id stored in guard
        resolve(guard);
      }
    }, 10);
  });
};

exports.dismissCartGuard = async function (userId, guard) {
  cartGuard.delete(userId);
  clearInterval(guard);
};
