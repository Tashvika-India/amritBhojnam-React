import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function ProductTable({products}) {

  const navigate = useNavigate();

  const handleEditClick = (rowData) => {
    navigate("/edit-product", { state: rowData });
  };

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
  const editButtonTemplate = (rowData) => {
    return (
      <button
        onClick={() => handleEditClick(rowData)}
        className="text-orange d-flex gap-2 align-items-center border-0 bg-white"
      >
        Edit <FaRegEdit />
      </button>
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
    <DataTable value={products} responsiveLayout="scroll" paginator rows={10}>
      <Column field="s.no" header="ID" body={(index) => products.indexOf(index)}></Column>
      <Column field="images" header="Image" body={imageBodyTemplate}></Column>
      <Column field="name" header="Name" body={linkToReview}></Column>
      <Column field="quantity" header="Stocks"></Column>
      <Column field="quantity_unit" header="Unit"></Column>
      <Column field="max_price" header="Price"></Column>
      <Column field="offer_price" header="Selling"></Column>
      <Column field="ratings" header="Rating" body={iosSwitch}></Column>
      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default ProductTable;
