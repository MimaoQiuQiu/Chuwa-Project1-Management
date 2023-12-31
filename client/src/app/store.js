import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import errorReducer from "./errorSlice";

// export default configureStore({
//   reducer: {
//     user: userReducer,
//     products: productReducer,
//     error: errorReducer,
//   },
//   devTools: true,
// });

// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer"; // wherever your combined reducers are

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    error: errorReducer,
  },
  // use the default middlewares provided by RTK for the middlewares of this store
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

  devTools: true,
});

export default store;
