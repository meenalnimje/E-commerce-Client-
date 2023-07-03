import React, { useState, useEffect } from "react";
import "./Home.scss";
import Hero from "../../components/hero/Hero";
import Category from "../../components/Category/Category";
import Product from "../../components/product/Product";
import { axiosClient } from "../../utiles/axiosClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [isTopPick, setIsTopPick] = useState(null);
  const category = useSelector((state) => state.categoryReducer.categories);
  const navigate = useNavigate();
  async function fetchData() {
    const topPickResponse = await axiosClient.get(
      "/products?filters[topPick][$eq]=true&populate=product_img"
    );
    setIsTopPick(topPickResponse.data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <Hero />
      <section className="collection">
        <div className="info">
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            shop from best, our Films and TV Posters collection
          </p>
          <div className="content">
            {category?.map((item) => {
              return <Category key={item.id} props={item} />;
            })}
          </div>
        </div>
      </section>
      <section className="collection">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">All new design,some old details</p>
          <div className="content">
            {isTopPick?.map((item) => (
              <Product key={item?.id} props={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
