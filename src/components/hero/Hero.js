import React from "react";
import "./Hero.scss";
import { useNavigate } from "react-router-dom";
function Hero() {
  // banner image continer
  const navigate = useNavigate();
  return (
    <div className="hero center">
      <div className="hero-content">
        <h2 className="heading">Exclusive Prints and Artwork</h2>
        <p className="subheading">Exclusive art pieces, for Exclusive you</p>
        <button className="cta" onClick={() => navigate("/category")}>
          Explore More
        </button>
      </div>
    </div>
  );
}

export default Hero;
