import React from 'react';
import Slider from 'react-slick';
import banner from '../../../../assets/images/web/web-banner.png';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const WebBanner = () => { 
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        < >
            <Slider {...settings} className="banner-slider">
                <div className="banner-slide" >
                    <img src={banner} alt="banner" className='img-fluid w-100' />
                    {/* <div className="row">
                        <div className="col-md-6">
                            <div className="banner-content">
                                <span className="label">All Natural Products</span>
                                <h1 className='fw-light text-balance'>Good For <span className='fw-bold text-orange'>You and the Planet</span></h1>
                                <p className='text-balance mb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer </p>
                                <button className="button-primary">Shop Now</button>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="banner-slide" >
                    <img src={banner} alt="banner" className='img-fluid' />
                </div>
                <div className="banner-slide" >
                    <img src={banner} alt="banner" className='img-fluid' />
                </div>
                <div className="banner-slide" >
                    <img src={banner} alt="banner" className='img-fluid' />
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

export default WebBanner