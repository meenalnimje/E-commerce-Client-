import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes;
      const currItem = product
        ? {
            title: product.title,
            key: product.category.data.attributes.key,
            price: product.price,
            image: product.product_img.data.attributes.url,
          }
        : action.payload;
      const index = state.cart.findIndex(
        (item) => item.title === currItem.title
      );
      if (index === -1) {
        state.cart.push({ ...currItem, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const currItem = action.payload;
      // action.payload.attributes.key||action.payload.key
      const index = state.cart.findIndex(
        (item) => item.product_id === currItem.product_id
      );
      if (index === -1) {
        return;
      }
      if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter(
          (item) => item.product_id !== currItem.product_id
        );
      } else {
        state.cart[index].quantity -= 1;
      }
    },
    // create action for cart item
    deleteFromCart: (state, action) => {
      const currItem = action.payload;
      const index = state.cart.findIndex(
        (item) => item.product_id === currItem.product_id
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    // when the order will be placed we need to remove it from the cart.that's why resetCart
    resetCart: (state, action) => {
      state.cart = [];
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart, deleteFromCart, resetCart } =
  cartSlice.actions;
