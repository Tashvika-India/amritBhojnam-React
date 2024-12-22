import React, { useEffect } from "react";
import { Offcanvas, Button, ProgressBar } from "react-bootstrap";
import product from "../../assets/images/web/product-card.png";
import deliveryImg from "../../assets/images/web/product-detail/delivery-img.png";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { fetchCart, fetchFinalCart, removeCart, updateCart } from "../../redux/slices/cartSlice";
import { baseURL } from "../../utils/constant-variable";

const MyCartMenu = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, finalCart, loading, error  , cartId} = useSelector((state) => state.cart);


  const handleUpdateCart = (product_id, newQuantity) => {
    dispatch(updateCart({ product_id, item_quantity: newQuantity }));
  };

  const handleIncreaseQuantity = (product_id, currentQuantity) => {
    if (currentQuantity < 10) {
      handleUpdateCart(product_id, currentQuantity + 1);
      dispatch(fetchFinalCart(cartId));
    }
  };

  const handleDecreaseQuantity = (product_id, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    handleUpdateCart(product_id, Math.max(newQuantity, 0));
    dispatch(fetchFinalCart(cartId)); 
  }; 

  const handleRemoveQuantity = (product_id) => {
    dispatch(removeCart(product_id)); 
    handleUpdateCart(product_id, 0);
    dispatch(fetchFinalCart(cartId)); 
  }; 

  useEffect(() => {
    if (show) {
      dispatch(fetchCart());
    }
  }, [show, dispatch]);

  useEffect(() => {
    if (cartId) {
      dispatch(fetchFinalCart(cartId));
    }
  }, [show, dispatch, cartId]); 

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" className="cart-offcanvas" style={{ width: "30%" }}>
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="px-0 pb-0">
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            {/* <div className="mb-4 px-3">
              <p className="d-flex">
                <span>
                  <img lazyload="true" className="img-fluid me-3" src={deliveryImg} alt="delivery-img" />
                </span>
                <span className="me-2 mt-2">SPEND</span>
                <strong className="me-2 mt-2">₹100</strong>
                <span className="mt-2">MORE FOR FREE SHIPPING</span>
              </p>
              <ProgressBar variant="yellow" now={80} style={{ height: "5px" }} />
            </div> */}
            <div className="mb-2 px-3" style={{ maxHeight: "60dvh", overflowY: "auto" }}>
              { cartItems?.length > 0 ? (
                cartItems?.map((item) => (
                  <div className="cart-items mb-2" key={item?.product.id}>
                    <div className="product-item p-1">
                      <img
                        src={item?.product?.images[0]?.image || product}
                        className="img-fluid" 
                        alt={item?.product?.name}
                      />
                    </div>
                    <div className="product-details w-100 ms-3">
                      <p className="item-name text-black fw-500 mb-0">{item?.product?.name}</p>
                      <p className="item-weight text-grey mb-0 mt-1">{`${item?.product?.quantity} ${item?.product?.quantity_unit}`}</p>
                      <p className="item-weight mb-0 mt-1">{`₹ ${Math.trunc(item?.price)} X ${item?.item_quantity}`}</p>
                    </div>
                    <div className="product-quantity text-end">
                      <div className="quantity-manage mb-lg-4 mb-1">
                        <button
                          className="quantity-minu d-inline-block border-0 bg-white text-orange fw-600"
                          onClick={() => handleDecreaseQuantity(item?.product.id, item?.item_quantity)}
                          disabled={item?.item_quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-count d-inline-block text-orange fw-600">{item?.item_quantity}</span>
                        <button
                          className="quantity-plus d-inline-block border-0 bg-white text-orange fw-600"
                          onClick={() => handleIncreaseQuantity(item?.product.id, item?.item_quantity)}
                          disabled={item?.item_quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="ms-2 text-yellow remove-quantity border-0 bg-white text-decoration-underline"
                        onClick={() => handleRemoveQuantity(item?.product.id, 0)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <h4 className="text-muted mb-4">Your cart is empty!</h4>
                  <Link className="button-primary fs-6" to="/products">
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div
            className="total-amount-wrapper p-3"
            style={{ boxShadow: "0px -4px 30px 0px rgba(0, 0, 0, 0.07)" }}
          >
            <div className="d-flex justify-content-between ">
              <div className="mb-3">
                <h5>Total Amount:</h5>
                <p className="text-black fw-normal mb-0 checkout-content">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              <div className="">
                <h5 className="total-amount d-inline-block text-orange">
                  {finalCart?.total ? `₹ ${finalCart.total}` : "₹0"}
                </h5>
              </div>
            </div>
            <Link to="/checkout" className="button-primary w-100 d-block text-center">
              Checkout
            </Link>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MyCartMenu;
