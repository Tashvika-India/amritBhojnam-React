import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/web/logo.svg';

const MobileMenu = ({ show, onClose }) => {
    return (
        <Offcanvas show={show} onHide={onClose} placement="start">
            <Offcanvas.Header closeButton>
                <img src={logo} alt="logo"  />
            </Offcanvas.Header>
            <Offcanvas.Body>
                
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MobileMenu;
