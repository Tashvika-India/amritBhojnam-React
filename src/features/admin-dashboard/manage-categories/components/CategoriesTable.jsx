import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import productOne from "@/assets/images/dashboard/product-one.png";
import productTwo from "@/assets/images/dashboard/product-two.png";
import productThree from "@/assets/images/dashboard/product-three.png";
import productFour from "@/assets/images/dashboard/product-four.png";
import productFive from "@/assets/images/dashboard/product-five.png";
import IosSwitch from "../../../../components/ui/IosSwitch";

function CategoryTable() {
  const categories = [
    { id: 1, name: "Millet Rice", quantity: 42, image: productOne },
    { id: 2, name: "Bakery & Confectionery", quantity: 46, image: productTwo },
    { id: 3, name: "Flour", quantity: 24, image: productThree },
    { id: 4, name: "Instant Mixes", quantity: 56, image: productFour },
    { id: 5, name: "Snacks for Munching", quantity: 23, image: productFive },
    { id: 6, name: "Snacks for Munching", quantity: 54, image: productOne },
    { id: 7, name: "Millet Rice", quantity: 42, image: productOne },
    { id: 8, name: "Bakery & Confectionery", quantity: 46, image: productTwo },
    { id: 9, name: "Flour", quantity: 24, image: productThree },
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

  const iosSwitch = () => {
    return <IosSwitch />;
  };

  return (
    <DataTable value={categories} responsiveLayout="scroll" paginator rows={10}>
      <Column field="id" header="ID"></Column>
      <Column field="image" header="Image" body={imageBodyTemplate}></Column>

      <Column field="name" header="Name"></Column>
      <Column field="quantity" header="Products"></Column>
      <Column field="status" header="Status" body={iosSwitch}></Column>

      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default CategoryTable;
