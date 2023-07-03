import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
function Navbar() {
  const [isSelected, setIsSelected] = useState(false);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalItems = 0;
  cart.forEach((item) => {
    totalItems += item.quantity;
  });
  return (
    <>
      <div className="container center">
        <div className="navbar">
          <div className="left-side">
            <ul className="selling-items">
              {categories?.map((category) => {
                return (
                  <li className="items" key={category.id}>
                    <Link
                      to={`/category/${category.attributes.key}`}
                      className="link"
                    >
                      {category.attributes.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="middle-side">
            <Link to="/" className="title">
              POSTERZ
            </Link>
          </div>
          <div
            className="right-side center"
            onClick={() => {
              setIsSelected(!isSelected);
            }}
          >
            <AiOutlineShoppingCart className="cart-icon" />
            {/* display hide karna hoga toh niche wali line use karna */}
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
        </div>
      </div>
      {isSelected && (
        <Cart
          onClose={() => {
            setIsSelected(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
