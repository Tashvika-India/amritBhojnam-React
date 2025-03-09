import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";
import { notifySuccess } from "../../../../components/ui/Notification";

function CategoryTable({ categories, setEditData, setVisible, categoriesStatusChange, getCategories }) {
  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  const iosSwitchTemplate = (rowData) => {
    const handleToggleChange = (event) => {
      const updatedStatus = event.target.checked;
      categoriesStatusChange(rowData, updatedStatus);  
      notifySuccess("Status updated successfully");
      getCategories();
    };

    return (
      <IosSwitch
        name="is_active"
        checked={rowData.is_active}
        onChange={handleToggleChange}
      />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={baseURL + rowData?.img_file}
          alt={rowData?.name}
          className="img-fluid" style={{ width: "3.5rem", height: "4.5rem" }}
        />
      </div>
    );
  };

  const editButtonTemplate = (rowData) => {
    return (
      <button className="text-orange d-flex gap-2 align-items-center border-0 bg-white" onClick={() => handleEditClick(rowData)}>
        Edit <FaRegEdit />
      </button>
    );
  }; 
  
  return (
    <DataTable value={categories} responsiveLayout="scroll" paginator rows={10} rowkey="id">
      <Column   header="S.NO" body={(index) => categories.indexOf(index) + 1}></Column>
      <Column field="image" header="IMAGE" body={imageBodyTemplate}></Column>
      <Column field="name" header="NAME" className="fw-400"></Column>
      <Column field="product_count" header="Products"></Column>
      <Column field="is_active" header="Status" body={iosSwitchTemplate}></Column>
      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default CategoryTable;
