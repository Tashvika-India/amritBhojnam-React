import React, { useEffect, useState } from "react";
import { Offcanvas, Button, ProgressBar } from "react-bootstrap";
import product from "../../assets/images/web/product-card.png";
import deliveryImg from "../../assets/images/web/product-detail/delivery-img.png";
import { getCartApi, getFinalCartApi, postCartApi } from "../../services/adminApiRoutes";
import { baseURL } from "../../utils/constant-variable";

const MyCartMenu = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [finalCart, setFinalCart] = useState({});

  async function getCartList() {
    setLoading(true);
    try {
      const response = await getCartApi();
      setCartList(response?.data?.items || []);  
      const finalCart = await getFinalCartApi(response?.data?.id);   
      
      setFinalCart(finalCart?.data || {});
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
    }
  }

  // Increase quantity for a specific product
  const increaseQuantity = async (product_id, currentQuantity) => {
    if (currentQuantity >= 10) return;  
    updateCartQuantity(product_id, currentQuantity + 1);
  };

  // Decrease quantity for a specific product
  const decreaseQuantity = async (product_id, currentQuantity) => {
    if (currentQuantity <= 1) return;
    updateCartQuantity(product_id, currentQuantity - 1);
  };

  // Update the cart quantity using the API
  async function updateCartQuantity(product_id, newQuantity) {
    setUpdating(true);
    try {
      await postCartApi({ product_id, item_quantity: newQuantity });
      setCartList(prevList =>
        prevList.map(item =>
          item.product.id === product_id
            ? { ...item, item_quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.log("Error updating cart quantity", error);
    } finally {
      setUpdating(false);
    }
  }

  
  useEffect(() => {
    if (show) {
      getCartList();
    }
  }, [show]);

  return (
    <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: "30%" }}>
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="px-0 pb-0">
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="px-3">
            <div className="mb-4">
              <p className="d-flex">
                <span>
                  <img lazyload="true" className="img-fluid me-3" src={deliveryImg} alt="delivery-img" />
                </span>
                <span className="me-2 mt-2">SPEND</span>
                <strong className="me-2 mt-2">₹100</strong>
                <span className="mt-2">MORE FOR FREE SHIPPING</span>
              </p>
              <ProgressBar variant="yellow" now={80} style={{ height: "5px" }} />
            </div>
            <div className="mb-2 pe-3" style={{ maxHeight: '60dvh', overflowY: 'auto' }}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                cartList.map((item, index) => (
                  <div className="cart-items mb-2" key={index}>
                    <div className="product-item">
                      <img src={baseURL + item?.product?.images[0]?.img_files} className="img-fluid" alt="product" />
                    </div>
                    <div className="product-details w-100 ms-3">
                      <p className="item-name text-black fw-500 mb-0">
                        {item?.product?.name}
                      </p>
                      <p className="item-weight text-grey mb-0 mt-1">{`${item?.product?.quantity} ${item?.product?.quantity_unit}`}</p>
                    </div>
                    <div className="product-quantity text-end">
                      <div className="quantity-manage mb-4">
                        <button
                          className="quantity-minu d-inline-block border-0 bg-white text-orange fw-600"
                          onClick={() => decreaseQuantity(item.product.id, item.item_quantity)}
                          disabled={updating || item.item_quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-count d-inline-block text-orange fw-600">
                          {item?.item_quantity}
                        </span>
                        <button
                          className="quantity-plus d-inline-block border-0 bg-white text-orange fw-600"
                          onClick={() => increaseQuantity(item.product.id, item.item_quantity)}
                          disabled={updating || item.item_quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="ms-2 text-yellow remove-quantity border-0 bg-white text-decoration-underline"
                        onClick={() => setCartList(cartList.filter(cartItem => cartItem.product.id !== item.product.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="total-amount-wrapper product-detail-shadow px-3 py-3">
              <div className="d-flex justify-content-between ">
                <div className="mb-3">
                  <h5>Total Amount:</h5>
                  <p className="text-black fw-normal">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
                <div className="">
                  <h5 className="total-amount d-inline-block text-orange">{`₹${finalCart.total}`}</h5>
                </div>
              </div>
              <button className="button-primary w-100">Checkout</button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MyCartMenu;
