import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { CiLogout } from 'react-icons/ci';
import { FaBox, FaRegUser } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
const ProfileDropdown = ({ userDetail }) => {
    const handleLogout = async () => {
        localStorage.clear();
        window.location.reload(true);
    }


    return (
        <Dropdown className='menu-dropdown-wrapper'>
            <Dropdown.Toggle
                id="dropdown-basic"
                as="a"
                style={{cursor:"pointer"}} className='no-caret'>
                {(window.innerWidth > 768) ?
                    <div className="d-inline-flex flex-column align-items-center position-relative justify-content-center">
                        <FaRegUser size={"1.625rem"} />
                        <span className="d-inline-block ms-2 fb-fs-14 fw-600">Account</span>
                    </div>
                    :
                    <ul>
                        <li className="border-bottom py-3"> Account </li>
                    </ul>
                }

            </Dropdown.Toggle>
            <Dropdown.Menu align="start" className='menu-wrapper-card pt-0 overflow-hidden'>
                <div className="account-menu">
                    <Link to="/profile">
                        <div className="account-profile-detail" style={{ backgroundColor: "#FFF7E7" }}>
                            <Avatar style={{ width: '3rem', height: '3rem', color: '#D59615', backgroundColor: '#FFF7E7', border: '1px solid #D59615' }} />
                            <div className="d-inline-block ms-2 account-profile-content">
                                <h6>{userDetail?.full_name}</h6>
                                <p className="mb-0">{userDetail?.phone_number}</p>
                            </div>
                        </div>
                    </Link>
                    <ul className="list-unstyled list-wrapper px-4">
                        <li className="mb-3">
                            <Link to={"/profile?tab=orders"} className="d-inline-flex align-items-center fb-fs-16 fw-500">
                                <span className="me-2" style={{ minWidth: "1.8rem" }}><FaBox size={'1.2rem'} color='#D59615' /></span> Order History
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to={"/profile?tab=addresses"} className="d-inline-flex align-items-center fb-fs-16 fw-500">
                                <span className="me-2" style={{ minWidth: "1.8rem" }}><IoLocationOutline size={'1.5rem'} color='#D59615' /></span> Address Book
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="d-inline-flex align-items-center fb-fs-16 fw-500 border-0 bg-transparent" onClick={() => handleLogout()}>
                                <span className="me-2" style={{ minWidth: "1.8rem" }}><CiLogout size={'1.5rem'} color='#D59615' /></span> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
