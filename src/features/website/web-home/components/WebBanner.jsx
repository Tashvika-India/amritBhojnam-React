import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import banner from "../../../../assets/images/web/web-banner.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getBannerApi } from "../../../../services/adminApiRoutes";
import { baseURL } from "../../../../utils/constant-variable";
import { Link } from "react-router-dom";
const WebBanner = () => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);


  const settings = {
    dots: false,
    infinite: banner.length > 1, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banner.length > 1, 
    autoplaySpeed: 3000,
    arrows: banner.length > 1,  
    nextArrow: banner.length > 1 ? <SampleNextArrow /> : null,
    prevArrow: banner.length > 1 ? <SamplePrevArrow /> : null,
  };

  async function getBanner() {
    setLoading(true);
    try {
      const response = await getBannerApi();
      setBanner(response?.data || []);
    } catch (error) {
      console.log("Error on Banner List", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      <Slider {...settings} className="banner-slider">
        {banner?.map((item, index) => (
          <Link to="/products" className="banner-slide" key={index}>
            <img loading="lazy"
              src={baseURL + item.img_file}
              alt="banner"
              className="img-fluid"
            />
          </Link>
        ))}
      </Slider>
    </>
  );
};

const arrowStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  color: "#3B3B3B",
  boxShadow: "0px 4.83px 10px 0px rgba(0, 0, 0, 0.05)",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
};

const nextArrowStyles = {
  ...arrowStyles,
  right: "-1rem",
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

export default WebBanner;
