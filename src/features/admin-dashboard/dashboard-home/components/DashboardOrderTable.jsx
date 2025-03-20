import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column"; 
function DashboardOrderTable({dashboard}) {
  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={rowData?.order_items[0]?.product_img}
          alt={rowData?.order_items[0]?.product_name}
          style={{ width: "80px" }}
        />
        <small>{rowData?.order_items[0]?.product_name}</small>
      </div>
    );
  };

  // Template for the Edit button
  const statusTemplate = (rowData) => {
    return (
      <p className="fw-500 text-capitalize">
          {rowData.order_status}
      </p>
    );
  };

  return (
    <DataTable value={dashboard?.recent_orders} responsiveLayout="scroll"  paginator rows={4} rowKey="id" >
      <Column  header="Product" body={imageBodyTemplate}></Column>
      <Column header="Status" body={statusTemplate}></Column>
      <Column  field="delivery_date"  header="Delivery Date"></Column>
    </DataTable>
  );
}

export default DashboardOrderTable;
