import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import "./Payments.scss";
import { resetCart } from "../../redux/cartSlice";
function Payments() {
  const params = useParams();
  const status = params.status;
  const dispatch = useDispatch();
  const infoData = {
    success: {
      message: "your order has been placed",
      cta: "shop more",
      icon: <BsCartCheckFill />,
    },
    failed: {
      message: "payment failed",
      cta: "try again ",
      icon: <BiErrorCircle />,
    },
  };
  if (status === "success") {
    dispatch(resetCart());
  }
  return (
    <div className="payments">
      <div className="icons">{infoData[status].icon}</div>
      <h2 className="message">{infoData[status].message}</h2>
      <button className="btn-primary">{infoData[status].cta}</button>
    </div>
  );
}

export default Payments;
