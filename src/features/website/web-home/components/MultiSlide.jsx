import React from "react";
import Slider from "react-slick";
import { useState, useEffect, useRef } from "react";
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
    <div className="slider-container ms-5">
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-5 ps-4"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-5 ps-3"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-5 ps-3"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-5 ps-3"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3 ps-4">
            <img
              className="img-fluid pt-5 ps-3"
              src={productDetail}
              alt="banner-ads"
            />
          </div>
        </div>
        <div className="product-detail-slider">
          <div className="product-detail-image bg-background pt-3  ps-4">
            <img
              className="img-fluid pt-5 ps-3"
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
      >
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
        <div>
          <img className="img-fluid" src={sliderBottom} alt="slider-bottom" />
        </div>
      </Slider>
    </div>
  );
}

export default AsNavFor;
