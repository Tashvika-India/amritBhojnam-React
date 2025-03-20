import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";

function DashboardCategoryTable({ dashboard }) {

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={rowData.category_img} // Ensure the correct API field is used
          alt={rowData.name}
          style={{ width: "40px", marginRight: "10px" }}
        />
        <span>{rowData.category_name}</span>
      </div>
    );
  };

  // Template for the Edit button
  const editButtonTemplate = () => {
    return (
      <span className="text-orange d-flex gap-2 align-items-center">
        Edit <FaRegEdit />
      </span>
    );
  };

  return (
    <DataTable value={dashboard?.categories || []} responsiveLayout="scroll" paginator rows={4} rowKey="id">
      <Column field="category_name" header="Category" body={imageBodyTemplate} />
      <Column field="total_product_of_category" header="Products" />
      {/* <Column header="Action" body={editButtonTemplate} /> */}
    </DataTable>
  );
}

export default DashboardCategoryTable;
