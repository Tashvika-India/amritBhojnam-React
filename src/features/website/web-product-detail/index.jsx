import React from "react";
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
import { Nav, Tab } from "react-bootstrap";

const ProudctDetail = () => {
  const [value, setValue] = useState(3.5);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [selectedOption, setSelectedOption] = useState("option2");
  return (
    <div className="web-wrapper-main">
      <Header />
      <section className="product-detail-page">
        <div className="container fb-container">
          <div className="row">
            <div className="col-md-6">
              <AsNavFor />
            </div>
            <div className="col-md-6">
              <div className="product-detail-content ps-4">
                <div className="d-flex justify-content-between">
                  <p className="fb-fs-18 fw-600 d-flex text-brown">
                    <span>
                      <img className="img-fluid mt-1 me-2" src={fireImg} alt="fire" />
                    </span>{" "}
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
                  Masala Millet (Veggie Masala)
                </h4>
                <div className="d-flex mb-4 mt-4">
                  <Rating
                    className="me-3"
                    value={value}
                    onChange={(e) => setValue(e.value)}
                    cancel={false}
                  />
                  <p className="text-mid-grey">(12 reviews)</p>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever s
                </p>
                <div className="d-flex mt-4 mb-3">
                  <p className="fw-600 pt-2">Size / Weight:</p>
                  <div className="bd-example m-0 border-0">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base"
                      id="option5"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label className="btn ms-3 me-2 text-grey" htmlFor="option5">
                      60gm
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base"
                      id="option6"
                      autoComplete="off" checked
                    />
                    <label className="button-primary me-2" htmlFor="option6" style={{padding: "0.3125rem 0.75rem"}}>
                      80gm
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base"
                      id="option9"
                      autoComplete="off"
                    />
                    <label className="btn text-grey" htmlFor="option9" >
                      100gm
                    </label>
                  </div>
                </div>
                <p className="fb-fs-40 text-orange fw-bold">
                  ₹80
                  <small className="fw-500 fb-fs-30 text-grey ms-3">
                    <strike>₹90</strike>{" "}
                  </small>{" "}
                </p>
                <p style={{ fontSize: "0.875rem" }} className="fw-500">
                  (Inclusive of all taxes)
                </p>
                <div>
                  <button className="button-primary mt-4 fb-fs-18">
                    Add to Cart
                  </button>
                </div>
                <div className="mt-5">
                  <p className="fw-600">Check Availability</p>
                  <div
                    className="border-gray border-raidus-10 mt-2"
                    style={{ width: "60%" }}
                  >
                    <div className="input-group mb-2 mt-2">
                      <input
                        type="text"
                        className="form-control border-0 box-shadow-0"
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
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
                <div class="d-flex mt-4">
                  <ul className="me-5 pe-4">
                    <li className="my-2">Type: Organic</li>
                    <li className="my-2">MFG: Jun 4.2024</li>
                    <li className="my-2">LIFE: 70 days</li>
                  </ul>
                  <ul className="me-5 pe-4">
                    <li className="my-2">SKU: FWM15VKT</li>
                    <li className="my-2">Tags: Snack, Organic, Brown</li>
                    <li className="my-2">Stock: 8 Items In Stock</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row ms-1 mt-5">
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
                            Uninhibited carnally hired played in whimpered dear
                            gorilla koala depending and much yikes off far
                            quetzal goodness and from for grimaced goodness
                            unaccountably and meadowlark near unblushingly
                            crucial scallop tightly neurotic hungrily some and
                            dear furiously this apart.
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
                          <ul className="mb-4">
                            <li>Type Of Packing Bottle</li>
                            <li>Color Green, Pink, Powder Blue, Purple</li>
                            <li>Quantity Per Case100ml</li>
                            <li>Ethyl Alcohol70%</li>
                            <li>Piece In OneCarton</li>
                          </ul>
                          <h6 className="mb-4">Suggested Use</h6>
                          <ul className="mb-4">
                            <li>Refrigeration not necessary.</li>
                            <li>Stir before serving</li>
                          </ul>
                          <h6 className="mb-4">Other Ingredients</h6>
                          <ul className="mb-4">
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
                          <ul className="mb-4">
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
