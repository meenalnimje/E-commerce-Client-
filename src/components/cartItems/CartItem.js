import React from "react";
import "./CartItem.scss";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
function CartItem({ cart }) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <div className="item-img">
        <img src={cart.image} alt="this is the product" />
      </div>
      <div className="product-info">
        <h3 className="title">{cart.title}</h3>
        <div className="price">Rs {cart.price}</div>
        <div className="quantity-box">
          <span
            className="remove center"
            onClick={() => dispatch(removeFromCart(cart))}
          >
            -
          </span>
          <span className="quantity center">{cart.quantity}</span>
          <span
            className="add center"
            onClick={() => dispatch(addToCart(cart))}
          >
            +
          </span>
        </div>
        <div className="total-price">Rs {cart.quantity * cart.price}</div>
      </div>
      <div className="close-btn">
        <GrClose />
      </div>
    </div>
  );
}

export default CartItem;
