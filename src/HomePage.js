import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Carousel from "./Carousel";

const HomePage = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <Carousel />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
