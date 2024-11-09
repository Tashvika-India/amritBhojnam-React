import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/images/web/logo.svg";
import { InputText } from "primereact/inputtext";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown } from "primereact/dropdown";
import MobileLogin from "../../components/ui/MobileLogin";

const MobileMenu = ({ show, onClose, showMobileLogin, toggleMobileLogin}) => {

  
  const [selectedCity, setSelectedCity] = useState(null);
 
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <Offcanvas show={show} onHide={onClose} placement="start">
      <Offcanvas.Header closeButton>
        <img src={logo} className="img-fluid" alt="logo" loading="lazy" />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="header-search d-inline-flex w-100 align-self-center">
          <div className="search-input position-relative z-1 w-100">
            <InputText
              keyfilter="int"
              placeholder="Search for products"
              className="border-0 ps-3"
            />
            <span className="search-icon z-2 position-absolute end-0 top-50 translate-middle mb-3">
              <IoSearchOutline color="#918e92" size={"1.25rem"} />
            </span>
          </div>
        </div>
        <div>
          <div >
            <button className="button-primary w-100 mt-4" type="button" onClick={toggleMobileLogin}>
              <p className="fw-600 mb-0" style={{ fontSize: "16px" }}>
                Login
              </p>
              
            </button>
            <MobileLogin otpShow={showMobileLogin} onOtpClose={toggleMobileLogin} />
          </div>
        </div>
        <div className="link-button mt-4">
          <ul>
            <li className="border-bottom py-3">Home</li>
            <div className="d-flex justify-content-between border-bottom">
              <li className=" py-3">Shop</li>
              <span>
                <div className="all-category text-end mt-2">
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={cities}
                    optionLabel="name"
                    className="border-0"
                  />
                </div>
              </span>
            </div>
            <li className="border-bottom py-3">Best deals</li>
            <li className="border-bottom py-3">Trending Products</li>
            <li className="border-bottom py-3">About Us</li>
            <li className="border-bottom py-3">Contact Us</li>
            <li className="py-3">
              Almost Finished
              <span>
                <button className="button-primary ms-3 rounded-1 px-2 py-0 fw-400 fb-fs-16">
                  <p
                    className="mb-0"
                    style={{ fontSize: "16px", fontWeight: "400" }}
                  >
                    SALE
                  </p>
                </button>
              </span>
            </li>
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileMenu;
