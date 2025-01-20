import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { notifyError, notifySuccess } from '../../../../../components/ui/Notification';
import acceptModalImg from "../../../../../assets/images/dashboard/accept-modal.png";
import cancelModalImg from "../../../../../assets/images/dashboard/cancel-modal.png";
import { getOrderSuccessApi } from '../../../../../services/adminApiRoutes';

function AcceptOrderModal({ visible, setVisible, orderStatus, getOrderList }) {

  const [remarks, setRemarks] = useState('') 
  
  const handleAcceptOrder = async () => {
    try {
      const payload = {
        order_id: orderStatus?.orderId || '',
        status: orderStatus?.status,
        cancel_reason: remarks,
      };
      await getOrderSuccessApi(payload);
      setVisible();
      getOrderList(); 
      notifySuccess('Order updated successfully');
    } catch (error) {
      notifyError(error.response?.data?.error);
      console.error("Error updating order:", error);
    }
  };

  return (
    <Modal show={visible} onHide={setVisible} size="md" centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      <img className="img-fluid mt-1 mx-1" src={acceptModalImg} alt="star" />
        <h5 className='fw-600 mb-0 fb-fs-26 text-center'>Accept Order ?</h5>
      </Modal.Header>
      <Modal.Body>
            <h6 className='fw-400 lh-lg text'>You’re about to confirm this order</h6>
           <p className='text-center' style={{color: "#584EE0"}}>#634782</p>
      </Modal.Body>
      <Modal.Footer>
        <button type='button' className="button-yellow">Accept</button>
        <button type='button' className="button-red">No</button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <Modal show={visible} onHide={setVisible} size="md" centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
      <img className="img-fluid mt-1 mx-1" src={cancelModalImg} alt="star" />
        <h5 className='fw-600 mb-0 fb-fs-26 text-center'>Are you sure ?</h5>
      </Modal.Header>
      <Modal.Body>
            <h6 className='fw-400 lh-lg text'>You want to cancel this order</h6>
           <p className='text-center' style={{color: "#584EE0"}}>#634782</p>
           <TextField fullWidth label="Add reason" id="fullWidth" />
      </Modal.Body>
      <Modal.Footer>
        <button type='button' className="button-yellow">Yes Cancel</button>
        <button type='button' className="button-red">No</button>
      </Modal.Footer>
    </Modal>
  );
}

export default AcceptOrderModal;
