// // productSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getAllProducts } from 'path-to-your-api'

// const initialState = {
//   products: [],
//   status: 'idle',
//   error: null,
// }

// export const getAllProductsAction = createAsyncThunk(
//   'products/getAllProducts',
//   async (_, thunkAPI) => {
//     try {
//       const products = await getAllProducts()
//       return products
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// )

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllProductsAction.pending, (state) => {
//         state.status = 'loading'
//       })
//       .addCase(getAllProductsAction.fulfilled, (state, action) => {
//         state.status = 'succeeded'
//         state.products = action.payload
//       })
//       .addCase(getAllProductsAction.rejected, (state, action) => {
//         state.status = 'failed'
//         state.error = action.payload
//       })
//   },
// })

// export default productSlice.reducer
