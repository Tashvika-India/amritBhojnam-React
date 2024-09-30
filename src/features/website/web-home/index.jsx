import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Nav, Tab } from "react-bootstrap";
import bannerAds from "../../../assets/images/web/banner-ads.png";
import bannerAdsmob from "../../../assets/images/web/banner-ads-mob.png";

const HomePage = () => {
  return (
    <div className="web-wrapper-main">
      <Header />
      <section>
        <div className="container fb-container">
          <div className="cat-items-wrapper">
            <div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #FFB7B7 0%, #FFE0E0 100%)",
                }}
              >
                <img
                  className="img-fluid"
                  src="https://picsum.photos/200/300"
                  alt="millet-rice"
                />
              </div>
              <h6 className="fb-fs-16 fw-500">Millet Rice</h6>
            </div>
            <div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #96D7FF 0%, #D7F0FF 100%)",
                }}
              >
                <img
                  className="img-fluid"
                  src="https://picsum.photos/200/300"
                  alt="millet-rice"
                />
              </div>
              <h6 className="fb-fs-16 fw-500">Bakery & Confectionery</h6>
            </div>
            <div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #FFCC8F 0%, #FFE9CF 100%)",
                }}
              >
                <img
                  className="img-fluid"
                  src="https://picsum.photos/200/300"
                  alt="millet-rice"
                />
              </div>
              <h6 className="fb-fs-16 fw-500">Flour</h6>
            </div>
            <div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    " linear-gradient(180deg, #C2FFBD 0%, #EFFFEE 100%)",
                }}
              >
                <img
                  className="img-fluid"
                  src="https://picsum.photos/200/300"
                  alt="millet-rice"
                />
              </div>
              <h6 className="fb-fs-16 fw-500">Beverages</h6>
            </div>
            <div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #F6D4FF 0%, #FBECFF 100%)",
                }}
              >
                <img
                  className="img-fluid"
                  src="https://picsum.photos/200/300"
                  alt="millet-rice"
                />
              </div>
              <h6 className="fb-fs-16 fw-500">Snacks & Munching Rice</h6>
            </div>
            <div className="cat-itmes">
              <div
                className="item-image"
                style={{
                  "--linear":
                    "linear-gradient(180deg, #C3CCFF 0%, #E0E5FF 100%)",
                }}
              >
                <img
                  className="img-fluid"
                  src="https://picsum.photos/200/300"
                  alt="millet-rice"
                />
              </div>
              <h6 className="fb-fs-16 fw-500">Instant Mixes</h6>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container fb-container">
          <Tab.Container id="left-tabs-example" defaultActiveKey="All">
            <div className="row">
              <div className="col-md-6">
                <h3 className="fw-bold">Our Best Selling Products</h3>
              </div>
              <div className="col-md-6">
                <Nav
                  variant="pills"
                  className="flex-row justify-content-end tab-nav-wrapper"
                >
                  <Nav.Item className="nav">
                    <Nav.Link className="fb-fs-18" eventKey="All">
                      All
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18" eventKey="Snacks">
                      Snacks
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18" eventKey="Instant-Mix">
                      Instant Mix
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18" eventKey="Flour">
                      Flour
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="fb-fs-18" eventKey="Rice">
                      Rice
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="col-md-12">
                <Tab.Content>
                  <Tab.Pane eventKey="All">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="product-card border p-3">
                          <span className="product-badge badge bg-yellow fw-400">
                            10% off
                          </span>
                          <span className="product-fav"></span>
                          <div className="">
                            <img
                              className="img-fluid"
                              src="https://picsum.photos/200/300"
                              alt="product"
                            />
                          </div>
                          <h6 className="fb-fs-12 fw-500">
                            <span></span> 80 Calories
                          </h6>
                          <h5 className="fb-fs-14 fw-600">
                            Masala Millet (Veggie Masala)
                          </h5>
                          <h5 className="fb-fs-14 fw-600">100 g</h5>
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fb-fs-20 fw-bold mb-0">
                              <small className="fw-500 fb-fs-16">
                                <strike>₹80</strike>{" "}
                              </small>{" "}
                              ₹70
                            </h6>
                            <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="Snacks">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="Instant-Mix">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="Flour">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="Rice">Second tab content</Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        </div>
      </section>
      <section className="offer-cards">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="protein-left">
                <div className="left-content p-5">
                  <h4 className="fw-700 mb-lg-3">
                    Upto 40% Off on special Items
                  </h4>
                  <p className="fw-500">
                    Millets are packed with essential nutrients, including
                    fiber, protein, vitamins, and minerals, offering
                  </p>
                </div>
                <button className="button-primary ms-5  mb-4 text-center">
                  Shop Now
                </button>
                {/* <img src={protein1} alt="millet-rice" /> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div class="col-md-12 mb-lg-4">
                  <div class="protein-right-top">
                    <div className="right-top-content p-5 pb-4">
                      <h4 className="fw-700 mb-3">Upto 40% Off </h4>
                      <p className="fw-500">
                        As naturally gluten-free grains, millets provide a great
                        alternative for those with gluten sensitivities
                      </p>
                    </div>
                    <button className="button-primary mt-0 m-5 text-center">
                      Shop Now
                    </button>
                  </div>
                </div>
                <div class="col-md-12 mt-lg-4">
                  <div class="protein-right-bottom">
                    <div className="right-bottom-content p-5 pb-4">
                      <h4 className="fw-700 mb-3">Upto 40% Off </h4>
                      <p className="fw-500">
                        With a low glycemic index, millets help regulate blood
                        sugar levels, making them ideal.
                      </p>
                    </div>
                    <button className="button-primary  mt-0 m-5 text-center">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="banner-ads">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-0">
              <div className="image-sec">
                <img class="d-lg-block d-md-block d-none desktop-ban" src={bannerAds} alt="banner-ads"/>
                <img class="d-lg-none d-md-none d-block mn-1 mobile-ban" style={{marginBottom: "-3px"}} src={bannerAdsmob} alt="banner-ads"/>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="content-sec">
                <h2 className="pb-3">
                  Good For <span> You <br></br> and the Planet</span>
                </h2>
                <p className="pb-5">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer 
                </p>
                <button className="button-white rounded-3">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="banner-ads d-grid bg-$dark-brown">
          <div className="image-sec">
            <img src={bannerAds} alt="millet-rice" />
          </div>
          <div className="content-sec">
            <h2>
              Good For <span> You and the Planet</span>
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer 
            </p>
          </div>
        </div> */}
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
