import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { notifyError, notifySuccess } from '../../../../../components/ui/Notification';
import acceptModalImg from "../../../../../assets/images/dashboard/accept-modal.png";
import cancelModalImg from "../../../../../assets/images/dashboard/cancel-modal.png";
import { getOrderSuccessApi } from '../../../../../services/adminApiRoutes';
import { Button } from 'react-bootstrap';

function AcceptOrderModal({ visible, setVisible, orderStatus, getOrderList }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose} size="md" centered >
        <Modal.Header closeButton className='border-0 align-items-start'>
          <div className='d-block mx-auto' style={{ paddingLeft: "7rem" }}>
            <img className="img-fluid my-3" src={acceptModalImg} alt="star" />
            <h5 className='fw-600 mb-0 my-3 fb-fs-26 text-center ps-0'>Accept Order ?</h5>
          </div>
        </Modal.Header>
        <Modal.Body className='mx-auto'>
          <h6 className='fw-400 lh-lg text'>You’re about to confirm this order</h6>
          <p className='text-center' style={{ color: "#584EE0" }}>#634782</p>
        </Modal.Body>
        <Modal.Footer className='mx-auto border-0'>
          <button type='button' className="button-yellow d-inline-block py-3 px-5">Accept</button>
          <button type='button' className="button-red">No</button>
        </Modal.Footer>
      </Modal>
    </>
  );
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='border-0'>
        <div className='d-block mx-auto' style={{ paddingLeft: "7rem" }}>
          <img className="img-fluid mt-1 mx-1" src={cancelModalImg} alt="star" />
          <h5 className='fw-600 mb-0 fb-fs-26 text-center'>Are you sure ?</h5>
        </div>
      </Modal.Header>
      <Modal.Body className='mx-auto'>
        <h6 className='fw-400 lh-lg text'>You want to cancel this order</h6>
        <p className='text-center' style={{ color: "#584EE0" }}>#634782</p>
        <TextField fullWidth label="Add reason" id="fullWidth" />
      </Modal.Body>
      <Modal.Footer className='mx-auto border-0'>
        <button type='button' className="py-4 px-5 rounded-3 fb-fs-22 button-yellow">Yes Cancel</button>
        <button type='button' className="button-red">No</button>
      </Modal.Footer>
    </Modal>
  );
}

export default AcceptOrderModal;
