import React, { useEffect } from "react";
import { Offcanvas, Button, ProgressBar } from "react-bootstrap";
import product from "../../assets/images/web/product-card.png";
import deliveryImg from "../../assets/images/web/product-detail/delivery-img.png";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { fetchCart, fetchFinalCart, removeCart, updateCart } from "../../redux/slices/cartSlice";
import { fetchProductList } from "../../redux/slices/productSlice";
import useURLFilters from "../../custom-compoents/useURLFilters";
import emptyCart from "../../assets/images/web/empty-cart.png";

const MyCartMenu = ({ showCart, onCloseCart }) => {
  const dispatch = useDispatch();
  const [filters] = useURLFilters();
  const { cartItems, finalCart, cartId, loading } = useSelector((state) => state.cart);

  const handleUpdateCart = (product_id, newQuantity, option_id) => {
    dispatch(updateCart({ product_id, item_quantity: newQuantity, option_id }));
    dispatch(fetchProductList(filters));
  };

  const handleIncreaseQuantity = (product_id, currentQuantity, option_id) => {
    if (currentQuantity < 10) {
      handleUpdateCart(product_id, currentQuantity + 1, option_id);
      dispatch(fetchFinalCart({ cartId }));
    }
  };

  const handleDecreaseQuantity = (product_id, currentQuantity, option_id) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      handleUpdateCart(product_id, newQuantity, option_id);
    } else {
      handleRemoveQuantity(product_id, option_id);
    }
    dispatch(fetchFinalCart({ cartId }));
  };

  const handleRemoveQuantity = (product_id, option_id) => {
    dispatch(removeCart(product_id));
    dispatch(fetchFinalCart({ cartId }));
  };

  useEffect(() => {
    if (showCart) {
      dispatch(fetchCart());
    }
  }, [showCart, dispatch]);

  useEffect(() => {
    if (cartId) {
      dispatch(fetchFinalCart({ cartId }));
    }
  }, [showCart, dispatch, cartId]);

  return (
    <Offcanvas show={showCart} onHide={onCloseCart} placement="end" className="cart-offcanvas" style={{ width: "29.5%" }}>
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="px-0 pb-0">
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="mb-2 cart-items-contianer px-md-4 px-3">
            {loading ? (
              <div className="prefetch-loading">
                {cartItems.map((_, index) => (
                  <div key={index} className="cart-item-placeholder mb-3">
                    <div className="product-item-placeholder p-1" />
                    <div className="product-details-placeholder ms-3">
                      <div className="placeholder-line w-50 mb-2" />
                      <div className="placeholder-line w-75 mb-2" />
                      <div className="placeholder-line w-50" />
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems?.length > 0 ? (
              cartItems.map((item) => (
                <div className="cart-items mb-3" key={item?.product.id}>
                  <div className="product-item p-1 align-self-start">
                    <img src={item?.product?.images[0]?.image || product} className="img-fluid h-auto" alt={item?.product?.name} />
                  </div>
                  <div className="product-details w-100 ms-3">
                    <p className="item-name text-black fw-500 mb-0 me-2 me-md-0">{item?.product?.name}</p>
                    <p className="item-weight fw-400 text-grey mb-0 mt-1">{`${item?.option} ${item?.measurement_unit}`}</p>
                    <p className="item-weight mb-0 mt-1">{`₹ ${~~item?.price} X ${item?.item_quantity}`}</p>
                  </div>
                  <div className="product-quantity text-end">
                    <div className="quantity-manage gap-1 mb-lg-2 mb-1" style={{ overflow: "hidden", width: "5rem" }}>
                      <button
                        className="quantity-minus d-inline-block border-0 bg-white text-orange fw-600"
                        onClick={() => handleDecreaseQuantity(item?.product.id, item?.item_quantity, item?.option_id)}
                        disabled={item?.item_quantity <= 1}
                      >
                        -
                      </button>
                      <button className="quantity-count d-inline-block border-0 bg-white text-orange fw-600">{item?.item_quantity}</button>
                      <button
                        className="quantity-plus d-inline-block border-0 bg-white text-orange fw-600"
                        onClick={() => handleIncreaseQuantity(item?.product.id, item?.item_quantity, item?.option_id)}
                        disabled={item?.item_quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ms-2 text-yellow remove-quantity border-0 bg-white text-decoration-underline"
                      style={{ cursor: "pointer", fontSize: "0.8313rem" }}
                      onClick={() => handleRemoveQuantity(item?.product.id, item?.option_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <img src={emptyCart} alt="empty-cart" className="img-fluid mx-auto empty-cart-image" />
                <h4 className="text-black">Your Cart is Empty!</h4>
                <p className="text-muted text-balance mb-4">Looks like you haven’t added anything to your cart yet</p>
                <Link className="button-primary fs-6 d-inline-block fw-normal" to="/products">
                  Browse Products
                </Link>
              </div>
            )}
          </div>
          {cartItems?.length > 0 && (
            <div className="total-amount-wrapper py-3 px-md-4 px-3" style={{ boxShadow: "0px -4px 30px 0px rgba(0, 0, 0, 0.07)" }}>
              <div className="d-flex justify-content-between ">
                <div className="mb-3">
                  <h5>Total Amount:</h5>
                  <p className="text-black fw-normal mb-0 checkout-content">Taxes and shipping calculated at checkout</p>
                </div>
                <div>
                  <h5 className="total-amount d-inline-block text-orange">{finalCart?.total ? `₹ ${finalCart.total}` : "₹0"}</h5>
                </div>
              </div>
              <Link to="/checkout" className="button-primary w-100 d-block text-center">
                Checkout
              </Link>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MyCartMenu;
