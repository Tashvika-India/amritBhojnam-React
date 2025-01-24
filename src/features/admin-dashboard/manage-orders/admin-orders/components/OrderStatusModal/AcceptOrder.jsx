import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import acceptModalImg from "../../../../../../assets/images/dashboard/accept-modal.png";

const AcceptOrder = ({ onHide, onDelete }) => {
    const [visible, setVisible] = useState(false);
    const renderFooter = () => {
        return (
            <div className="d-flex justify-content-center gap-3 mb-4">
                <button className="button-yellow px-5 fs-6 fw-500 rounded-3" onClick={onHide}>Accept</button>
                <button className="bright-red-button-reverse fw-500 " onClick={onDelete}>No</button>
            </div>
        );
    };
    return (
        <>
            <Button variant="primary" onClick={() => setVisible(true)}>
                Accept
            </Button>
            <Dialog visible={visible}
            draggable={false}
                style={{ width: '34.375rem', borderRadius: '1rem', overflow: 'hidden' }}
                footer={renderFooter()}
                onHide={onHide}>
                <div className="delete-content" style={{ textAlign: 'center' }}>
                    <img className="img-fluid my-3 d-inline-block" src={acceptModalImg} alt="star" />
                    <h5 className='fw-600 mb-0 my-3 fb-fs-26 text-center ps-0'>Accept Order ?</h5>
                    <h6 className='fw-400 lh-lg text'>You’re about to confirm this order</h6>
                    <p className='text-center' style={{ color: "#584EE0" }}>#634782</p>
                </div>
            </Dialog>
        </>
    );
};

export default AcceptOrder;
