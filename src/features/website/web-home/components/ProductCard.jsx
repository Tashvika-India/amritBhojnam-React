import React, { useEffect, useState } from 'react';
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import productCard from "../../../../assets/images/web/product-product.png";
import fireImg from "../../../../assets/images/web/Fire.png";
import { Link } from "react-router-dom"; 
import { baseURL } from '../../../../utils/constant-variable';

const ProductCard = ({ product }) => { 
  
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
      <div className="product-card border py-3 px-4">
        <div className="d-flex justify-content-between ">
          <div>
            <span className="product-badge badge bg-yellow fw-500">
                10% off
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
        <div className="product-image">
          <img className="img-fluid pb-3" src={ baseURL + product?.images[0]?.img_files} alt="product" />
        </div>
        <h6 className="fb-fs-12 fw-500 d-flex text-brown pb-2">
          <span>
          <img className="img-fluid" src={fireImg} /> 
          </span>
          <span className='pt-1 ps-1'>
          80 Calories
          </span>
        </h6>
        <Link to={`/product-detail?product_id=${product?.id}`}><h5 className="fb-fs-14 fw-600 masala-con">{product?.name}</h5></Link>
        <h5 className="fb-fs-14 fw-600 text-grey">
        100 g
        </h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h6 className="fb-fs-20 fw-bold mb-0">
            <small className="fw-500 fb-fs-16 text-grey pe-2">
              <strike>
              ₹ {product?.max_price}
              </strike>
            </small>
            ₹ {product?.offer_price}
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
