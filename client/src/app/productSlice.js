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
  reducers: {},
  extraReducers: (builder) => {},
});
