import React from "react";
import Slider from "react-slick";
import item from "../../../../assets/images/web/slide-product.png";
import saveImg from "../../../../assets/images/web/save-image.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Margin } from "@mui/icons-material";
import ProductCard from "./ProductCard";

const ItemSlide = ({healthyBitesProducts}) => {
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // centerMode: false, // Enables padding around slides
    // centerPadding: "20px", // Adjust spacing between slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "15px", // Adjust spacing for mid-sized screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px", // Adjust spacing for mobile
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "5px", // Adjust spacing for small screens
        },
      },
    ],
  };

  return (
    <>
      {/* <Slider {...settings} className="item-slider">
        <div className="item-slide px-2 px-lg-0">
          <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-2"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
        <div className="item-slide px-2 px-lg-0">
        <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-3"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
        <div className="item-slide px-2 px-lg-0">
        <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-3"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
        <div className="item-slide px-2 px-lg-0">
          <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-3"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
        <div className="item-slide px-2 px-lg-0">
          <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-3"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
        <div className="item-slide px-2 px-lg-0">
          <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-3"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
        <div className="item-slide px-2 px-lg-0">
          <div
            className="cat-itmes bg-orange p-4 gap-0 mx-0 mx-lg-3"
            style={{ borderRadius: "25px" }}
          >
            <div className="saver-card h-100 w-100 text-center">
              <h6 className="text-white mb-0">25% OFF</h6>
              <p
                className="fb-fs-30 fw-bolder text-white mb-2"
                style={{ textWrap: "nowrap" }}
              >
                SAVE ₹100{" "}
              </p>
              <img
                className="img-fluid pt-1 mx-auto"
                src={saveImg}
                alt="save-img"
              />
            </div>
          </div>
        </div>
      </Slider> */}
      <Slider {...settings} className="item-slider">
        {
          healthyBitesProducts?.slice(0, 10).map((item, index) => (
            <ProductCard product={item} key={index} />
          ))
        }
      </Slider>
    </>
  );
};

const arrowStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#fff",
  color: "#3B3B3B",
  boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.1)",
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
  right: "-0.5rem",
};

const prevArrowStyles = {
  ...arrowStyles,
  left: "-0.5rem",
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

export default ItemSlide;
