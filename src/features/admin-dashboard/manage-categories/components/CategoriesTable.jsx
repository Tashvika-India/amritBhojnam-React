import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function CategoryTable({ categories, setEditData, setVisible, categoriesStatusChange }) {
  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
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
          style={{ width: "3rem" }}
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
      <Column field="id" header="ID" body={(index) => categories.indexOf(index) + 1}></Column>
      <Column field="image" header="Image" body={imageBodyTemplate}></Column>
      <Column field="name" header="Name"></Column>
      {/* <Column field="quantity" header="Products"></Column> */}
      <Column field="is_active" header="Status" body={iosSwitchTemplate}></Column>
      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default CategoryTable;
