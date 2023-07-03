import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";
function Category({ props }) {
  const navigate = useNavigate();
  return (
    <div
      className="category"
      onClick={() => navigate(`/category/${props.attributes.key}`)}
    >
      <div className="content_category center">
        <h4>{props?.attributes.title}</h4>
      </div>
    </div>
  );
}

export default Category;
