import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const DeleteModal = ({ visible, onHide, onDelete }) => {
  const renderFooter = () => {
    return (
      <div className="d-flex justify-content-center gap-3">
        <Button label="Cancel" icon="pi pi-times" className="bg-danger border-0 rounded-3" onClick={onHide} />
        <Button label="Delete" icon="pi pi-trash" className="bg-dark border-0 rounded-3" onClick={onDelete} />
      </div>
    );
  };

  return (
    <Dialog
      header="Delete Record"
      visible={visible}
      style={{ width: '350px', borderRadius: '1rem',overflow: 'hidden' }}
      footer={renderFooter()}
      onHide={onHide}
    >
      <div className="delete-content" style={{ textAlign: 'center' }}>
        <i className="pi pi-trash" style={{ fontSize: '6rem', color: 'red' }}></i>
        <p style={{ marginTop: '1rem' }}>
          Are you sure you want to delete this record? This action cannot be undone.
        </p>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
