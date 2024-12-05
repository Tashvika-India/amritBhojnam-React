import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import fireImg from "../../../../assets/images/web/Fire.png";
import { Link } from "react-router-dom";
import { baseURL } from "../../../../utils/constant-variable";
import { postCartApi, postWishlist } from "../../../../services/adminApiRoutes";
import { useDispatch } from "react-redux";
import { updateWishlist } from "../../../../redux/slices/wishlistSlice";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [checked, setChecked] = useState(product?.is_wishlist || false);
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(10, prev + 1));
  };

  const handleClick = () => {
    setQuantity(1);
  };

  const handleChange = async () => {
    const updatedChecked = !checked;
    setChecked(updatedChecked); // Update UI immediately
    const data = { product_id: product?.id, action: updatedChecked };

    // try {
    //   await postWishlist(data);
    // } catch (error) {
    //   console.error("Error updating wishlist:", error);
    //   setChecked(!updatedChecked); // Revert state on error
    // }
    dispatch(updateWishlist(data));
  };

  async function addToCart(product_id, quantity) {
    setLoading(true);
    try {
      await postCartApi({
        product_id,
        item_quantity: quantity,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (quantity > 0) {
      addToCart(product?.id, quantity);
    }
  }, [quantity]);

  return (
    <div className="product-card border pb-3 d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between product-fav">
        <div>
          <span className="product-badge badge bg-yellow fw-500">10% off</span>
        </div>
        <div className="bg-white rounded-circle whislist-icon">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite className="text-danger" />}
            checked={checked} // Local state for real-time UI update
            onChange={handleChange}
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
          src={baseURL + product?.images[0]?.img_files}
          alt="product"
        />
      </div>
      <div className="px-3">
        <Link to={`/product-detail?product_id=${product?.id}`}>
          <h5 className="fb-fs-14 fw-600 masala-con">{product?.name}</h5>
        </Link>
        <h5 className="fb-fs-14 fw-600 text-grey">
          {product?.quantity}
          {product?.quantity_unit}
        </h5>
        <div className="d-flex justify-content-between align-items-end mt-3">
          <h6 className="fb-fs-20 fw-bold mb-0">
            <small className="fw-500 fb-fs-16 text-grey pe-2">
              <strike>₹ {product?.max_price}</strike>
            </small>
            ₹ {product?.offer_price}
          </h6>
          {/* <div>
            {quantity === 0 ? (
              <button
                className="button-primary py-1 rounded fb-fs-14 fw-600"
                onClick={handleClick}
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
