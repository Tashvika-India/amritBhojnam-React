import React, { useEffect, useState } from 'react';
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import productCard from "../../../../assets/images/web/product-card.png";
import fireImg from "../../../../assets/images/web/Fire.png";
import { Link } from "react-router-dom";

const ProductCard = ({ card, index }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [quantity, setQuantity] = useState(0);
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleClick = () => {
    setQuantity(1);
  };

  return (
    <>
      <div className="product-card border py-3 px-4" key={index}>
        <div className="d-flex justify-content-between ">
          <div>
            <span className="product-badge badge bg-yellow fw-500">
              {card.discount_percentage}
            </span>
          </div>
          <div>
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              style={{
                color: "#F26722",
                margin: "0",
                padding: "0",
              }}
            />
          </div>
        </div>
        <span className="product-fav"></span>
        <div className="">
          <img className="img-fluid pb-3" src={productCard} alt="product" />
        </div>
        <h6 className="fb-fs-12 fw-500 d-flex text-brown">
          <span>
            <img className="img-fluid" src={fireImg} alt="fire" />
          </span>
          {card.calories}
        </h6>
        <Link to="/products"><h5 className="fb-fs-14 fw-600 masala-con">{card.name}</h5>Home</Link>
        <h5 className="fb-fs-14 fw-600 text-grey">{card.weight}</h5>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <h6 className="fb-fs-20 fw-bold mb-0">
            <small className="fw-500 fb-fs-16 text-grey">
              <strike>
                {card.price.currency}
                {card.price.original}
              </strike>
            </small>
            {card.price.currency}
            {card.price.discounted}
          </h6>
          <div>
            {/* Conditional rendering of the "Add" button */}
            {quantity === 0 ? (
              <button
                className="button-primary py-1 rounded fb-fs-14 fw-600"
                onClick={handleClick} // Hide Add button and show quantity management on click
              >
                Add
              </button>
            ) : (
              <div className="product-quantity text-end">
                <div className="quantity-manage">
                  <button
                    className="quantity-minu d-inline-block border-0 bg-white text-orange fw-600"
                    onClick={decreaseQuantity}
                    disabled={quantity < 1}
                  >
                    -
                  </button>
                  <span className="quantity-count d-inline-block text-orange fw-600">
                    {quantity}
                  </span>
                  <button
                    className="quantity-plus d-inline-block border-0 bg-white text-orange fw-600"
                    onClick={increaseQuantity}
                    disabled={quantity === 10}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
