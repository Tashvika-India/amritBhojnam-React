import React, { useEffect } from "react";
import { useState } from "react";
import { Rating } from "primereact/rating";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import deliveryImg from "../../../assets/images/web/product-detail/delivery-img.png";
import AsNavFor from "../web-home/components/MultiSlide";
import { ButtonGroup, Nav, Tab, ToggleButton } from "react-bootstrap";
import {
  checkPincodeApi,
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
import {
  Breadcrumbs,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import MobileLogin from "../../../components/ui/MobileLogin";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  baseURL,
  formatDeliveryDateCustom,
  loginonWeb,
} from "../../../utils/constant-variable";
import {
  fetchWishlist,
  updateWishlist,
} from "../../../redux/slices/wishlistSlice";
import {
  notifyError,
  notifySuccess,
} from "../../../components/ui/Notification";
import { Link } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import RatingBar from "./components/RatingProgress";
import { AiFillThunderbolt } from "react-icons/ai";

const ProudctDetail = () => {
  const [showCart, setShowCart] = useState(false);
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
  const firstOption = detail?.options?.[0] || {};
  const [radioValue, setRadioValue] = useState(firstOption.option || "");
  const [selectedOptionId, setSelectedOptionId] = useState(firstOption.id || "");
  const selectedOption = detail?.options?.find((option) => option.option === radioValue);
  const [pincode, setPincode] = useState("");
  const [pinValue, setPinValue] = useState("");

  const [activeTab, setActiveTab] = useState("Description");


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

  const handleCheckPincode = async () => {
    if (pincode.length !== 6) {
      setMessage("Please enter a valid 6-digit pincode.");
      return; // Exit early if the pincode is invalid
    }

    try {
      const response = await checkPincodeApi(
        pincode,
        selectedOption?.option,
        selectedOption?.measurement_unit
      );
      const resPinValue = response?.data || {};
      if (resPinValue.delivery_date === "" && resPinValue.delivery_days === 0) {
        notifyError("Delivery is available for your pincode.");
      } else {
        notifySuccess("Delivery is available for your pincode.");
      }
      setPinValue(resPinValue);
    } catch (error) {
      console.error("Error fetching pincode details:", error);
      notifyError("Error fetching pincode details:", error);
    }
  };

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
  const addToCart = async (product_id, quantity, option_id) => {
    setLoading(true);
    try {
      const response = await postCartApi({
        product_id,
        item_quantity: quantity,
        option_id,
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

  function checkItemInCart() {
    return cartItems.some((cartItem) => cartItem.product_id === detail?.id);
  }

  useEffect(() => {
    fetchProductDetail();
    fetchYouMayAlsoLike(filters?.product_id);
  }, [showCart, filters?.product_id]);

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
    await dispatch(updateWishlist(data)).unwrap();
    dispatch(fetchWishlist());
    notifySuccess(
      !detail?.is_wishlist
        ? "Product added to wishlist"
        : "Product removed from wishlist"
    );
  }

  const deliveryDateCustom = pinValue?.delivery_date || "";
  const formattedDateCustom = formatDeliveryDateCustom(deliveryDateCustom || "");

  const handleScrollToReviews = () => {
    setActiveTab("Reviews");
    setTimeout(() => {
      const reviewContainer = document.getElementById("review-container");
      if (reviewContainer) {
        reviewContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleScrollToDescription = () => {
    setActiveTab("Description");
    setTimeout(() => {
      const descriptionContainer = document.getElementById("review-container");
      if (descriptionContainer) {
        descriptionContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    if (detail?.options?.length > 0) {
      setRadioValue(detail.options[0].option);
      setSelectedOptionId(detail.options[0].id);
    }
  }, [detail?.options]);

  useEffect(() => {
    reviewList();
  }, []);

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-4">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/products">
              Products
            </Link>
            <Typography className="text-orange">Product Detail</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <section className="product-detail-page">
        <div className="container fb-container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <AsNavFor data={detail.images} />
            </div>
            <div className="col-lg-6 col-12">
              <div className="product-detail-content ps-4 mt-4 mt-md-3">
                <div className="d-flex justify-content-between">
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
                  <div className="">
                    <h4 className="fb-fs-30 fw-bold">{detail?.name}</h4>
                    <button className="d-flex mb-4 mt-2 mb-lg-4 mt-lg-4 border-0 bg-transparent" onClick={handleScrollToReviews}>
                      <Rating
                        className="me-3 border-none"
                        value={Math.round(detail.ratings)}
                        readOnly
                        cancel={false}
                      />
                      <p className="text-mid-grey">
                        ({(detail?.ratings ?? 0).toFixed(1)} Reviews)
                      </p>
                    </button>
                  </div>
                  <div className="gap-3 d-inline-flex ms-lg-auto">
                    <span className="pt-2">
                      {loginonWeb ? (
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={detail?.is_wishlist ? true : false}
                          style={{ color: "#F26722", padding: "11px" }}
                          className="bg-icon-background"
                          onChange={handleWishlistChange}
                        />
                      ) : (
                        <Checkbox
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={detail?.is_wishlist ? true : false}
                          style={{ color: "#F26722", padding: "11px" }}
                          className="bg-icon-background"
                          onChange={toggleWebLogin}
                        />
                      )}
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

                <button onClick={handleScrollToDescription} className="border-0 bg-transparent text-start">
                  <p>{truncateToWords(detail?.short_description, 25)}</p>
                </button>
                {/* <a href="/product-detail/#detail-description"><span className="text-orange">Read More</span></a> */}
                <div className="d-flex align-items-center mt-4 mb-3">
                  <p className="fw-600">Size / Weight:</p>
                  <ButtonGroup className="weight-check ms-3 d-inline-flex align-items-center">
                    {detail?.options?.map((option, idx) => (
                      <ToggleButton
                        key={option.id}
                        id={`radio-${idx}`}
                        type="radio"
                        className="py-1 px-2 fw-500 "
                        style={{
                          fontSize: "1rem",
                          transition: "all 0.5s ease",
                        }}
                        variant={idx % 2 ? "bg-orange" : "bg-orange"}
                        name="radio"
                        value={option?.option}
                        checked={radioValue === option?.option}
                        onChange={(e) => {
                          setRadioValue(e.currentTarget.value);
                          setSelectedOptionId(option.id);
                        }}
                      >
                        {`${option?.option} ${option?.measurement_unit}`}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <p className="fb-fs-40 text-orange fw-bold original-price">
                    ₹{~~selectedOption?.offer_price}
                    {selectedOption?.offer_price !==
                      selectedOption?.max_price && (
                        <small className="fw-500 fb-fs-30 text-grey ms-3">
                          <strike>₹{~~selectedOption?.max_price}</strike>
                        </small>
                      )}
                  </p>
                  <p style={{ fontSize: "0.875rem" }} className="fw-500 mt-3">
                    (Inclusive of all taxes)
                  </p>
                </div>
                {(detail?.stock <= 5) && <div className="d-flex gap-2 align-items-center mt-2">
                  <span className="d-inline-block"><AiFillThunderbolt className="thunder-icon" size={"1.25rem"} /></span><p>Hurry, Only <strong className="thunder-icon">{~~(detail?.stock)}</strong> left!</p>
                </div>}
                <div>
                  {loginonWeb ? (
                    !checkItemInCart() ? (
                      <button
                        className="button-primary mt-4 fb-fs-18"
                        onClick={() =>
                          addToCart(detail?.id, quantity || 1, selectedOptionId)
                        }
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
                <div className="mt-3 mt-md-5">
                  <p className="fw-600">Check Availability</p>
                  <div
                    className="border-gray border-raidus-10 mt-2 input-box"
                    style={{ width: "60%" }}
                  >
                    <div className="input-group mb-2 mt-2">
                      <input
                        className="form-control border-0 box-shadow-0 fw-600 check-pincode"
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
                        disabled={pincode?.length !== 6}
                      >
                        CHECK
                      </button>
                    </div>
                  </div>
                  {/* {message && <small className="text-orange ms-2 mt-3">{message}</small>} */}
                </div>
                <div className="d-flex align-items-center gap-2 mt-2">
                  {pinValue && (
                    <>
                      <span>
                        <img
                          className="img-fluid"
                          src={deliveryImg}
                          alt="delivery-img"
                        />
                      </span>
                      <span className="text-orange">Get it by</span>
                      <span className="">{formattedDateCustom}</span>
                      <span className="" style={{ fontSize: "0.625rem" }}>
                        (Estimated)
                      </span>
                    </>
                  )}
                </div>
                {/* <div className="d-flex mt-4  ms-4 ">
                  <ul className="me-5 pe-4 disc-style w-50">
                      {detail?.product_type && (
                      <li className="my-2">Type: {detail?.product_type}</li>
                    )}
                    {detail?.category && (
                      <li className="my-2">Category: {detail?.category}</li>
                    )}  
                      <li className="my-2">
                      MFG:
                      {new Date(detail.mfg_date)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        .replace(",", ".")}
                    </li>  
                    <li className="my-2">LIFE: {detail?.days} days</li>  
                  </ul>
                  <ul className="me-5 pe-4 disc-style w-50">
                      <li className="my-2">SKU: FWM15VKT</li>  
                    <li className="my-2">Tags:{detail?.tags}</li> 
                    <li className="my-2">
                      Stock: {detail?.quantity} Items In Stock
                    </li> 
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className="row ms-1 mt-md-5 mt-0 description-slider" id="review-container">
            <div className="card tabs-slider ms-xxl-5 mt-3"
              style={{ border: "1px solid #E1E1E1" }}>
              <div className="container fb-container">
                <Tab.Container
                  id="left-tabs-example"
                  activeKey={activeTab}
                  onSelect={(key) => setActiveTab(key)}
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
                        <Nav.Item>
                          <Nav.Link
                            as="button"
                            className="btn-tab me-0"
                            eventKey="Nutrition"
                          >
                            Nutrition
                          </Nav.Link>
                        </Nav.Item>
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
                          <p
                            className="mb-4 mt-1 mt-md-4"
                            id="detail-description"
                          >
                            {detail?.long_description}
                          </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Nutrition">
                          <div className="row">
                            <div className="col-md-2">
                              <ul className="px-2 mb-4 mt-3 mt-md-4">
                                {detail?.nutritions?.map((data) => (
                                  <li className="d-flex justify-content-between mb-2">
                                    <h5 className="fw-600">
                                      {data?.nutrition_name}
                                    </h5>
                                    <h5>:</h5>
                                    <h5 className="fw-400">
                                      {data?.nutrition_value}
                                    </h5>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Reviews">
                          <div className="p-3 p-lg-4">
                            <div className="row">
                              <div className="col-md-7">
                                {loading ? (
                                  <Loading />
                                ) : reviews?.ratings_data?.length > 0 ? (
                                  <>
                                    {reviews?.ratings_data?.map((data) => (
                                      <div
                                        className="col-12 mb-4"
                                        key={data?.id}
                                      >
                                        <div className="d-inline-flex align-items-center gap-3">
                                          <span className="d-inline-block">
                                            <img
                                              className="img-fluid border-orange"
                                              src={
                                                !data?.is_anonymous &&
                                                  data?.user_img
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
                                              {data?.is_anonymous
                                                ? "Anonymous"
                                                : data?.user_name ||
                                                "Anonymous"}
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
                                        <p className="mb-3 mt-3">
                                          {data?.comment ||
                                            "No comment provided."}
                                        </p>
                                        <p className="mb-3 text-grey fw-500 pb-3 pt-2">
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
                                    <div
                                      style={{
                                        borderRight: "1px solid #DADADA",
                                      }}
                                    >
                                      <p className="fb-fs-18 fw-500">
                                        Overall Rating
                                      </p>
                                      <p className="fb-fs-24 mt-2 fw-bold">
                                        {(detail?.ratings ?? 0).toFixed(1)}
                                        <span className="text-mid-grey fb-fs-18 fw-400">
                                          ({detail?.total_customer_rated})
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div>
                                      <RatingBar
                                        ratingData={reviews?.rating_summary}
                                      />
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
      {/* <section className="recipe-section ms-5">
        <div className="container fb-container ">
          <div className="row">
            <div className="bg-recipe-background ms-5 rounded-20">
              <h3 className="fw-bold ms-5 pt-4 mt-2">Recipes</h3>
              <div>
                <div className="container fb-container">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="Description"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <Nav
                          variant="pills"
                          className="flex-row tab-nav-wrapper my-3  mt-md-4 mb-md-3 px-4 gap-3 gap-md-4"
                        >
                          <Nav.Item className="nav text-white">
                            <Nav.Link
                              as="button"
                              className="btn-tab me-0 text-white rounded-3 fb-fs-18 fw-600"
                              eventKey="Description"
                            >
                              Description
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="">
                            <Nav.Link
                              as="button"
                              className="btn-tab rounded-3 fb-fs-18 fw-600 me-0"
                              eventKey="Additional Info"
                            >
                              Additional Info
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="col-md-12">
                        <Tab.Content className="px-4 pb-4">
                          <Tab.Pane eventKey="Description">
                            <div className="d-flex gap-5 pt-2">
                              <div className="me-4">
                                <p className="fb-fs-18 my-4 py-2">
                                  <span className="fw-bold text-orange">
                                    
                                    Step 1.
                                  </span>
                                  &nbsp;&nbsp;Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the
                                </p>
                                <p className="fb-fs-18 my-4 py-2">
                                  <span className="fw-bold text-orange">
                                    
                                    Step 2.
                                  </span>
                                  &nbsp;&nbsp;Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the
                                </p>
                                <p className="fb-fs-18 my-4 py-2">
                                  <span className="fw-bold text-orange">
                                    
                                    Step 3.
                                  </span>
                                  &nbsp;&nbsp;Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the
                                </p>
                                <p className="fb-fs-18 my-4 py-2">
                                  <span className="fw-bold text-orange">
                                    
                                    Step 4.
                                  </span>
                                  &nbsp;&nbsp;Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the
                                </p>
                               
                              </div>
                              <div>
                                <img src={recipeImg} className="img-fluid mt-4" style={{width: "50rem", aspectRatio: "16 / 10"}} />
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="Additional Info">
                            Additional
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {recommendedProducts?.length > 0 && (
        <section className="similar-product pt-0">
          <div className="container fb-container">
            <div className="row ms-xxl-5">
              <h3 className="fw-bold mb-0 mb-md-5 pb-2">Similar Products</h3>
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
