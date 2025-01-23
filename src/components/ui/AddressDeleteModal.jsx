import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import addressDelete from "../../assets/images/web/address-delete.png"; 

const AddressDeleteModal = ({ visible="", onHide="", onDelete="" }) => {
    const renderFooter = () => {
        return (
          <div className="d-flex justify-content-center gap-3 mb-4">
           
            <Button
              label="Delete"
              className="button-yellow"
              onClick={onDelete}
            />
             <Button
              label="Cancel"
              className="button-set-default"
              onClick={onHide}
            />
          </div>
        );
      };
    
      return (
        <Dialog
          visible={visible}
          style={{ width: "550px", borderRadius: "1rem", overflow: "hidden" }}
          footer={renderFooter()}
          onHide={onHide}
        >
          <div className="delete-content" style={{ textAlign: "center" }}>
            <img
              className="img-fluid mx-auto mb-4"
              src={addressDelete}
              alt="empty-address"
            />
            <h3 className="fw-600 text-yellow">
            Delete Address ?
            </h3>
            <p className="text-dark-grey fb-fs-20 mb-1">
            Are you sure you want to delete this address? This action <br></br> cannot be undone.
            </p>
          </div>
        </Dialog>
      );
}

export default AddressDeleteModal
