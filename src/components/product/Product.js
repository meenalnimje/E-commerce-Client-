import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
function Product({ props }) {
  const navigate = useNavigate();
  return (
    <div
      className="product"
      onClick={() => navigate(`/products/${props.attributes.title}`)}
    >
      <div className="product-container">
        <div className="img-container">
          <img
            src={props?.attributes?.product_img?.data.attributes.url}
            alt="this is the image"
            className="product-img"
          />
        </div>
        <div className="product-info">
          <p className="title">{props?.attributes?.title}</p>
          <p className="price">{props?.attributes?.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
