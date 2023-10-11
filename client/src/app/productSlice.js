import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createProduct,
  getAllProducts,
  getAProduct,
  deleteProduct,
  editProduct,
} from "../services/products";
import { removeError, addError } from "./errorSlice";

/**
 * products: list of products
 * onProduct: single product
 * status: progress of fetching/modifying data, idle(no request in progress), loading, succeeded, failed
 */
const initialState = {
  products: [],
  oneProduct: null,
  status: "idle",
};

export const getAllProductsAction = createAsyncThunk(
  "products/getAllProducts",
  async (data, thunkAPI) => {
    try {
      const products = await getAllProducts(data);
      thunkAPI.dispatch(removeError());
      return products;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getAProductAction = createAsyncThunk(
  "products/getAProduct",
  async (data, thunkAPI) => {
    try {
      const oneProduct = await getAProduct(data);
      thunkAPI.dispatch(removeError());
      return oneProduct;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.messagea);
    }
  }
);

export const createProductAction = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      const product = await createProduct(data);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  "products/deleteProduct",
  async (data, thunkAPI) => {
    try {
      const product = await deleteProduct(data);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const editProductAction = createAsyncThunk(
  "products/editProduct",
  async (data, thunkAPI) => {
    try {
      const product = await editProduct(data);
      thunkAPI.dispatch(removeError());
      return product;
    } catch (err) {
      thunkAPI.dispatch(addError(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.status = "loading";
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getAllProductsAction
    builder.addCase(getAllProductsAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(getAllProductsAction.rejected, (state, action) => {
      state.status = "failed";
    });
    // getAProductAction
    builder.addCase(getAProductAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAProductAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.oneProduct = action.payload;
    });
    builder.addCase(getAProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
    // createProductAction
    builder.addCase(createProductAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products.push(action.payload);
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
    // deleteProductAction
    builder.addCase(deleteProductAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
    // editProductAction
    builder.addCase(editProductAction.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(editProductAction.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products[index] = action.payload;
    });
    builder.addCase(editProductAction.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;
