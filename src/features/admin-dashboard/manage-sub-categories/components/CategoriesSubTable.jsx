import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";
import { Button } from 'primereact/button';

function CategoriesSubTable({ categories, setEditData, setVisible, categoriesStatusChange }) {
  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };
  const actionBodyTemplate = () => {
    return (
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" />
    );
};
  const iosSwitchTemplate = (rowData) => {
    const handleToggleChange = (event) => {
      const updatedStatus = event.target.checked;
      categoriesStatusChange(rowData, updatedStatus); // Call the passed function
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
          className="img-fluid img-table-thumbnail"
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
      <Column field="id" header="CUSTOMER ID" body={(index) => categories.indexOf(index) + 1}></Column>
      <Column field="name" header="NAME"></Column>
      <Column field="email" header="EMAIL"></Column>
      <Column field="phone" header="PHONE"></Column>
      <Column field="role" header="ROLE"></Column>
      <Column field="is_active" header="STATUS" body={iosSwitchTemplate}></Column>
      <Column header="Action" body={actionBodyTemplate}></Column>
    </DataTable>
  );
}

export default CategoriesSubTable;
