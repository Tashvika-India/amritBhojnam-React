import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import productOne from "@/assets/images/dashboard/product-one.png";
import productTwo from "@/assets/images/dashboard/product-two.png";
import productThree from "@/assets/images/dashboard/product-three.png";
import productFour from "@/assets/images/dashboard/product-four.png";
import productFive from "@/assets/images/dashboard/product-five.png";

function DashboardCategoryTable() {
  const categories = [
    { id: 1, name: "Millet Rice", quantity: 42, image: productOne },
    { id: 2, name: "Bakery & Confectionery", quantity: 46, image: productTwo },
    { id: 3, name: "Flour", quantity: 24, image: productThree },
    { id: 4, name: "Instant Mixes", quantity: 56, image: productFour },
    // { id: 5, name: "Snacks for Munching", quantity: 23, image: productFive },
    // { id: 6, name: "Snacks for Munching", quantity: 54, image: productOne },
  ];

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={rowData.image}
          alt={rowData.name}
          style={{ width: "40px", marginRight: "10px" }}
        />
        <span>{rowData.name}</span>
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
    <DataTable value={categories} responsiveLayout="scroll" rows={3}>
      <Column field="name" header="Category" body={imageBodyTemplate}></Column>
      <Column field="quantity" header="Products"></Column>
      {/* <Column header="Action" body={editButtonTemplate}></Column> */}
    </DataTable>
  );
}

export default DashboardCategoryTable;
