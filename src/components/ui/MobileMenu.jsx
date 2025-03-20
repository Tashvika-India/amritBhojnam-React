import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/images/web/logo.svg";
import { InputText } from "primereact/inputtext";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown } from "primereact/dropdown";
import MobileLogin from "../../components/ui/MobileLogin";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const MobileMenu = ({ show, onClose, showMobileLogin, toggleMobileLogin, handleSearchSubmit, setFilters, filters, login, userDetail }) => {
  return (
    <Offcanvas show={show} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton>
        <Link to="/">
          <img src={logo} className="img-fluid" alt="logo" loading="lazy" />
        </Link>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="header-search d-inline-flex w-100 align-self-center">
          <div className="search-input position-relative d-flex align-items-center z-1 w-100">
            <InputText
              placeholder="Search for a product and click the icon"
              className="border-0 ps-1 w-100 mob-search-input"
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <button onClick={handleSearchSubmit} className="search-icon z-2 border-0 bg-white border-start border-orange ps-2">
              <IoSearchOutline color="#f26722" size={"1.25rem"} />
            </button>
          </div>
        </div>
        <div>
          {
            login ?
              <div className="mt-4 bg-footer">
                <ProfileDropdown userDetail={userDetail} />
              </div>
              :
              <div >
                <button className="button-primary w-100 mt-4" type="button" onClick={toggleMobileLogin}>
                  <p className="fw-600 mb-0" style={{ fontSize: "16px" }}>
                    Login
                  </p>
                </button>
                <MobileLogin otpShow={showMobileLogin} onOtpClose={toggleMobileLogin} />
              </div>
          }
        </div>
        <div className="link-button ">
          <ul>
            <li className="border-bottom py-3"><Link to="/">Home </Link></li>
            <li className="border-bottom py-3"><Link to="/wishlist">Wishlist </Link></li>
            <li className="border-bottom py-3"><Link to="/products">Products </Link></li> 
            <li className="border-bottom py-3"><Link to="/about-us">About Us </Link></li>
            <li className="border-bottom py-3"><Link to="/contact-us">Contact Us </Link></li>
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileMenu;
