import React, { useState } from "react";
import { Offcanvas, Button, ProgressBar } from "react-bootstrap";
import product from "../../assets/images/web/product-card.png";
import deliveryImg from "../../assets/images/web/product-detail/delivery-img.png";

const MyCartMenu = ({ show, onClose }) => {
  const [quantity, setQuantity] = useState(2);
  const [showItem, setShowItem] = useState(true);

  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  console.log("Show", showItem);

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      style={{ width: "30%" }}
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="px-0 pb-0">
        <div className=" d-flex flex-column justify-content-between h-100">
          <div className="px-3">
            <div className="mb-4">
              <p className="d-flex">
                {" "}
                <span>
                  <img
                    className="img-fluid me-3"
                    src={deliveryImg}
                    alt="delivery-img"
                  />
                </span>
                <span className="me-2 mt-2"> SPEND</span>{" "}
                <strong className="me-2 mt-2">₹100</strong>{" "}
                <span className="mt-2"> MORE FOR FREE SHIPPING</span>
              </p>
              <ProgressBar
                variant="yellow"
                now={80}
                style={{ height: "5px" }}
              />
            </div>

              <div className="cart-items" hidden={!showItem}>
                <div className="product-item">
                  <img src={product} className="img-fluid" alt="product" />
                </div>
                <div className="product-details w-100 ms-3">
                  <p className="item-name  text-black fw-500 mb-0">
                    Masala Millet (Veggie Masala)
                  </p>
                  <p className="item-weight text-grey mb-0 mt-1">100 g</p>
                  <h5 className="item-amount mt-2">₹70 x 2</h5>
                </div>
                <div className="product-quantity text-end">
                  <div className="quantity-manage mb-4">
                    <button
                      className="quantity-minu d-inline-block border-0 bg-white text-orange fw-600"
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity-count d-inline-block text-orange fw-600">
                      {quantity}{" "}
                    </span>
                    <button
                      className="quantity-plus d-inline-block border-0 bg-white text-orange fw-600"
                      onClick={increaseQuantity}
                      disabled={quantity === 10}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ms-2 text-yellow remove-quantity border-0 bg-white text-decoration-underline"
                    onClick={() => setShowItem(false)}
                  >
                    Remove
                  </button>
                </div>
              </div>
          
          </div>
          <div className="total-amount-wrapper product-detail-shadow px-3 py-3">
            <div className="d-flex justify-content-between ">
              <div className=" mb-3">
                <h5>Total Amount:</h5>
                <p className="text-black fw-normal">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <div className="">
                <h5 className="total-amount d-inline-block text-orange">
                  ₹150
                </h5>
              </div>
            </div>
            <button className="button-primary w-100">Checkout</button>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MyCartMenu;
