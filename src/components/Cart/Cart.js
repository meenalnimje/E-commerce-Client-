import React from "react";
import "./Cart.scss";
import { GrClose } from "react-icons/gr";
import CartItem from "../cartItems/CartItem";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { axiosClient } from "../../utiles/axiosClient";
import { loadStripe } from "@stripe/stripe-js";
function Cart({ onClose }) {
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalAmount += item.quantity * item.price;
    totalQuantity += item.quantity;
  });
  async function handlecheckout() {
    const response = await axiosClient.post("/orders", {
      products: cart,
    });
    // console.log("the response of stripe id from the frontend side", response);
    const stripe = await loadStripe(
      `${process.env.REACT_APP_STRIPE_PUBLISABLE_KEY}`
    );
    // it will open stripe checkout page.
    const data = await stripe.redirectToCheckout({
      sessionId: response.data.strip_id.id,
    });
  }
  return (
    <div className="cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <GrClose onClick={onClose} className="close-btn" />
          <h3>Shopping Cart</h3>
        </div>
        <div className="cart-container">
          {cart.map((item) => (
            <CartItem key={item.key} cart={item} />
          ))}
        </div>
        {totalQuantity !== 0 ? (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-text">Total:</h3>
              <h3 className="total-value">Rs. {totalAmount}</h3>
            </div>
            <div className="checkout-btn" onClick={handlecheckout}>
              CHECKOUT
            </div>
          </div>
        ) : (
          <div className="empty-cart-info">
            <div className="cart-icon">
              <AiOutlineShoppingCart />
            </div>
            <h3 className="empty-message">the cart is empty</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
