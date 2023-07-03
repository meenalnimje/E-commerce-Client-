import React, { useEffect, useState } from "react";
import "./categories.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../utiles/axiosClient";
import { useSelector } from "react-redux";
// categories->collection
function Categories() {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState(null);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const sortOptions = [
    {
      value: "Price-Low-To-High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "ceartedAt",
    },
  ];
  const [sortBy, setSortBy] = useState(sortOptions[0].sort);
  async function fetchData() {
    const url = params.categoryId
      ? `/products?populate=*&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=*&sort=${sortBy}`;
    const productResponse = await axiosClient.get(url);
    setProducts(productResponse?.data?.data);
  }
  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }
  function handleSortChange(e) {
    const sortKey = e.target.value;
    setSortBy(sortKey);
  }
  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchData();
    // api call
  }, [params, sortBy]);
  return (
    <div className="categories">
      <div className="header">
        <div className="info">
          <h2>Explore All Print and Artwork</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            sunt tempora aut placeat fugiat rem. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Ullam facere recusandae aliquam eum
            nihil reiciendis!
          </p>
        </div>
        <div className="sort-by">
          <div className="sort-by-container">
            <p className="sort-by-text">Sort by</p>
            <select name="sort-by" id="sort-option" onChange={handleSortChange}>
              {sortOptions.map((options) => (
                <option key={options.sort} value={options.sort}>
                  {options.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="filter-box">
          <div className="category-filter">
            <h3>Category</h3>
            <div className="filter-radio">
              {categories?.map((item) => (
                <div className="options" key={item.id}>
                  <input
                    type="radio"
                    name="category"
                    value={item?.attributes?.key}
                    id={item.id}
                    onChange={updateCategory}
                    checked={item?.attributes?.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item?.attributes?.title}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="product-box">
          {products?.map((item) => (
            <Product key={item.id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
