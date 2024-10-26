import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import sliderBottom from "../../../../assets/images/web/product-detail/slider-bottom-img.png";
import productDetail from "../../../../assets/images/web/product-detail/product-detail-image.png";


function AsNavFor() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  return (
  
    <div className="slider-container ms-lg-5" >
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-lg-4">
            <img
              className="img-fluid pt-lg-5 pt-0 ps-lg-4 ps-0"
              src={productDetail}  
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-lg-5 pt-0 ps-lg-4 ps-0"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-lg-5 pt-0 ps-lg-4 ps-0"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-lg-5 pt-0 ps-lg-4 ps-0"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-lg-5 pt-0 ps-lg-4 ps-0"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3  ps-4">
            <img
              className="img-fluid pt-lg-5 pt-0 ps-lg-4 ps-0"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
      </Slider>
     
      <Slider
      className="mt-5"
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={true}
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        onMouseEnter={(e) => e.currentTarget.style.background = "#fff"} // Hover color
      >
        <div >
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
        <div>
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
        <div>
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
        <div>
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
        <div>
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
        <div>
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
      </Slider>
    </div>
  );
}

const arrowStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#DADADA",
  color: "#3B3B3B",
  boxShadow: "0px 4.83px 10px 0px rgba(0, 0, 0, 0.05)",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: "10",
 
};

const nextArrowStyles = {
  ...arrowStyles,
  right: "1rem",
};

const prevArrowStyles = {
  ...arrowStyles,
  left: "-1rem",
 
};

const spanStyles = {
  fontWeight: "bold",
  textTransform: "uppercase",
};


// Customize Next Arrow
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow next-arrow"
      onClick={onClick}
      style={nextArrowStyles}
    >
      <span style={spanStyles}>
        <IoIosArrowForward />
      </span>
    </div>
  );
};

// Customize Previous Arrow
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="custom-arrow prev-arrow"
      onClick={onClick}
      style={prevArrowStyles}
    >
      <span style={spanStyles}>
        <IoIosArrowBack />
      </span>
    </div>
  );
};


export default AsNavFor;
