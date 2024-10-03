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
        autoplay: true,
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