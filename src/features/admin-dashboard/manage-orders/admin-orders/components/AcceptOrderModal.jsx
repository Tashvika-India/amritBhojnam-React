import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { notifyError, notifySuccess } from '../../../../../components/ui/Notification';
import { getOrderSuccessApi } from '../../../../../services/adminApiRoutes';
import acceptModalImg from "../../../../../assets/images/dashboard/accept-modal.png";
import cancelModalImg from "../../../../../assets/images/dashboard/cancel-modal.png";

function AcceptOrderModal({ visible, setVisible, orderStatus, getOrderList }) { 

  const [remarks, setRemarks] = useState('') 

  const handleAcceptOrder = async () => {
    try {
      const payload = {
        order_id: orderStatus?.orderId || '',
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
      <Modal.Header className='border-0 pb-0' closeButton></Modal.Header>
      <Modal.Body className='pt-0'>
        {
          (orderStatus?.status) ?
            <div className='d-inline-flex justify-content-center flex-column align-items-center w-100'>
              <img className="img-fluid mt-1 mx-1" src={acceptModalImg} alt="order" />
              <h5 className='fw-600 mb-2 mt-3 fb-fs-26 text-center'>Accept Order ?</h5>
              <p className='mb-0'>You’re about to confirm this order</p>
              <span className='fw-500 d-inline-block mt-2 mb-4' style={{ color: "#584EE0" }}>#{orderStatus?.display_order_id}</span>
            </div>
            :
            <>
              <div className="row px-3">
                <div className="col-12">
                  <div className='d-inline-flex justify-content-center flex-column align-items-center w-100'>
                    <img className="img-fluid mt-1 mx-1" src={cancelModalImg} alt="order" />
                    <h5 className='fw-600 mb-2 mt-3 fb-fs-26 text-center'>Are you sure ?</h5>
                    <p className='mb-0'>You want to cancel this order</p>
                    <span className='fw-500 d-inline-block mt-1 mb-4' style={{ color: "#584EE0" }}>#{orderStatus?.display_order_id}</span>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <TextField
                    label="Add reason"
                    name='cancel_reason'
                    variant="outlined"
                    onChange={(e) => setRemarks(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Enter the reason"
                  />
                </div>
              </div>
            </>
        }
        {/* {(orderStatus?.status) ?
          <div className="d-flex justify-content-center gap-3 mb-3">
            <button className="button-yellow px-5 fs-6 fw-500 rounded-3" onClick={handleAcceptOrder} hidden={!(orderStatus?.status)}>Accept</button>
            <button className="bright-red-button-reverse fw-500" onClick={setVisible}>No</button>
          </div>
          : <div className="d-flex justify-content-center gap-3 mx-auto mb-2">
            <button className="button-yellow px-4 fs-6 fw-500 rounded-3" onClick={handleAcceptOrder} disabled={!remarks} hidden={(orderStatus?.status)} >Yes Cancel</button>
            <button className="bright-red-button-reverse fw-500" onClick={setVisible}>No</button>
          </div>
        } */}
          <div className="d-flex justify-content-center gap-3 mb-3">
            <button className="button-yellow px-5 fs-6 fw-500 rounded-3" onClick={handleAcceptOrder} hidden={!(orderStatus?.status)}>Accept</button>
            <button className="bright-red-button-reverse fw-500" onClick={setVisible}>No</button>
          </div> 
      </Modal.Body>
    </Modal>
  );
}

export default AcceptOrderModal;
