import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  allProducts: [],
};

const productSlice = createSlice({
  name: 'Allproducts', // Give your slice a name
  initialState,
  reducers: {
    // Define your reducers here
    setProducts: (state, action) => {
        console.log('actionPayload', action.payload);
      // Example reducer logic
      state.products = [...state.products, action.payload];
    },
    setAllProducts: (state, action) => {
        console.log('actionPayloads', action.payload);
      // Example reducer logic
      state.allProducts = action.payload;
    },
    setUpadteProduct: (state, action) => {
        const updatedProduct = action.payload;
        const index = state.allProducts.findIndex((product) => product._id === updatedProduct._id);
        if (index !== -1) {
          state.allProducts[index] = updatedProduct; // Update only the specific product
        };
    }
  },
});

export const { setProducts, setAllProducts, setUpadteProduct } = productSlice.actions;

export default productSlice.reducer;
