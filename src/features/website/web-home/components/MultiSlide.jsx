import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { baseURL } from "../../../../utils/constant-variable";


function AsNavFor({ data }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container ms-lg-5">
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        {data?.map((item, index) => ( 
          <div className="product-detail-slider" key={index}>
            <div className="product-detail-image bg-background p-3">
              <img loading="lazy"
                className="img-fluid w-100 h-100"
                src={baseURL+item?.img_files}   
                alt={`banner-ads-${index}`}  
              />
            </div>
          </div>
        ))}
      </Slider>

      <Slider
        className="mt-5 slider-bottom-thumbs"
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}  
        arrows={true}   
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
        onMouseEnter={(e) => e.currentTarget.style.background = "#fff"}  
      >
        {/* Slider thumbnails */}
        {data?.map((item, index) => (
          <div key={index} className="slider-bottom-item w-75">
            <img loading="lazy" className="img-fluid" src={baseURL+item?.img_files} alt={`slider-bottom-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

const arrowStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "50%",
  backgroundColor: "#DADADA",
  color: "#FFFFFF",
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
