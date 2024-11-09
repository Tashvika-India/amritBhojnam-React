import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../../assets/images/web/logo.svg'
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { CgShoppingBag } from 'react-icons/cg';
import { IoMdMenu } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import MobileMenu from '../../components/ui/MobileMenu';
import MyCartMenu from '../../components/ui/WishlistMenu';
import MobileLogin from '../../components/ui/MobileLogin';
import { getCategoriesApi } from '../../services/adminApiRoutes';

const Header = () => {
  const [search, setSearch] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const navigate = useNavigate();

  const [showWebLogin, setShowWebLogin] = useState(false);

  const toggleCart = () => setShowCart(!showCart);

  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  const toggleMobileLogin = () => setShowMobileLogin((prev) => !prev);
  const toggleWebLogin = () => setShowWebLogin((prev) => !prev);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      const categoryQuery = selectedCategory ? `category_id=${selectedCategory.id}` : '';
      navigate(`/products?${categoryQuery}&name=${search}`);
    }
  };


  async function getCategory() {
    setLoading(true);
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(item => item.is_active === true);
      setCategory(filteredData);
    } catch (error) {
      console.log("Error on Banner List", error);
    } finally {
      setLoading(false);
    }
  }
 

  return (
    < >
      <header className='fb-bottom-shadow'>
        <div className="header-top bg-yellow py-2">
          <div className="container fb-container d-flex flex-wrap gap-2 justify-content-center justify-content-lg-between align-items-center">
            <p className='text-white fw-500 fb-fs-14 d-none d-lg-block'>Free delivery & 40% discount for next 3 orders! Place your 1st order now.</p>
            <p className='text-white fw-500 fb-fs-14'>Need Help? Call Us: <a className='text-white text-decoration-none' href="tel:+1800 900 5600">+1800 900 5600</a></p>
          </div>
        </div>
        <div className="container fb-container pb-3 pt-2">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/home"><div className="logo">
              <img src={logo} alt="logo" className='img-fluid' />
            </div></Link>
            <div className="header-delivery-search mx-auto  d-none d-xl-block">
              <div className="d-inline-flex gap-4 w-100">
                <div className="header-delivery d-inline-flex gap-3 align-items-center">
                  <div className="header-delivery-icon">
                    <CiLocationOn size={25} />
                  </div>
                  <div className="header-delivery-text">
                    <small>Deliver to</small>
                    <p className='fw-600 text-truncate'>Akshya Nagar 1st Block 1...</p>
                  </div>
                </div>
                <form onSubmit={handleSearchSubmit} className="header-search d-inline-flex w-100 align-self-center">
                  <div className="all-category">
                    <Dropdown
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.value)}
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
                      style={{ boxShadow: 'none' }}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="search-icon d-inline-block z-2 h-100 border-0 bg-transparent"
                    >
                      <IoSearchOutline color="#918e92" size="1.25rem" />
                    </button>
                 </div>
                </form>
              </div>
            </div>
            <div className="header-actions">
              <ul className='list-unstyled align-items-center justify-content-between gap-4 web-header-actions d-none d-xl-flex'>
                <li>
                  <button
                    className='d-inline-flex flex-column justify-content-center align-items-center border-0 bg-transparent'
                    onClick={toggleWebLogin}>
                    <FaRegUser size={"1.625rem"} />
                    <span className='d-inline-block fb-fs-14 fw-600'>Login</span>
                  </button>
                  {/* <ProfileDropdown /> */}
                </li>
                <li>
                  <a href="#" className='d-inline-flex flex-column justify-content-center align-items-center' >
                    <FaRegHeart size={"1.625rem"} />
                    <span className='d-inline-block fb-fs-14 fw-600'>Wishlist</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={toggleCart} className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <div className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-yellow">
                        1
                        <span className="visually-hidden">unread messages</span>
                      </span>
                      <CgShoppingBag size={"1.625rem"} />
                    </div>
                    <span className='d-inline-block fb-fs-14 fw-600'>My Cart</span>
                  </a>
                  <MyCartMenu show={showCart} onClose={toggleCart} />
                </li>
              </ul>
              <ul className='list-unstyled d-flex d-xl-none align-items-center justify-content-between gap-4 mobile-header-actions'>
                <li>
                  <a href="#" className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <IoSearchOutline size={"1.625rem"} />
                  </a>
                </li>
                <li>
                  <a href="#" className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <div className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-yellow">
                        1
                        <span className="visually-hidden">unread messages</span>
                      </span>
                      <CgShoppingBag size={"1.625rem"} />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={toggleMobileMenu} className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <IoMdMenu size={"1.625rem"} />
                  </a>
                  <MobileMenu
                    show={showMobileMenu}
                    onClose={toggleMobileMenu}
                    showMobileLogin={showMobileLogin}
                    toggleMobileLogin={toggleMobileLogin}
                  />

                  <MobileLogin otpShow={showWebLogin} onOtpClose={toggleWebLogin} align="end" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-bottom py-4 border-top d-none d-xl-block">
          <div className="container fb-container">
            <div className="header-divider d-flex justify-content-between ">
              <div className="header-link-list">
                <ul className='d-flex gap-5'>
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/products">Shop</Link></li>
                  <li><Link to="/product-detail">Best Deals</Link></li>
                  <li><a href="#">Trending Products </a></li>
                  <li><a href="#">About Us </a></li>
                  <li><a href="#">Contact Us </a></li>
                </ul>
              </div>
              <div className="header-divider-action">
                <ul className='d-flex gap-5'>
                  <li><a href="#">Track Your Order</a></li>
                  <li><a href="#" className='text-orange'>Almost Finished <span className='ms-2 text-white text-uppercase badge bg-orange fb-fs-14 fw-500'>SALE</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header >
    </>
  )
}

export default Header