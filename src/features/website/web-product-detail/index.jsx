import React, { useEffect } from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import deliveryImg from "../../../assets/images/web/product-detail/delivery-img.png";
import AsNavFor from "../web-home/components/MultiSlide";
import { ButtonGroup, Nav, Tab, ToggleButton } from "react-bootstrap";
import {
  getProductApi,
  getRatingApi,
  getYouMayAlsoLikeApi,
  postCartApi,
} from "../../../services/adminApiRoutes";
import pp from "../../../assets/images/web/account/profile-picture.png";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import MyCartMenu from "../../../components/ui/MyCartMenu";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd } from "../../../redux/slices/cartSlice";
import Loading from "../../../components/ui/Loading";
import ProductCard from "../web-home/components/ProductCard";
import fireImg from "../../../assets/images/web/Fire.png";
import recipeImg from "../../../assets/images/web/recipe-image.png";
import { Button, Checkbox, Menu, MenuItem, TextField } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import MobileLogin from "../../../components/ui/MobileLogin";
import { MdKeyboardArrowRight } from "react-icons/md";
import { baseURL } from "../../../utils/constant-variable";
import { updateWishlist } from "../../../redux/slices/wishlistSlice";
import {
  notifyError,
  notifySuccess,
} from "../../../components/ui/Notification";
import { Link } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import RatingBar from "./components/RatingProgress";

const ProudctDetail = () => {
  const [showCart, setShowCart] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const [filters, setFilters] = useURLFilters();
  const [showWebLogin, setShowWebLogin] = useState(false);
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const toggleCart = () => setShowCart(!showCart);
  const [detail, setDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const dispatch = useDispatch();

  const truncateToWords = (text, limit) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  const { cartItems, finalCart, error, cartId } = useSelector(
    (state) => state.cart
  );

  const reviewList = async () => {
    setLoading(true);
    try {
      const response = await getRatingApi(filters?.product_id);
      setReviews(response?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product review data:", error);
    }
  };

  useEffect(() => {
    reviewList();
  }, []);

  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  const delhiPincodes = [
    "110001",
    "110002",
    "110003",
    "110004",
    "110005",
    "110006",
    "110007",
    "110008",
    "110009",
    "110010",
    "110011",
    "110012",
    "110013",
    "110014",
    "110015",
    "110016",
    "110017",
    "110018",
    "110019",
    "110020",
    "110021",
    "110022",
    "110023",
    "110024",
    "110025",
    "110026",
    "110027",
    "110028",
    "110029",
    "110030",
    "110031",
    "110032",
    "110033",
    "110034",
    "110035",
    "110036",
    "110037",
    "110038",
    "110039",
    "110040",
    "110041",
    "110042",
    "110043",
    "110044",
    "110045",
    "110046",
    "110047",
    "110048",
    "110049",
    "110050",
    "110051",
    "110052",
    "110053",
    "110054",
    "110055",
    "110056",
    "110057",
    "110058",
    "110059",
    "110060",
    "110061",
    "110062",
    "110063",
    "110064",
    "110065",
    "110066",
    "110067",
    "110068",
    "110069",
    "110070",
    "110071",
    "110072",
    "110073",
    "110074",
    "110075",
    "110076",
    "110077",
    "110078",
    "110079",
    "110080",
    "110081",
    "110082",
    "110083",
    "110084",
    "110085",
    "110086",
    "110087",
    "110088",
    "110089",
    "110090",
    "110091",
    "110092",
    "110093",
    "110094",
    "110095",
    "110096",
  ];
  const gurugramPincodes = [
    "122001",
    "122002",
    "122003",
    "122004",
    "122005",
    "122006",
    "122007",
    "122008",
    "122009",
    "122010",
    "122011",
    "122012",
    "122013",
    "122014",
    "122015",
    "122016",
    "122017",
    "122018",
    "122019",
    "122020",
    "122021",
    "122022",
    "122023",
    "122024",
    "122025",
    "122026",
    "122027",
  ];
  const noidaPincodes = [
    "201301",
    "201302",
    "201303",
    "201304",
    "201305",
    "201306",
    "201307",
    "201308",
    "201309",
    "201310",
    "201311",
  ];

  const combinedPincodes = Array.from(
    new Set([...delhiPincodes, ...gurugramPincodes, ...noidaPincodes])
  );

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      if (combinedPincodes.includes(pincode)) {
        setMessage("Delivery is available for your pincode.");
      } else {
        setMessage("Delivery is not available for your pincode.");
      }
    } else {
      setMessage("Please enter a valid 6-digit pincode.");
    }
  };

  const radios = [{ name: `${detail?.quantity}`, value: "1" }];

  const fetchProductDetail = async () => {
    try {
      const response = await getProductApi(filters);
      const productDetail = response?.data?.results[0] || {};
      setDetail(productDetail);
    } catch (error) {
      console.log("Error on Product Detail", error);
    }
  };

  const fetchYouMayAlsoLike = async (product_id) => {
    setLoading(true);
    try {
      const response = await getYouMayAlsoLikeApi({ product_id });
      const recommendedProducts = response?.data || [];
      setRecommendedProducts(recommendedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching 'You May Also Like' products", error);
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
      notifySuccess("Product added to cart successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error adding to cart:", error);
      notifyError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const login =
    localStorage.getItem("access") || localStorage.getItem("refresh");

  function checkItemInCart() {
    return cartItems.some((cartItem) => cartItem.product_id === detail?.id);
  }

  useEffect(() => {
    fetchProductDetail();
    fetchYouMayAlsoLike(filters?.product_id);
  }, [showCart]);

  useEffect(() => {
    checkItemInCart();
  }, [cartItems]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleWishlistChange() {
    setDetail({
      ...detail,
      is_wishlist: !detail?.is_wishlist,
    });
    const data = { product_id: detail?.id, action: !detail?.is_wishlist };
    dispatch(updateWishlist(data));
    notifySuccess(
      !detail?.is_wishlist
        ? "Product added to wishlist"
        : "Product removed from wishlist"
    );
  }


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
                <div className="d-flex justify-content-lg-between">
                  {/* <p className="fb-fs-18 fw-600 d-flex text-brown">
                    <span>
                      <img
                        className="img-fluid mt-1 me-2"
                        src={fireImg}
                        alt="fire"
                      />
                    </span>
                    80 Calories
                  </p> */}
                  <div className="gap-3 d-inline-flex ms-lg-auto mb-3">
                    <span className="pt-2">
                    {  (login) ?
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={detail?.is_wishlist ? true : false}
                        style={{ color: "#F26722", padding: "11px" }}
                        className="bg-icon-background"
                        onChange={handleWishlistChange}
                      />
                      :
                      <Checkbox
                        {...label}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={detail?.is_wishlist ? true : false}
                        style={{ color: "#F26722", padding: "11px" }}
                        className="bg-icon-background"
                        onChange={toggleWebLogin}
                      />
                    }
                    </span>
                    {/* <span>
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <span className="d-inline-block bg-icon-background rounded-circle p-2">
                          <ShareIcon
                            style={{ color: "#F26722" }}
                            className=""
                          />
                        </span>
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>Whatsapp</MenuItem>
                        <MenuItem onClick={handleClose}>Facebook</MenuItem>
                        <MenuItem onClick={handleClose}>Twitter</MenuItem>
                        <MenuItem onClick={handleClose}>Copy Link</MenuItem>
                      </Menu>
                    </span> */}
                  </div>
                </div>
                <h4 className="fb-fs-30 fw-bold">{detail?.name}</h4>
                {detail?.ratings > 0 && (
                  <Link
                    to="/product-detail#reviews-wapper"
                    className="d-flex mb-4 mt-2 mb-lg-4 mt-lg-4"
                  >
                    <Rating
                      className="me-3"
                      value={Math.round(detail.ratings)}
                      readOnly
                      cancel={false}
                    />
                    <p className="text-mid-grey">
                      ({(detail?.ratings ?? 0).toFixed(1)} Reviews)
                    </p>
                  </Link>
                )}
                <p>{truncateToWords(detail?.short_description, 25)}</p>
                {/* <a href="/product-detail/#detail-description"><span className="text-orange">Read More</span></a> */}
                <div className="d-flex mt-4 mb-3">
                  <p className="fw-600 pt-2">Size / Weight:</p>
                  <ButtonGroup className="weight-check ms-3 d-inline-flex align-items-center">
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        className="py-1 px-2 fw-500"
                        style={{ fontSize: "1rem" }}
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
                  {detail?.offer_price !== detail?.max_price && (
                    <small className="fw-500 fb-fs-30 text-grey ms-3">
                      <strike>₹{detail?.max_price}</strike>
                    </small>
                  )}
                </p>
                <p style={{ fontSize: "0.875rem" }} className="fw-500">
                  (Inclusive of all taxes)
                </p>
                <div>
                  {login ? (
                    !checkItemInCart() ? (
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
                        <MyCartMenu
                          showCart={showCart}
                          onCloseCart={toggleCart}
                        />
                      </>
                    )
                  ) : (
                    <>
                      <button
                        className="button-primary mt-4 fb-fs-18"
                        onClick={() => setShowWebLogin(true)}
                      >
                        Add to Cart
                      </button>
                      <MobileLogin
                        otpShow={showWebLogin}
                        onOtpClose={toggleWebLogin}
                        align="end"
                      />
                    </>
                  )}
                </div>
                {/* <div className="mt-5">
                <p className="fw-600">Check Availability</p>
                <div
                  className="border-gray border-raidus-10 mt-2 input-box"
                  style={{ width: "60%" }}
                >
                  <div className="input-group mb-2 mt-2">
                    <input
                      type="number"
                      className="form-control border-0 box-shadow-0 fw-600"
                      placeholder="Enter Pincode"
                      aria-label="Enter Pincode"
                      aria-describedby="basic-addon2"
                      maxLength={6}
                      minLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                    <button
                      className="input-group-text border-0 text-orange fw-600 bg-transparent border-start border-2 ps-4 me-3"
                      onClick={handleCheckPincode}
                    >
                      CHECK
                    </button>
                  </div>
                </div>
                {message && (
                  <p className="mt-2 fw-600 text-dark">{message}</p>
                )}
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
                    {/* {detail?.product_type && (
                      <li className="my-2">Type: {detail?.product_type}</li>
                    )}
                    {detail?.category && (
                      <li className="my-2">Category: {detail?.category}</li>
                    )} */}
                    {/* <li className="my-2">
                      MFG:
                      {new Date(detail.mfg_date)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        .replace(",", ".")}
                    </li> */}
                    {/* <li className="my-2">LIFE: {detail?.days} days</li> */}
                  </ul>
                  <ul className="me-5 pe-4 disc-style w-50">
                    {/* <li className="my-2">SKU: FWM15VKT</li> */}
                    {/* <li className="my-2">Tags:{detail?.tags}</li> */}
                    {/* <li className="my-2">
                      Stock: {detail?.quantity} Items In Stock
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row ms-1 mt-5 description-slider">
            <div
              className="card tabs-slider ms-xxl-5 mt-4"
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
                        className="flex-row tab-nav-wrapper my-3  mt-md-5 mb-md-3 px-4 gap-3 gap-md-4"
                      >
                        <Nav.Item className="nav">
                          <Nav.Link
                            as="button"
                            className="btn-tab me-0"
                            eventKey="Description"
                          >
                            Description
                          </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                          <Nav.Link
                            as="button"
                            className="btn-tab me-0"
                            eventKey="Additional Info"
                          >
                            Additional Info
                          </Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                          <Nav.Link
                            as="button"
                            className="btn-tab me-0"
                            eventKey="Reviews"
                          >
                            Reviews({reviews?.ratings_data?.length || 0})
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    <div className="col-md-12">
                      <Tab.Content className="px-4 pb-4">
                        <Tab.Pane eventKey="Description">
                          <p className="mb-4" id="detail-description">
                            {detail?.long_description}
                          </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Additional Info">
                          Additional
                        </Tab.Pane>
                        <Tab.Pane eventKey="Reviews">
                          <div className="p-3 p-lg-4" id="reviews-wapper">
                            <div className="row">
                              <div className="col-md-7">
                                {loading ? (
                                  <Loading />
                                ) : reviews?.ratings_data?.length > 0 ? (
                                  <>
                                    {reviews?.ratings_data?.map((data) => (
                                      <div
                                        className="col-12 mb-3"
                                        key={data?.id}
                                      >
                                        <div className="d-inline-flex align-items-center gap-3">
                                          <span className="d-inline-block">
                                            <img
                                              className="img-fluid border-orange"
                                              src={
                                                (!data?.is_anonymous && data?.user_img)
                                                  ? `${baseURL}/${data?.user_img}`
                                                  : pp
                                              }
                                              alt="User Profile"
                                              style={{
                                                width: "4rem",
                                                height: "4rem",
                                                borderRadius: "50%",
                                                aspectRatio: "1/1",
                                              }}
                                            />
                                          </span>
                                          <div className="d-inline-block">
                                            <h6 className="fs-6 fw-bold">
                                              {data?.is_anonymous ? "Anonymous" : data?.user_name || "Anonymous"}
                                            </h6>
                                            <span className="d-inline-block">
                                              <Rating
                                                value={data?.rating || 0}
                                                readOnly
                                                stars={5}
                                                cancel={false}
                                              />
                                            </span>
                                          </div>
                                        </div>
                                        <p className="mb-3">
                                          {data?.comment ||
                                            "No comment provided."}
                                        </p>
                                        <p className="mb-3 text-grey fw-500">
                                          {data?.created_at
                                            ? new Intl.DateTimeFormat("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            }).format(
                                              new Date(data.created_at)
                                            )
                                            : "Date not available"}
                                        </p>
                                        {data?.images?.map((image, index) => (
                                          <ImageGallery
                                            images={[image]}
                                            key={index}
                                          />
                                        ))}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div
                                    className="align-content-center w-100"
                                    style={{ height: "10dvh" }}
                                  >
                                    <h3 className="text-center text-yellow fw-bold">
                                      No Reviews Found
                                    </h3>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-5">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                  <div>
                                    <h4 className="fw-bold">
                                      Rating & Reviews
                                    </h4>
                                  </div>
                                  {/* <div className="d-flex ">
                                    <p className="text-orange fw-500">
                                      View all reviews
                                    </p>
                                    <MdKeyboardArrowRight
                                      color="#F26722"
                                      className="mt-1 ms-1"
                                      size={20}
                                    />
                                  </div> */}
                                </div>
                                <div className="row align-items-center">
                                  <div className="col-md-6">
                                    <div style={{ borderRight: "1px solid #DADADA" }}>
                                      <p className="fb-fs-18 fw-500">Overall Rating</p>
                                      <p className="fb-fs-24 mt-2 fw-bold">{(detail?.ratings ?? 0).toFixed(1)} <span className="text-mid-grey fb-fs-18 fw-400">({detail?.total_customer_rated})</span></p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div >
                                      <RatingBar ratingData={reviews?.rating_summary} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
      {recommendedProducts?.length > 0 && (
        <section className="similar-product pt-0">
          <div className="container fb-container">
            <div className="row ms-xxl-5">
              <h3 className="fw-bold mb-5 pb-2">Similar Products</h3>
              <div
                className="d-grid mt-4 pt-2 gap-4 justify-content-between product-container"
                style={{
                  gridTemplateColumns:
                    window.innerWidth > 768
                      ? "repeat(5, 1fr)"
                      : "repeat(2, 1fr)",
                }}
              >
                {recommendedProducts?.length > 0 ? (
                  recommendedProducts
                    ?.slice(0, 5)
                    .map((item, index) => (
                      <ProductCard product={item} key={index} />
                    ))
                ) : (
                  <p>There is no similar product.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default ProudctDetail;
