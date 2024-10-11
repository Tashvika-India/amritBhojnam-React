import { Avatar } from '@mui/material';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { CiLogout } from 'react-icons/ci';
import { FaBox, FaRegUser } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const ProfileDropdown = () => {
    return (
        <Dropdown className='menu-dropdown-wrapper'>
            <Dropdown.Toggle
                id="dropdown-basic"
                as="a"
                href="#" className='no-caret'
            >
                <div className="d-inline-flex flex-column align-items-center position-relative justify-content-center">
                    <FaRegUser size={"1.625rem"} />
                    <span className="d-inline-block ms-2 fb-fs-14 fw-600">Account</span>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu align="start" className='menu-wrapper-card'>
                <div className="account-menu">
                    <div className="account-profile-detail">
                    <Avatar style={{ width: '3rem', height: '3rem' }} />
                        <div className="d-inline-block ms-2 account-profile-content">
                            <h6>Piyush Kanwal</h6>
                            <p className="mb-0">+91 1234567890</p>
                        </div>
                    </div>
                    <ul className="list-unstyled list-wrapper">
                        <li className="mb-3">
                            <a href="#" className="d-inline-flex align-items-center fb-fs-16 fw-500">
                                <span className="me-2" style={{minWidth: "1.8rem"}}><FaBox  size={'1.2rem'} color='#D59615' /></span> Order History
                            </a>
                        </li>
                        <li className="mb-3">
                            <a href="#" className="d-inline-flex align-items-center fb-fs-16 fw-500">
                                <span className="me-2" style={{minWidth: "1.8rem"}}><IoLocationOutline size={'1.5rem'}  color='#D59615'/></span> Address Book
                            </a>
                        </li>
                        <li>
                            <a href="#" className="d-inline-flex align-items-center fb-fs-16 fw-500">
                                <span className="me-2" style={{minWidth: "1.8rem"}}><CiLogout size={'1.5rem'} color='#D59615'/></span> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
