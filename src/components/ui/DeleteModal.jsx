import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import deleteModal from "../../assets/images/dashboard/delete-modal.png";

const DeleteModal = ({ visible, onHide, onDelete }) => {
  const renderFooter = () => {
    return (
      <div className="d-flex justify-content-center gap-3 mb-4">
        <Button label="No" className="bright-red-button-reverse" onClick={onHide} />
        <Button label="Yes Delete" className="bright-red-button" onClick={onDelete} />
      </div>
    );
  };

  return (
    <Dialog

      visible={visible}
      style={{ width: '34.375rem', borderRadius: '1rem', overflow: 'hidden' }}
      footer={renderFooter()}
      onHide={onHide}
    >
      <div className="delete-content" style={{ textAlign: 'center' }}>
        <img
          className="img-fluid mx-auto mb-4"
          src={deleteModal}
          alt="empty-address"
        />
        <h3 className="fw-600" style={{ color: "#EF3A4B" }}>Delete Item ?</h3>
        <p className="text-dark-grey fb-fs-20 mb-1">
        Are you sure you want to delete this item?
        </p>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
