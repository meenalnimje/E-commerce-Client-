import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { useParams } from "react-router";
import { axiosClient } from "../../utiles/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
function ProductDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  // const cartDetail = useSelector((state) => state.cartReducer.cart);
  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity =
    cart.find((item) => item.title === params.productId)?.quantity || 0;
  const product_id = params.productId;
  const [productDetail, setProductDetail] = useState(null);
  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[title][$eq]=${product_id}&populate=*`
    );
    setProductDetail(productResponse?.data?.data[0]); //data[0] since only one item is there
  }
  useEffect(() => {
    setProductDetail(null);
    fetchData();
  }, [params]);
  if (!productDetail) {
    // this is when internet is slow and product details are yet to come
    return <div class="loader">Loading...</div>;
  }
  return (
    <div className="product-detail">
      <div className="product-content">
        <div className="left-side">
          <div className="product-img center">
            <img
              src={
                productDetail?.attributes?.product_img?.data?.attributes?.url
              }
              alt="this is the image"
            />
          </div>
        </div>
        <div className="right-side">
          <div className="title">{productDetail?.attributes?.title}</div>
          <p className="description">{productDetail?.attributes?.desc}</p>
          <span className="price">Rs {productDetail?.attributes?.price}</span>
          <div className="quantity-box">
            <span
              className="remove center"
              onClick={() => dispatch(removeFromCart(productDetail))}
            >
              -
            </span>
            <span className="quantity center">{quantity}</span>
            <span
              className="add center"
              onClick={() => dispatch(addToCart(productDetail))}
            >
              +
            </span>
          </div>
          <button
            className="add-to-cart"
            onClick={() => dispatch(addToCart(productDetail))}
          >
            Add to cart
          </button>
          <div className="policy-content">
            <p className="policies">Policies</p>
            <ul className="policy">
              <li className="policy-item">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestias fugiat optio accusantium a ipsa.
              </li>
              <li className="policy-item">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestias fugiat optio accusantium a ipsa.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
