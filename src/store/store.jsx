import { configureStore } from "@reduxjs/toolkit";
import ProductsSlices from "./ProductsSlices";

export const store = configureStore({
    reducer: ProductsSlices
})