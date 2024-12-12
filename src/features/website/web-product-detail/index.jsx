import React, { useEffect } from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import deliveryImg from "../../../assets/images/web/product-detail/delivery-img.png";
import AsNavFor from "../web-home/components/MultiSlide";
import { ButtonGroup, Nav, Tab, ToggleButton } from "react-bootstrap";
import { getProductApi, postCartApi } from "../../../services/adminApiRoutes";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import MyCartMenu from "../../../components/ui/MyCartMenu";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd } from "../../../redux/slices/cartSlice";

const ProudctDetail = () => {
  const [showCart, setShowCart] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [filters, setFilters] = useURLFilters();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const toggleCart = () => setShowCart(!showCart);
  const [detail, setDetail] = useState({});
  const { cartItems, finalCart, error, cartId } = useSelector(
    (state) => state.cart
  );

  const radios = [
    { name: `${detail?.quantity}${detail?.quantity_unit}`, value: "1" },
  ];
  const dispatch = useDispatch();
  const fetchProductDetail = async () => {
    try {
      const response = await getProductApi(filters);
      const productDetail = response?.data?.results[0] || {};
      setDetail(productDetail);
    } catch (error) {
      console.log("Error on Product Detail", error);
    }
  };

  const addToCart = async (product_id, quantity) => {
    setLoading(true);
    try {
      const response = await postCartApi({
        product_id,
        item_quantity: quantity,
      });
      dispatch(cartAdd(response?.data));
    } catch (error) {
      console.log("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  function checkItemInCart() {
    return cartItems.some((cartItem) => cartItem.product_id === detail?.id);
  }

  useEffect(() => {
    fetchProductDetail();
  }, [showCart]);

  useEffect(() => {
    checkItemInCart();
  }, [cartItems]);

  return (
    <div className="web-wrapper-main">
      <Header />
      <section className="product-detail-page">
        <div className="container fb-container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <AsNavFor data={detail.images} />
            </div>
            <div className="col-lg-6 col-12">
              <div className="product-detail-content ps-4">
                <h4 className="fb-fs-30 fw-bold">{detail?.name}</h4>
                <div className="d-flex mb-4 mt-4">
                  <Rating
                    className="me-3"
                    value={Math.round(detail?.ratings)} // Rounds the ratings value to the nearest integer
                    onChange={(e) => setRating(Math.round(e.ratings))}
                    cancel={false}
                  />
                  <p className="text-mid-grey">
                    ({Math.round(detail?.ratings)} Reviews)
                  </p>
                </div>

                <p>{detail?.short_description}</p>
                <div className="d-flex mt-4 mb-3">
                  <p className="fw-600 pt-2">Size / Weight:</p>
                  <ButtonGroup className="weight-check ms-3">
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? "bg-orange" : "bg-orange"}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
                <p className="fb-fs-40 text-orange fw-bold original-price">
                  ₹{detail?.offer_price}
                  <small className="fw-500 fb-fs-30 text-grey ms-3">
                    <strike>₹{detail?.max_price}</strike>
                  </small>
                </p>
                <p style={{ fontSize: "0.875rem" }} className="fw-500">
                  (Inclusive of all taxes)
                </p>
                <div>
                  {!checkItemInCart() ? (
                    <button
                      className="button-primary mt-4 fb-fs-18"
                      onClick={() => addToCart(detail?.id, quantity || 1)}
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add to Cart"}
                    </button>
                  ) : (
                    <>
                      <button
                        className="button-primary mt-4 fb-fs-18"
                        onClick={toggleCart}
                      >
                        Go to Cart
                      </button>
                      <MyCartMenu show={showCart} onClose={toggleCart} />
                    </>
                  )}
                </div>
                {/* <div className="mt-5">
                  <p className="fw-600">Check Availability</p>
                  <div
                    className="border-gray border-raidus-10 mt-2 input-box"
                    style={{ width: "60%" }}
                  >
                    <div className="input-group mb-2 mt-2 ">
                      <input
                        type="text"
                        className="form-control border-0 box-shadow-0"
                        placeholder="Enter Pincode"
                        aria-label="Enter Pincode"
                        aria-describedby="basic-addon2"
                      />
                      <span
                        className="input-group-text border-0 text-orange fw-600  bg-transparent border-start border-2 ps-4 me-3"
                        id="basic-addon2"
                      >
                        CHECK
                      </span>
                    </div>
                  </div>
                </div> */}
                {/* <p className="d-flex fb-fs-18 fw-500 my-3">
                  <span>
                    <img
                      className="img-fluid"
                      src={deliveryImg}
                      alt="delivery-img"
                    />
                  </span>
                  <span className="text-orange me-2 ms-2 mt-1">Get it by</span>
                  <span className="mt-1">Monday, 16 Sep</span>
                </p> */}
                <div className="d-flex mt-4  ms-4 ">
                  <ul className="me-5 pe-4 disc-style w-50">
                    <li className="my-2">Type:{detail?.product_type}</li>
                    <li className="my-2">MFG: {detail?.mfg_date}</li>
                    <li className="my-2">LIFE:{detail?.days}</li>
                  </ul>
                  <ul className="me-5 pe-4 disc-style w-50">
                    <li className="my-2">SKU: FWM15VKT</li>
                    <li className="my-2">Tags:{detail?.tags}</li>
                    <li className="my-2">
                      Stock: {detail?.quantity} Items In Stock
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row ms-1 mt-5 description-slider">
            <div
              className="card tabs-slider ms-5 mt-4"
              style={{ border: "1px solid #E1E1E1" }}
            >
              <div className="container fb-container">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey="Description"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <Nav
                        variant="pills"
                        className="flex-row tab-nav-wrapper my-5 px-4"
                      >
                        <Nav.Item className="nav">
                          <Nav.Link
                            as="button"
                            className="fb-fs-18 btn-tab"
                            eventKey="Description"
                          >
                            Description
                          </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                          <Nav.Link
                            as="button"
                            className="fb-fs-18 btn-tab"
                            eventKey="Additional Info"
                          >
                            Additional Info
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            as="button"
                            className="fb-fs-18 btn-tab"
                            eventKey="Reviews(12)"
                          >
                            Reviews(12)
                          </Nav.Link>
                        </Nav.Item> */}
                      </Nav>
                    </div>
                    <div className="col-md-12">
                      <Tab.Content className="px-4 pb-4">
                        <Tab.Pane eventKey="Description">
                          <p className="mb-4">{detail?.long_description}</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Additional Info">
                          Second tab content
                        </Tab.Pane>
                        <Tab.Pane eventKey="Reviews(12)">
                          Second tab content
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProudctDetail;
