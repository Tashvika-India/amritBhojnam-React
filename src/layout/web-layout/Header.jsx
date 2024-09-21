import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../../assets/images/web/logo.svg'
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { CgShoppingBag } from 'react-icons/cg';

const Header = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  return (
    < >
      <header className='fb-bottom-shadow'>
        <div className="header-top bg-yellow py-2">
          <div className="container fb-container d-flex flex-wrap gap-2 justify-content-center justify-content-lg-between align-items-center">
            <p className='text-white fw-500 fb-fs-14'>Free delivery & 40% discount for next 3 orders! Place your 1st order now.</p>
            <p className='text-white fw-500 fb-fs-14'>Need Help? Call Us: <a className='text-white text-decoration-none' href="tel:+1800 900 5600">+1800 900 5600</a></p>
          </div>
        </div>
        <div className="container fb-container pb-3 pt-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <img src={logo} alt="logo" className='img-fluid' />
            </div>
            <div className="header-delivery-search mx-auto d-inline-flex">
              <div className="header-delivery d-inline-flex gap-3 align-items-center">
                <div className="header-delivery-icon">
                  <CiLocationOn size={25} />
                </div>
                <div className="header-delivery-text">
                  <small>Deliver to</small>
                  <p className='fw-600'>Akshya Nagar 1st Block 1...</p>
                </div>
              </div>
              <div className="header-search d-inline-flex border p-2">
                <div className="all-category">
                  <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                    placeholder="All Categories" className="w-full border-0" />
                </div>
                <div className="search-input position-relative z-1" >
                  <InputText keyfilter="int" placeholder="Search for products" className='border-0' />
                  <span className='search-icon z-2 position-absolute end-0 top-50 translate-middle mb-3'><IoSearchOutline /></span>
                </div>
              </div>
            </div>
            <div className="header-actions">
              <ul className='list-unstyled d-flex align-items-center justify-content-between gap-3'>
                <li>
                  <a href="#" className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <FaRegUser />
                    <span className='d-inline-block'>Account</span>
                  </a>
                </li>
                <li>
                  <a href="#" className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <FaRegHeart />
                    <span className='d-inline-block'>Wishlist</span>
                  </a>
                </li>
                <li>
                  <a href="#" className='d-inline-flex flex-column justify-content-center align-items-center'>
                    <CgShoppingBag />
                    <span className='d-inline-block'>My Cart</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-bottom py-4 border-top">
          <div className="container fb-container">
            <div className="header-divider d-flex justify-content-between ">
              <div className="header-link-list">
                <ul className='d-flex gap-4'>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Shop</a></li>
                  <li><a href="#">Best Deals</a></li>
                  <li><a href="#">Trending Products </a></li>
                  <li><a href="#">About Us </a></li>
                  <li><a href="#">Contact Us </a></li>
                </ul>
              </div>
              <div className="header-divider-action">
                <ul className='d-flex gap-4'>
                  <li><a href="#">Track Your Order</a></li>
                  <li><a href="#" className='text-orange'>Almost Finished <span className='text-white d-inline-block lh-normal fb-fs-14 bg-orange rounded px-2 text-uppercase ms-2'>SALE</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header