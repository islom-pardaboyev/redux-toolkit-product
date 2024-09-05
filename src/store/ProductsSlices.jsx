import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const ProductsSlices = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      return {
        products: [...action.payload],
      };
    },
    saveToBasket: (state, action) => {
      return {
        products: state.products.map((item) =>
          item.id === action.payload ? { ...item, isSaved: !item.isSaved } : item
        ),
      };
    },
    increaseAmount: (state, action) => {
      return {
        products: state.products.map((item) => 
          item.id === action.payload ? { ...item, amount: item.amount + 1 } : item)
      }
    }
  },
});

export const { getAllProducts, saveToBasket, increaseAmount } = ProductsSlices.actions;
export default ProductsSlices.reducer;
