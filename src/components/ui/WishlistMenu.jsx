import React from 'react';
import { Offcanvas, Button, ProgressBar } from 'react-bootstrap';
import product from '../../assets/images/web/product-card.png';

const MyCartMenu = ({ show, onClose }) => {
    return (
        <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: '25%' }}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='px-0 pb-0'>
                <div className=" d-flex flex-column justify-content-between h-100">
                    <div className="px-3">
                        <div className="mb-4">
                            <p> <span></span> SPEND <strong>₹100</strong>  MORE FOR FREE SHIPPING</p>
                            <ProgressBar variant='orange' now={80} style={{ height: '5px' }}/>
                        </div>
                        <div className='cart-items'>
                            <div className="product-item">
                                <img src={product} className='img-fluid' alt="product" />
                            </div>
                            <div className="product-details">
                                <p className='item-name  text-black fw-500 mb-0'>Masala Millet (Veggie Masala)</p>
                                <p className='item-weight text-grey mb-0'>100 g</p>
                                <h5 className='item-amount'>₹70 x 2</h5>
                            </div>
                            <div className="product-quantity">
                                <div className="quantity-manage mb-4">
                                    <button className="quantity-minu d-inline-block border-0 bg-white text-orange fw-600">-</button>
                                    <span className='quantity-count d-inline-block text-orange fw-600'> 2 </span>
                                    <button className='quantity-plus d-inline-block border-0 bg-white text-orange fw-600'>+</button>
                                </div>
                                <button className="ms-2 text-yellow remove-quantity border-0 bg-white text-decoration-underline">Remove</button>
                            </div>
                        </div>
                    </div>
                    <div className="total-amount-wrapper shadow px-3 py-3">
                        <div className="d-flex justify-content-between ">
                            <div className=" mb-3">
                                <h5>Total Amount:</h5>
                                <p className='text-black fw-normal'>Taxes and shipping calculated at checkout</p>
                            </div>
                            <div className="">
                                <h5 className='total-amount d-inline-block text-orange'>₹150</h5>
                            </div>
                        </div>
                        <button className='button-primary w-100'>Checkout</button>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MyCartMenu;
