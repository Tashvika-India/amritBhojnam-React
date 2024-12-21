import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { baseURL } from "../../../../utils/constant-variable";
import { useDispatch } from "react-redux";
import {
  removeFromWishlist,
  updateWishlist,
} from "../../../../redux/slices/wishlistSlice";

const ProductCard = ({ product }) => {
  const [checked, setChecked] = useState(product?.is_wishlist || false);
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    event.stopPropagation();
    const updatedChecked = !checked;
    setChecked(updatedChecked);
    const data = { product_id: product?.id, action: updatedChecked };
    dispatch(updateWishlist(data));
    dispatch(removeFromWishlist(product?.id));
  }; 

  return (
    <Link to={`/product-detail?product_id=${product?.id}`}>
      <div className="product-card border pb-3 d-flex flex-column justify-content-between bg-white">
        <div className="d-flex justify-content-between product-fav">
          <div>
            <span className="product-badge badge bg-yellow fw-500">
              10% off
            </span>
          </div>
          <div className="bg-white rounded-circle whislist-icon">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite className="text-danger" />}
              checked={checked}
              onChange={handleChange}
              onClick={(event) => event.stopPropagation()} // Prevent link redirection
              style={{
                color: "#F26722",
                margin: "0",
                padding: "0",
              }}
            />
          </div>
        </div>
        <div className="product-image">
          <img
            className="img-fluid pb-3"
            src={product?.images[0]?.image}
            alt="product"
          />
        </div>
        <div className="px-3">
          <h5 className="fb-fs-14 fw-600 masala-con">{product?.name}</h5>

          <h5 className="fb-fs-14 fw-600 text-grey">
            {product?.quantity}
            {product?.quantity_unit}
          </h5>
          <div className="d-flex justify-content-between align-items-end mt-3">
            <h6 className="fb-fs-20 fw-bold mb-0">
              {product?.max_price !== product?.offer_price &&  <small className="fw-500 fb-fs-16 text-grey pe-2">
                <strike>₹ {product?.max_price}</strike>
              </small>}
              ₹ {product?.offer_price}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
