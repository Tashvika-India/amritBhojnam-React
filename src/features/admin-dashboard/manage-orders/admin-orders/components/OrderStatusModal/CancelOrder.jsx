import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import cancelModalImg from "../../../../../../assets/images/dashboard/cancel-modal.png";
import { TextField } from "@mui/material";

const CancelOrder = ({ onHide, onDelete }) => {
    const [visible, setVisible] = useState(false);

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
    const renderFooter = () => {
        return (
            <div className="d-flex justify-content-center gap-3 mb-4">
                <button className="button-yellow px-4 fs-6 fw-500 rounded-3" onClick={onHide}>Yes Cancel</button>
                <button className="bright-red-button-reverse fw-500" onClick={onDelete}>No</button>
            </div>
        );
    };
    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Launch demo modal
            </Button>
            <Dialog visible={visible}
                draggable={false}
                style={{ width: '34.375rem', borderRadius: '1rem', overflow: 'hidden' }}
                footer={renderFooter()}
                onHide={onHide}>
                <div className="delete-content" style={{ textAlign: 'center' }}>
                    <img className="img-fluid mb-2 mx-1 d-inline-block" src={cancelModalImg} alt="star" />
                    <h5 className='fw-600 mb-0 fb-fs-26 text-center'>Are you sure ?</h5>
                    <h6 className='fw-400 lh-lg text'>You want to cancel this order</h6>
                    <p className='text-center' style={{ color: "#584EE0" }}>#634782</p>
                </div>
                <div className="mt-3">
                    <div className="col-12">
                        <TextField
                            label="Add reason"
                            name='cancel_reason'
                            variant="outlined"
                            onChange={(e) => setRemarks(e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                            placeholder="Enter the remarks"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default CancelOrder;
