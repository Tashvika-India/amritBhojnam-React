import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../../assets/images/web/logo.svg";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../components/ui/ProfileDropdown";
import MobileMenu from "../../components/ui/MobileMenu";
import MyCartMenu from "../../components/ui/MyCartMenu";
import MobileLogin from "../../components/ui/MobileLogin";
import { getCategoriesApi, getProfile } from "../../services/adminApiRoutes";
import useURLFilters from "../../custom-compoents/useURLFilters";
import { getWishlist } from "../../services/adminApiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";
import ScrollTopBehaviour from "../../custom-compoents/ScrollTopBehaviour";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";
import { loginonWeb } from "../../utils/constant-variable";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [showWebLogin, setShowWebLogin] = useState(false);
  const [activeHash, setActiveHash] = useState(location.hash);
  const [userDetail, setUserDetail] = useState({});
  const [category, setCategory] = useState([]);
  const [filters, setFilters] = useURLFilters();

  const isHashActive = (hash) => activeHash === hash;

  const {
    cartItems,
    finalCart,
    loading: cartLoading,
    error,
  } = useSelector((state) => state.cart);

  console.log(category);
  

  const { wishlist = [] } = useSelector((state) => state.wishlist);

  // Toggle Functions
  const toggleCart = () => setShowCart((prev) => !prev);
  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);
  const toggleMobileLogin = () => setShowMobileLogin((prev) => !prev);
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);

  // Build Query String for Filters
  const buildQueryString = (filters) => {
    const params = new URLSearchParams(filters);
    return params.toString();
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?${buildQueryString(filters)}`);
    setShowMobileMenu(false);
  };

  const getCategory = async () => {
    try {
      const response = await getCategoriesApi();
      setCategory(response?.data?.filter(Boolean) || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProfileList = async () => {
    try {
      const response = await getProfile();
      setUserDetail(response?.data?.[0] || {});
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getCategory();
    if (loginonWeb) {
      dispatch(fetchCart());
      getProfileList();
      dispatch(fetchWishlist());
    }
  }, [dispatch]);


  const headerOffset = 210; 

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      setActiveHash(`#${targetId}`);
      window.history.pushState(null, "", `#${targetId}`);
    } else {
      navigate(`/#${targetId}`);
    }
  };

  useEffect(() => {
    setActiveHash(location.hash);
  }, [location.hash]);

  return (
    <>
      <ScrollTopBehaviour />

      <header className="fb-bottom-shadow sticky-top bg-white z-100">
        <div className="header-top bg-semi-orange py-2">
          <div className="container fb-container d-flex flex-wrap gap-2 justify-content-center justify-content-lg-end align-items-center">
            {/* <p className="text-white fw-500 fb-fs-14 d-none d-lg-block">
              Free delivery & 40% discount for next 3 orders! Place your 1st
              order now. &nbsp;
            </p> */}
            <p className="text-white fw-500 fb-fs-14">
              Need Help? Call Us:
              <a
                className="text-white text-decoration-none"
                href="tel: +91 7678320459"
              >
                +91 7678320459
              </a>
            </p>
          </div>
        </div>

        <div className="header-middle container fb-container pb-3 pt-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Link to="/">
              <div className="logo">
                <img src={logo} alt="logo" className="img-fluid" />
              </div>
            </Link>
            <div className="header-delivery-search mx-auto  d-none d-xl-block">
              <div className="d-inline-flex gap-4 w-100">
                <form
                  onSubmit={handleSearchSubmit}
                  className="header-search d-inline-flex w-100 align-self-center mt-3"
                > 
                  <div className="all-category">
                    <Dropdown
                      value={
                        filters.category_id
                          ? category.find((c) => c.id === filters.category_id) || {
                            id: "",
                            name: "All Categories",
                          }
                          : { id: "", name: "All Categories" }
                      }
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, category_id: e.value.id }))
                      }
                      options={[{ id: "", name: "All Categories" }, ...category.filter((c) => c.is_active)]}
                      optionLabel="name"
                      placeholder="Select Category"
                      className="w-full border-0"
                      aria-label="Select product category"
                    />
                  </div> 
                  <div className="search-input position-relative z-1 w-100 d-flex justify-content-between">
                    <InputText
                      type="text"
                      placeholder="Search for products"
                      className="border-0 ps-3 w-100"
                      style={{ boxShadow: "none" }}
                      value={filters.name}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, name: e.target.value }))
                      }
                      aria-label="Search for products"
                    /> 
                    <button
                      type="submit"
                      className="search-icon d-inline-block z-2 h-100 border-0 bg-transparent fw-500"
                      // disabled={!filters.name?.trim()}  
                      aria-label="Search"
                    >
                      <IoSearchOutline color="#918e92" size="1.4rem" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="header-actions mt-3">
              <ul className="list-unstyled align-items-center justify-content-between gap-4 web-header-actions d-none d-xl-flex">
                <li>
                  {loginonWeb ? (
                    <ProfileDropdown userDetail={userDetail} />
                  ) : (
                    <button
                      className="d-inline-flex  flex-column justify-content-center align-items-center border-0 bg-transparent login-header-btn"
                      onClick={toggleWebLogin}
                    >
                      <FaRegUser className="login-card-icon" size={"1.625rem"} />
                      <span className="d-inline-block fb-fs-14 fw-500">
                        Login
                      </span>
                    </button>
                  )}
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="d-inline-flex wishlist-box flex-column justify-content-center align-items-center"
                  >
                    <div className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-semi-orange">
                        {wishlist.length}
                      </span>
                      <FaRegHeart size={"1.625rem"} />
                    </div>
                    <span className="d-inline-block fb-fs-14 fw-500">
                      Wishlist
                    </span>
                  </Link>
                </li>
                <li>
                  {loginonWeb ? (
                    <button
                      onClick={toggleCart}
                      className="d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent"
                    >
                      <div className="position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-semi-orange">
                          {cartItems.length}
                        </span>
                        <CgShoppingBag className="shoping-bag" size={"1.625rem"} />
                      </div>
                      <span className="d-inline-block fb-fs-14 fw-500 text-black">
                        My Cart
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={toggleCart}
                      className="d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent"
                    >
                      <div className="position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-semi-orange">
                          {cartItems.length}
                        </span>
                        <CgShoppingBag size={"1.625rem"} />
                      </div>
                      <span className="d-inline-block fb-fs-14 fw-500 text-black">
                        My Cart
                      </span>
                    </button>
                  )}
                  <MyCartMenu showCart={showCart} onCloseCart={toggleCart} />
                </li>
              </ul>
              <ul className="list-unstyled d-flex d-xl-none align-items-center justify-content-between gap-2 mobile-header-actions">
                <li>
                  <button
                    onClick={toggleCart}
                    className="d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent"
                  >
                    <div className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-semi-orange">
                        {cartItems.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                      <CgShoppingBag size={"1.625rem"} color="#231d25" />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleMobileMenu}
                    className="d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent"
                  >
                    <IoMdMenu size={"1.625rem"} color="#231d25" />
                  </button>
                  <MobileMenu
                    show={showMobileMenu}
                    onClose={toggleMobileMenu}
                    showMobileLogin={showMobileLogin}
                    toggleMobileLogin={toggleMobileLogin}
                    handleSearchSubmit={handleSearchSubmit}
                    filters={filters}
                    setFilters={setFilters}
                    login={loginonWeb}
                    userDetail={userDetail}
                  />
                  <MobileLogin
                    otpShow={showWebLogin}
                    onOtpClose={toggleWebLogin}
                    align="end"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-bottom py-4  border-top d-none d-xl-block">
          <div className="container fb-container">
            <div className="header-divider d-flex justify-content-between ">
              <div className="header-link-list">
                <ul className="d-flex gap-5">
                  <li className="nav-item-link">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive && !location.hash ? "active" : ""
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item-link">
                    <NavLink
                      to="/products"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item-link">
                    <a
                      href="/#best"
                      className={isHashActive("#best") ? "active" : ""}
                      onClick={(e) => handleScroll(e, "best")}
                    >
                      Best Deals
                    </a>
                  </li>
                  <li className="nav-item-link">
                    <a
                      href="/#popular"
                      className={isHashActive("#popular") ? "active" : ""}
                      onClick={(e) => handleScroll(e, "popular")}
                    >
                      Trending Products
                    </a>
                  </li>
                  <li className="nav-item-link">
                    <NavLink
                      to="/about-us"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item-link">
                    <NavLink
                      to="/contact-us"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="header-divider-action">
                {/* <ul className="d-flex gap-5">
                  <li>
                    <a href="#">Track Your Order</a>
                  </li>
                  <li>
                    <a href="#" className="text-orange">
                      Almost Finished
                      <span className="ms-2 text-white text-uppercase badge bg-orange fb-fs-14 fw-500">
                        SALE
                      </span>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
