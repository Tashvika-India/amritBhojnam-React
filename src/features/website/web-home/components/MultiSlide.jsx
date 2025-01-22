import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

function AsNavFor({ data }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []); 

  // Dynamically determine slidesToShow based on data length
  const slidesToShow = data?.length <= 4 ? data.length : 4;

  return (
    <div className="slider-container ms-lg-5">
      <Slider infinite={false} asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        {data?.map((item, index) => ( 
          <div className="product-detail-slider" key={index}>
            <div className="product-detail-image bg-background p-3">
              <img
                loading="lazy"
                className="img-fluid w-100 h-100"
                src={item?.image || ""}   
                alt={item?.name || "img"}  
              />
            </div>
          </div>
        ))}
      </Slider>

      <Slider
        className="mt-xxl-5 slider-bottom-thumbs"
        asNavFor={nav1}
        infinite={false} 
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={slidesToShow}
        swipeToSlide={data?.length > 4}
        focusOnSelect={true}  
        arrows={data?.length > 4}   
        nextArrow={<SampleNextArrow />}
        prevArrow={<SamplePrevArrow />}
      >
        {data?.map((item, index) => (
          <div key={index} className="slider-bottom-item">
            <img
              loading="lazy"
              className="img-fluid product-thumbnail-image"  
              src={item?.image || ""}   
              alt={item?.name || "img"} 
            />
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
