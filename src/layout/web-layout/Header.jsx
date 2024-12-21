import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../../assets/images/web/logo.svg";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
const Header = () => {
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useURLFilters();

  const [userDetail, setUserDetail] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [showWebLogin, setShowWebLogin] = useState(false);

  const toggleCart = () => setShowCart(!showCart);

  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  const toggleMobileLogin = () => setShowMobileLogin((prev) => !prev);
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);

  const {
    cartItems,
    finalCart,
    loading: cartLoading,
    error,
  } = useSelector((state) => state.cart);

  const accessToken =
    localStorage.getItem("access") || localStorage.getItem("refresh");

  const login = accessToken;


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    navigate(`/products?category_id=${filters.category_id}&name=${filters.name}`);
    setShowMobileMenu(false)
  };
  async function getCategory() {
    setLoading(true);
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setCategory(filteredData);
    } catch (error) {
      console.log("Error on Banner List", error);
    } finally {
      setLoading(false);
    }
  }

  const getProfileList = async () => {
    try {
      const response = await getProfile();
      setUserDetail(response?.data[0] || {});
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };


  useEffect(() => {
    getCategory();
    getProfileList();
    dispatch(fetchCart());
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!accessToken) {
  //       console.log("Token not found");
  //       setShowMobileLogin(true);
  //       setShowWebLogin(true);
  //     } else {
  //       setShowMobileLogin(false);
  //       setShowWebLogin(false); // Optional: Reset state if token exists
  //     }
  //   }, 3000); // Check every 1 second

  //   return () => clearInterval(interval); // Clean up on component unmount
  // }, []);



  return (
    <>
          <ScrollTopBehaviour/>

      <header className="fb-bottom-shadow sticky-top bg-white z-100">
        <div className="header-top bg-semi-orange py-2">
          <div className="container fb-container d-flex flex-wrap gap-2 justify-content-center justify-content-lg-between align-items-center">
            <p className="text-white fw-500 fb-fs-14 d-none d-lg-block">
              Free delivery & 40% discount for next 3 orders! Place your 1st
              order now.
            </p>
            <p className="text-white fw-500 fb-fs-14">
              Need Help? Call Us:
              <a
                className="text-white text-decoration-none"
                href="tel:+1800 900 5600"
              >
                +1800 900 5600
              </a>
            </p>
          </div>
        </div>
        <div className="container fb-container pb-3 pt-2">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/">
              <div className="logo">
                <img src={logo} alt="logo" className="img-fluid" />
              </div>
            </Link>
            <div className="header-delivery-search mx-auto  d-none d-xl-block">
              <div className="d-inline-flex gap-4 w-100">
                <form
                  onSubmit={handleSearchSubmit}
                  className="header-search d-inline-flex w-100 align-self-center"
                >
                  <div className="all-category">
                    <Dropdown
                      value={category.find((c) => c.id === filters.category_id)}
                      onChange={(e) => setFilters({ ...filters, category_id: e.value.id })}
                      options={category}
                      optionLabel="name"
                      placeholder="All Categories"
                      className="w-full border-0"
                    />
                  </div>
                  <div className="search-input position-relative z-1 w-100 d-flex justify-content-between">
                    <InputText
                      type="text"
                      placeholder="Search for products"
                      className="border-0 ps-3 w-100"
                      style={{ boxShadow: "none" }}
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                    <button
                      type="submit"
                      className="search-icon d-inline-block z-2 h-100 border-0 bg-transparent">
                      <IoSearchOutline color="#918e92" size="1.25rem" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="header-actions">
              <ul className="list-unstyled align-items-center justify-content-between gap-4 web-header-actions d-none d-xl-flex">
                <li>
                  {
                    (login) ?
                      <ProfileDropdown userDetail={userDetail} />
                      :
                      <button
                        className="d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent"
                        onClick={toggleWebLogin}
                      >
                        <FaRegUser size={"1.625rem"} />
                        <span className="d-inline-block fb-fs-14 fw-600">
                          Login
                        </span>
                      </button>
                  }
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="d-inline-flex flex-column justify-content-center align-items-center"
                  >
                    <FaRegHeart size={"1.625rem"} />
                    <span className="d-inline-block fb-fs-14 fw-600">
                      Wishlist
                    </span>
                  </Link>
                </li>
                <li>
                  {
                    (login) ?
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
                        <span className="d-inline-block fb-fs-14 fw-600">
                          My Cart
                        </span>
                      </button>
                      :
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
                        <span className="d-inline-block fb-fs-14 fw-600">
                          My Cart
                        </span>
                      </button>
                  }
                  <MyCartMenu show={showCart} onClose={toggleCart} />
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
                      <CgShoppingBag size={"1.625rem"} />
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleMobileMenu}
                    className="d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent"
                  >
                    <IoMdMenu size={"1.625rem"} />
                  </button>
                  <MobileMenu
                    show={showMobileMenu}
                    onClose={toggleMobileMenu}
                    showMobileLogin={showMobileLogin}
                    toggleMobileLogin={toggleMobileLogin}
                    handleSearchSubmit={handleSearchSubmit}
                    filters={filters}
                    setFilters={setFilters}
                    login={login}
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
        <div className="header-bottom py-4 border-top d-none d-xl-block">
          <div className="container fb-container">
            <div className="header-divider d-flex justify-content-between ">
              <div className="header-link-list">
                <ul className="d-flex gap-5">
                  <li className="nav-item-link">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="nav-item-link">
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li className="nav-item-link">
                    <a href="/#best">Best Deals</a>
                  </li>
                  <li className="nav-item-link">
                    <a href="/#popular">Trending Products </a>
                  </li>
                  <li className="nav-item-link">
                    <NavLink to="/about-us">About Us </NavLink>
                  </li>
                  <li className="nav-item-link">
                    <NavLink to="/contact-us">Contact Us </NavLink>
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
