import React, { useEffect } from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import fireImg from "../../../assets/images/web/Fire.png";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import deliveryImg from "../../../assets/images/web/product-detail/delivery-img.png";
import AsNavFor from "../web-home/components/MultiSlide";
import { ButtonGroup, Nav, Tab, ToggleButton } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCartApi, getProductApi, postCartApi } from "../../../services/adminApiRoutes";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import MyCartMenu from "../../../components/ui/MyCartMenu";

const ProudctDetail = () => {
  const [rating, setRating] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [selectedOption, setSelectedOption] = useState("option2");
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [filters, setFilters] = useURLFilters()
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const toggleCart = () => setShowCart(!showCart);
  const [detail, setDetail] = useState({});

  const radios = [{ name: `${detail?.quantity}${detail?.quantity_unit}`, value: '1' }];

  const fetchProductDetail = async () => {
    try {
      const response = await getProductApi(filters);
      const productDetail = response?.data?.results[0] || {};
      setDetail(productDetail);
    } catch (error) {
      console.log("Error on Product Detail", error);
    }
  };

  const handleClick = () => {
    if (quantity === 0) {
      setQuantity(1);
    }
  };

  const addToCart = async (product_id, quantity) => {
    setLoading(true);
    try {
      const response = await postCartApi({
        product_id,
        item_quantity: quantity,
      });
    } catch (error) {
      console.log("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (quantity > 0) {
      addToCart(detail?.id, quantity);
    }
  }, [quantity]);

  useEffect(() => {
    fetchProductDetail();
  }, []);




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
                <div className="d-flex justify-content-between">
                  <p className="fb-fs-18 fw-600 d-flex text-brown">
                    <span>
                      <img
                        className="img-fluid mt-1 me-2"
                        src={fireImg}
                        alt="fire"
                      />
                    </span>
                    80 Calories
                  </p>
                  <div>
                    <Checkbox
                      {...label}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      style={{ color: "#F26722" }}
                    />
                    <ShareIcon style={{ color: "#F26722" }} className="ms-2" />
                  </div>
                </div>
                <h4 className="fb-fs-30 fw-bold">
                  {detail?.name}
                </h4>
                <div className="d-flex mb-4 mt-4">
                  <Rating
                    className="me-3"
                    value={detail?.ratings}
                    onChange={(e) => setRating(e.ratings)}
                    cancel={false}
                  />
                  <p className="text-mid-grey">(12 reviews)</p>
                </div>
                <p>
                  {detail?.short_description}
                </p>
                <div className="d-flex mt-4 mb-3">
                  <p className="fw-600 pt-2">Size / Weight:</p>
                  <ButtonGroup className="weight-check ms-3">
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'bg-orange' : 'bg-orange'}
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
                  {quantity === 0 ? (
                    <button className="button-primary mt-4 fb-fs-18" onClick={() => handleClick()}>
                      Add to Cart
                    </button>) : (
                    <>
                      <button className="button-primary mt-4 fb-fs-18"  onClick={toggleCart}>
                        Checkout Cart
                      </button>
                      <MyCartMenu show={showCart} onClose={toggleCart} />
                    </> )
                  }
                </div>
                <div className="mt-5">
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
                </div>
                <p className="d-flex fb-fs-18 fw-500 my-3">
                  <span>
                    <img
                      className="img-fluid"
                      src={deliveryImg}
                      alt="delivery-img"
                    />
                  </span>
                  <span className="text-orange me-2 ms-2 mt-1">Get it by</span>
                  <span className="mt-1">Monday, 16 Sep</span>
                </p>
                <div className="d-flex mt-4  ms-4 ">
                  <ul className="me-5 pe-4 disc-style w-50">
                    <li className="my-2">Type:{detail?.product_type}</li>
                    <li className="my-2">MFG: {detail?.mfg_date}</li>
                    <li className="my-2">LIFE:{detail?.days}</li>
                  </ul>
                  <ul className="me-5 pe-4 disc-style w-50">
                    <li className="my-2">SKU: FWM15VKT</li>
                    <li className="my-2">Tags:{detail?.tags}</li>
                    <li className="my-2">Stock: {detail?.quantity} Items In Stock</li>
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
                        <Nav.Item>
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
                        </Nav.Item>
                      </Nav>
                    </div>
                    <div className="col-md-12">
                      <Tab.Content className="px-4 pb-4">
                        <Tab.Pane eventKey="Description">
                          <p className="mb-4">
                            {
                              detail?.long_description
                            }
                          </p>
                          <p className="mb-4">
                            Spluttered narrowly yikes left moth in yikes bowed
                            this that grizzly much hello on spoon-fed that alas
                            rethought much decently richly and wow against the
                            frequent fluidly at formidable acceptably flapped
                            besides and much circa far over the bucolically hey
                            precarious goldfinch mastodon goodness gnashed a
                            jellyfish and one however because.
                          </p>
                          <ul className="mb-4 disc-style ms-4">
                            <li>Type Of Packing Bottle</li>
                            <li>Color Green, Pink, Powder Blue, Purple</li>
                            <li>Quantity Per Case100ml</li>
                            <li>Ethyl Alcohol70%</li>
                            <li>Piece In OneCarton</li>
                          </ul>
                          <p className="mb-5 pb-md-4">
                            Laconic overheard dear woodchuck wow this
                            outrageously taut beaver hey hello far meadowlark
                            imitatively egregiously hugged that yikes minimally
                            unanimous pouted flirtatiously as beaver beheld
                            above forward energetic across this jeepers
                            beneficently cockily less a the raucously that magic
                            upheld far so the this where crud then below after
                            jeez enchanting drunkenly more much wow callously
                            irrespective limpet.
                          </p>
                          <h6 className="mb-4">Suggested Use</h6>
                          <ul className="mb-4 disc-style ms-4">
                            <li>Refrigeration not necessary.</li>
                            <li>Stir before serving</li>
                          </ul>
                          <h6 className="mb-4">Other Ingredients</h6>
                          <ul className="mb-4 disc-style ms-4">
                            <li>Organic raw pecans, organic raw cashews.</li>
                            <li>
                              This butter was produced using a LTG (Low
                              Temperature Grinding) process
                            </li>
                            <li>
                              Made in machinery that processes tree nuts but
                              does not process peanuts, gluten, dairy or soy
                            </li>
                          </ul>

                          <h6 className="mb-4">Warnings</h6>
                          <ul className="mb-4 disc-style ms-4">
                            <li>Oil separation occurs naturally. May contain pieces of shell.</li>
                          </ul>
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
