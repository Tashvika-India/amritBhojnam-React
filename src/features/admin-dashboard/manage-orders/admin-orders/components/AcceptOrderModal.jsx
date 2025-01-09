import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { notifyError, notifySuccess } from '../../../../../components/ui/Notification';
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
      notifyError("Something went wrong, please try again.");
      console.error("Error updating order:", error);
    }
  };

  return (
    <Modal show={visible} onHide={setVisible} size="md" centered aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton className={`${(orderStatus?.status) ? 'lt-green-button' : 'lt-red-button'} py-3`}>
        <h5 className='fw-500 mb-0'>Order {(orderStatus?.status) ? 'Accepted' : 'Cancel'}</h5>
      </Modal.Header>
      <Modal.Body>
        {
          (orderStatus?.status) ?
            <h6 className='fw-400 lh-lg text'>Are you sure you want to accept this order?</h6>
            :
            <>
              <div className="row">
                <div className="col-12">
                  <TextField
                    label="Remarks"
                    name='cancel_reason'
                    variant="outlined"
                    onChange={(e) => setRemarks(e.target.value)}
                    multiline
                    rows={6}
                    fullWidth
                    placeholder="Enter the remarks"
                  />
                </div>
              </div>
            </>
        }
      </Modal.Body>
      <Modal.Footer>
        <button type='button' className="lt-green-button" onClick={handleAcceptOrder} hidden={!(orderStatus?.status)}>Submit</button>
        <button type='button' className="lt-red-button" onClick={handleAcceptOrder} disabled={!remarks} hidden={(orderStatus?.status)}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
}

export default AcceptOrderModal;
