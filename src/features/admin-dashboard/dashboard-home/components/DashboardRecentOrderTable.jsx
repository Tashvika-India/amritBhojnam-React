import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import productOne from "@/assets/images/dashboard/product-one.png";
import productTwo from "@/assets/images/dashboard/product-two.png";
import productThree from "@/assets/images/dashboard/product-three.png";
import productFour from "@/assets/images/dashboard/product-four.png";
import productFive from "@/assets/images/dashboard/product-five.png";
import { Rating } from "primereact/rating";

function DashboardRecentOrderTable({dashboard}) {

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={rowData.product_img}
          alt={rowData.name}
          style={{ width: "40px", marginRight: "10px" }}
        />
        <div className="d-inline-flex flex-column">
          <span>{rowData.product_name}</span>
          <span><Rating value={rowData.rating || 0} readOnly stars={5} cancel={false} /></span>
        </div>
      </div>
    );
  };

  // Template for the Edit button
  const editButtonTemplate = () => {
    return (
      <span className="text-orange d-flex gap-2 align-items-center">
        Edit <FaRegEdit />{" "}
      </span>
    );
  };

  return (
    <DataTable value={dashboard?.top_selling_product || []} responsiveLayout="scroll">
      <Column field="product_name" header="Product" body={imageBodyTemplate}></Column>
      <Column field="offer_price" header="Price"></Column> 
    </DataTable>
  );
}

export default DashboardRecentOrderTable;
