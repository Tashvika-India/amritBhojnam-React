import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { baseURL } from "../../../../utils/constant-variable";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  updateWishlist,
} from "../../../../redux/slices/wishlistSlice";
import MobileLogin from "../../../../components/ui/MobileLogin";
import { notifySuccess } from "../../../../components/ui/Notification";
import { postCartApi } from "../../../../services/adminApiRoutes";
import { fetchCart, fetchFinalCart, updateCart } from "../../../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(product?.cart_item_qty || 0);
  const [debouncedQuantity, setDebouncedQuantity] = useState(quantity);
  const [checked, setChecked] = useState(product?.is_wishlist || false);
  const dispatch = useDispatch();;

  const login = localStorage.getItem("access") || localStorage.getItem("refresh");
  const [showWebLogin, setShowWebLogin] = useState(false);
  const handleWishlistChange = async (event) => {
    event.stopPropagation();
    if (login) {
      const updatedChecked = !checked;
      setChecked(updatedChecked);
      const data = { product_id: product?.id, action: updatedChecked };
      dispatch(updateWishlist(data));
      if (!updatedChecked) {
        dispatch(removeFromWishlist(product?.id));
      }
      notifySuccess(
        updatedChecked
          ? "Product added to wishlist successfully"
          : "Product removed from wishlist successfully"
      );
    } else {
      toggleWebLogin();
    }
  };
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);

  const { cartId } = useSelector((state) => state.cart);
  const handleIncreaseQuantity = async (product_id) => {
    if (quantity < 10) {
      const quantityPlus = quantity + 1
      setQuantity(quantityPlus)
      try {
        await dispatch(updateCart({ product_id, item_quantity: quantityPlus }));
        // await dispatch(fetchFinalCart(cartId));
        await dispatch(fetchCart())
      } catch (error) {
         setQuantity(quantity);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDecreaseQuantity = async (product_id) => {
    if (quantity >= 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity); // Optimistic UI update
      setLoading(true);
      try {
        await dispatch(updateCart({ product_id, item_quantity: newQuantity }));
        await dispatch(fetchCart())
        // await dispatch(fetchFinalCart(cartId));
      } catch (error) {
        setQuantity(quantity); // Revert in case of failure
        console.error("Failed to update quantity", error);
      } finally {
        setLoading(false);
      }
    }
    else{

    }
  }; 
  
  return (
    <>
      <Link to={`/product-detail?product_id=${product?.id}`} className={`${product?.stock <= 0 ? "product-card-link" : ""}`}>
        <div className="product-card border pb-3 d-flex flex-column justify-content-between bg-white">
          <div className="d-flex justify-content-between product-fav">
            <div>
              {/* <span className="product-badge badge bg-yellow fw-500">
              10% off
            </span> */}
            </div>
            <div className="rounded-circle whislist-icon" type="button" onClick={(event) => event.stopPropagation()}>
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite className="text-danger" />}
                checked={checked}
                onChange={handleWishlistChange}
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
          <div className="px-2 px-md-3">
            <h5 className="fb-fs-14 fw-600 masala-con">{product?.name}</h5>
            <h5 className="fb-fs-14 fw-600 text-grey">
              {product?.quantity} 
            </h5>
            <div className="d-flex justify-content-between align-items-center align-items-lg-end mt-3">
              <h6 className="fb-fs-20 fw-bold mb-0 d-inline-flex align-items-center flex-column flex-md-row">
                {product?.max_price !== product?.offer_price && <small className="fw-500 fb-fs-16 text-grey pe-2">
                  <strike>₹ {product?.max_price}</strike>
                </small>}
                <span>₹ {product?.offer_price}</span>
                
              </h6>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                {quantity === 0 ? (
                  (login) ?  <button
                  className="button-primary py-1 rounded fb-fs-14 fw-600"
                  onClick={() => handleIncreaseQuantity(product?.id)}
                // disabled={loading}
                >
                  Add
                </button> : <button
                  className="button-primary py-1 rounded fb-fs-14 fw-600"
                  onClick={toggleWebLogin}
                // disabled={loading}
                >
                  Add
                </button>
                ) : (
                  <div className="product-quantity text-end">
                    <div className="quantity-manage" style={{overflow: "hidden"}}>
                      <button
                        className="quantity-minus border-0 bg-white text-orange fw-600"
                        onClick={() => handleDecreaseQuantity(product?.id)}
                      // disabled={loading || quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-count text-orange fw-600">
                        {quantity}
                      </span>
                      <button
                        className="quantity-plus border-0 bg-white text-orange fw-600"
                        onClick={() => handleIncreaseQuantity(product?.id)}
                      // disabled={loading || quantity === 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <span className="out-of-stock">Sold Out</span>
      </Link>

      <MobileLogin
        otpShow={showWebLogin}
        onOtpClose={toggleWebLogin}
        align="end"
      />
    </>

  );
};

export default ProductCard;
