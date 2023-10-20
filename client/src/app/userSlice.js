import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, signin, resetPassword } from "../services/auth";
import { addProductToCart } from "../services/products";
import {
  getAllProductsInCart,
  editProductQuantityInCart,
  deleteProductInCart,
  checkout,
} from "../services/user";
import { removeError, addError } from "./errorSlice";

const initialState = {
  isAuthenticated: false,
  user: {},
  cart: [],
  totalPrice: 0,
  status: "idle",
};

export const signUpAction = createAsyncThunk(
  "user/signUpAction",
  async (data, thunkAPI) => {
    try {
      const newUser = await signup(data);
      thunkAPI.dispatch(removeError());
      return newUser;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signInAction = createAsyncThunk(
  "user/signInAction",
  async (data, thunkAPI) => {
    try {
      const user = await signin(data);
      localStorage.setItem("token", user.token);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "user/resetPasswordAction",
  async (data, thunkAPI) => {
    try {
      const user = await resetPassword(data);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addProductToCartAction = createAsyncThunk(
  "user/addProductToCartAction",
  async (data, thunkAPI) => {
    try {
      const res = await addProductToCart(data);
      thunkAPI.dispatch(removeError());
      return res;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getAllProductsInCartAction = createAsyncThunk(
  "user/getAllProductsInCartAction",
  async (data, thunkAPI) => {
    try {
      const { id } = data;
      const cart = await getAllProductsInCart(id);
      thunkAPI.dispatch(removeError());
      return cart;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const editProductQuantityInCartAction = createAsyncThunk(
  "user/editProductQuantityInCartAction",
  async (data, thunkAPI) => {
    try {
      const res = await editProductQuantityInCart(data);
      thunkAPI.dispatch(removeError());
      return res;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProductInCartAction = createAsyncThunk(
  "user/deleteProductInCartAction",
  async (data, thunkAPI) => {
    try {
      const res = await deleteProductInCart(data);
      thunkAPI.dispatch(removeError());
      return res;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const checkoutAction = createAsyncThunk(
  "user/checkoutAction",
  async (data, thunkAPI) => {
    try {
      const res = await checkout(data);
      thunkAPI.dispatch(removeError());
      return res;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      /**
       * If the action provides user data in its payload, then we can infer that a user is authenticated. So, the state is updated to reflect that a user is authenticated and holds the user's data.
       * If the action's payload is an empty object, this implies no user data, hence no user is authenticated. The state is updated to show that no user is authenticated.
       * The action.payload is expected to contain user information if the user is authenticated.
       * e.g. { id: 1, name: "John Doe", email: "john@example.com" }
       */
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.user = action.payload;
    },
    logOut: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.cart = [];
      state.totalPrice = 0;
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // signUpAction
    builder.addCase(signUpAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.status = "failed";
    });

    // signInAction
    builder.addCase(signInAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload).length;
      state.cart = action.payload.cart;
      const { id, username, category, imgUrl, token } = action.payload;
      state.user = { id, username, category, imgUrl, token };
      state.status = "succeeded";
    });
    builder.addCase(signInAction.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.status = "failed";
    });

    // resetPasswordAction
    builder.addCase(resetPasswordAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.status = "failed";
    });

    // addProductToCartAction
    builder.addCase(addProductToCartAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addProductToCartAction.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(addProductToCartAction.rejected, (state, action) => {
      state.status = "failed";
    });

    /**
     * getAllProductsInCartAction
     * @return [Array(Object)] current cart
     */
    builder.addCase(getAllProductsInCartAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAllProductsInCartAction.fulfilled, (state, action) => {
      const cart = action.payload;
      state.totalPrice = cart.reduce((total, product) => {
        total += product.price * product.quantity;
        return total;
      }, 0);
      state.cart = cart;
      state.status = "succeeded";
    });
    builder.addCase(getAllProductsInCartAction.rejected, (state, action) => {
      state.cart = [];
      state.totalPrice = 0;
      state.status = "failed";
    });

    /**
     * editProductQuantityInCartAction
     * @return [Object{productId: quantity}] current cart
     */
    builder.addCase(
      editProductQuantityInCartAction.pending,
      (state, action) => {
        state.status = "loading";
      }
    );
    builder.addCase(
      editProductQuantityInCartAction.fulfilled,
      (state, action) => {
        const cart = action.payload.cart;
        var total = 0;
        state.cart.map((product) => {
          product.quantity = cart[product.id];
          total += product.price * product.quantity;
          return product;
        });
        state.totalPrice = total;
        state.status = "succeeded";
      }
    );
    builder.addCase(
      editProductQuantityInCartAction.rejected,
      (state, action) => {
        state.status = "failed";
      }
    );

    // deleteProductInCartAction
    builder.addCase(deleteProductInCartAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteProductInCartAction.fulfilled, (state, action) => {
      const cart = action.payload.cart;
      state.totalPrice = cart.reduce((total, product) => {
        total += product.price * product.quantity;
        return total;
      }, 0);
      state.cart = cart;
      state.status = "succeeded";
    });
    builder.addCase(deleteProductInCartAction.rejected, (state, action) => {
      state.status = "failed";
    });

    // checkoutAction
    builder.addCase(checkoutAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(checkoutAction.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(checkoutAction.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const { setCurrentUser, logOut } = userSlice.actions;
export default userSlice.reducer;
