import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import productOne from "@/assets/images/dashboard/product-one.png";
import productTwo from "@/assets/images/dashboard/product-two.png";
import productThree from "@/assets/images/dashboard/product-three.png";
import productFour from "@/assets/images/dashboard/product-four.png";
import productFive from "@/assets/images/dashboard/product-five.png";

function DashboardOrderTable() {
  const categories = [
    { id: 1, name: "Millet Rice", price: "Rs. 422", image: productOne ,delivery_date:"05 Aug 2024"},
    { id: 2, name: "Bakery & Confectionery", price: "Rs. 300", image: productTwo,delivery_date:"05 Aug 2024" },
    { id: 3, name: "Flour", price: "Rs. 250", image: productThree,delivery_date:"05 Aug 2024" },
    { id: 4, name: "Instant Mixes", price: "Rs. 100", image: productFour,delivery_date:"05 Aug 2024" },
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
    <DataTable value={categories} responsiveLayout="scroll">
      <Column field="name" header="Product" body={imageBodyTemplate}></Column>
      <Column field="price" header="Price"></Column>
      <Column  field="delivery_date"  header="Delivery Date"></Column>
    </DataTable>
  );
}

export default DashboardOrderTable;
