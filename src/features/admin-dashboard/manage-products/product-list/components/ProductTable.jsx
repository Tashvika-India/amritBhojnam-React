import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import productOne from "@/assets/images/dashboard/product-one.png";
import productTwo from "@/assets/images/dashboard/product-two.png";
import productThree from "@/assets/images/dashboard/product-three.png";
import productFour from "@/assets/images/dashboard/product-four.png";
import productFive from "@/assets/images/dashboard/product-five.png";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

function ProductTable() {
  const categories = [
    {
      id: 1,
      name: "Millet Rice",
      quantity: 42,
      image: productOne,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 2,
      name: "Bakery & Confectionery",
      quantity: 46,
      image: productTwo,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 3,
      name: "Flour",
      quantity: 24,
      image: productThree,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 4,
      name: "Instant Mixes",
      quantity: 56,
      image: productFour,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 5,
      name: "Snacks for Munching",
      quantity: 23,
      image: productFive,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 6,
      name: "Snacks for Munching",
      quantity: 54,
      image: productOne,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 7,
      name: "Millet Rice",
      quantity: 42,
      image: productOne,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
    {
      id: 8,
      name: "Bakery & Confectionery",
      quantity: 46,
      image: productTwo,
      stocks: 95,
      price: 100,
      rating: 5,
      selling: 56,
    },
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


  const linkToReview = (rowData) => {
    return (
      <Link to="/product/product-reviews" className="text-dark">
         {rowData.name}
      </Link>
    
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
    return (
      <span className="d-flex gap-2 align-items-center">
        <FaStar className="text-warning" /> 5
      </span>
    );
  };

  return (
    <DataTable value={categories} responsiveLayout="scroll" paginator rows={10}>
      <Column field="id" header="ID"></Column>
      <Column field="image" header="Image" body={imageBodyTemplate}></Column>
      <Column field="name" header="Name" body={linkToReview}></Column>
      <Column field="quantity" header="Products"></Column>
      <Column field="stocks" header="Stocks"></Column>
      <Column field="price" header="Price"></Column>
      <Column field="selling" header="Selling"></Column>
      <Column field="rating" header="Rating" body={iosSwitch}></Column>
      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default ProductTable;
