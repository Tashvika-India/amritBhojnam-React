import React from 'react';
import Slider from 'react-slick';
import item from '../../../../assets/images/web/slide-product.png';
import saveImg from '../../../../assets/images/web/slide-product.png';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Margin } from '@mui/icons-material';

const ItemSlide = () => {
        const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,  
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024, // For mid-sized screens (tablets, etc.)
                settings: {
                    slidesToShow: 3, // Show 3 items
                },
            },
            {
                breakpoint: 768, // For mobile screens
                settings: {
                    slidesToShow: 2, // Show 2 items
                },
            },
            {
                breakpoint: 480, // For very small screens
                settings: {
                    slidesToShow: 2, // Show 1 item 
                },
            },
        ],
    };
    return (
        < >
            <Slider {...settings} className="item-slider">
                <div className="item-slide px-2 px-lg-0">
                <div
              className="cat-itmes bg-orange p-4 gap-0 w-255"
              style={{ borderRadius: "25px" }}
            >
              <div className="saver-card h-100 w-100">
                <h6 className="text-white mb-0">25% OFF</h6>
                <p
                  className="fb-fs-30 fw-bolder text-white mb-2"
                  style={{ textWrap: "nowrap" }}
                >
                  SAVE ₹100{" "}
                </p>
                <img className="img-fluid pt-1" src={saveImg} alt="save-img" />
              </div>
            </div>
                </div>
                <div className="item-slide px-2 px-lg-0">
                    <img src={item} alt="item" className='img-fluid' />
                </div>
                <div className="item-slide px-2 px-lg-0">
                    <img src={item} alt="item" className='img-fluid' />
                </div>
                <div className="item-slide px-2 px-lg-0">
                    <img src={item} alt="item" className='img-fluid' />
                </div>
                <div className="item-slide px-2 px-lg-0">
                    <img src={item} alt="item" className='img-fluid' />
                </div>
                <div className="item-slide px-2 px-lg-0">
                    <img src={item} alt="item" className='img-fluid' />
                </div>
                <div className="item-slide px-2 px-lg-0">
                    <img src={item} alt="item" className='img-fluid' />
                </div>
            </Slider>
        </>
    )
}

const arrowStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: '#3B3B3B',
    boxShadow: '0px 4.83px 10px 0px rgba(0, 0, 0, 0.05)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
};

const nextArrowStyles = {
    ...arrowStyles,
    right: '-1rem',
};

const prevArrowStyles = {
    ...arrowStyles,
    left: '-1rem',
};

const spanStyles = {
    fontWeight: 'bold',
    textTransform: 'uppercase',
};


// Customize Next Arrow
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow next-arrow" onClick={onClick} style={nextArrowStyles}>
            <span style={spanStyles}><IoIosArrowForward /></span>
        </div>
    );
};

// Customize Previous Arrow
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow prev-arrow" onClick={onClick} style={prevArrowStyles}>
            <span style={spanStyles}><IoIosArrowBack /></span>
        </div>
    );
};

export default ItemSlide