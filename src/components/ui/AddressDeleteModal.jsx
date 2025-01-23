import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import addressDelete from "../../assets/images/web/address-delete.png";

const AddressDeleteModal = ({ visible, onHide, onDelete }) => {
  const renderFooter = () => (
    <div className="d-flex justify-content-center gap-3 mb-4">
      <button 
        className="button-yellow fs-6 mt-0 px-4"
        onClick={onDelete}
        disabled={false}
      >
        Delete
      </button>
      <button 
        className="button-set-default mt-0 px-4"
        onClick={onHide}
      >
        Cancel
        </button>
    </div>
  );

  return (
    <Dialog
      visible={visible}
      style={{ width: "34.375rem", borderRadius: "1rem", overflow: "hidden" }}
      footer={renderFooter()}
      draggable={false}
      position="center"
      onHide={onHide}>
      <div className="delete-content" style={{ textAlign: "center" }}>
        <img className="img-fluid mx-auto mb-4" src={addressDelete} alt="empty-address"/>
        <h3 className="fw-500 text-yellow">Delete Address?</h3>
        <h6 className="text-dark-grey fw-400">
          Are you sure you want to delete this address? This action <br /> cannot be undone.
        </h6>
      </div>
    </Dialog>
  );
};

export default AddressDeleteModal;
