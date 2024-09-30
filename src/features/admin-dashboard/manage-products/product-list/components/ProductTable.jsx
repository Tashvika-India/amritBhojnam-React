import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../../../../../components/ui/DeleteModal";
import { MdDelete } from "react-icons/md"; 
import { deleteProductApi } from "../../../../../services/adminApiRoutes";

function ProductTable({ products , getProductList }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);  // Store the current product in one state
  const navigate = useNavigate();

  const showDeleteModal = (product) => {
    setCurrentProduct(product);  // Store the product to delete
    setModalVisible(true);
  };

  const hideDeleteModal = () => {
    setModalVisible(false);
    setCurrentProduct(null);  // Reset current product after modal is closed
  };

  const handleDelete = async () => {
    try {
      await deleteProductApi(currentProduct.id);  // Use currentProduct directly
      console.log("Record deleted successfully");
      hideDeleteModal();
      // Optionally update your product list here (e.g., remove the deleted product from UI)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (rowData) => {
    navigate("/edit-product", { state: rowData });
  };

  const imageBodyTemplate = (rowData) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={rowData.image}
        alt={rowData.name}
        style={{ width: "40px", marginRight: "10px" }}
      />
    </div>
  );

  const linkToReview = (rowData) => (
    <Link to="/product/product-reviews" className="text-dark">
      {rowData.name}
    </Link>
  );

  const editButtonTemplate = (rowData) => (
    <div className="w-100 d-flex gap-1 ">
      <button
        onClick={() => handleEditClick(rowData)} title="Edit"
        className="text-orange d-flex gap-2 align-items-center border-0 bg-white"
      >
        <FaRegEdit size={23} />
      </button>
      <button
        className="text-danger d-flex gap-2 align-items-center border-0 bg-white" title="Delete"
        onClick={() => showDeleteModal(rowData)}  // Pass the entire rowData
      >
        <MdDelete size={25} />
      </button>
    </div>
  );

  const iosSwitch = () => (
    <span className="d-flex gap-2 align-items-center">
      <FaStar className="text-warning" /> 5
    </span>
  );

  return (
    <>
      <DataTable value={products} responsiveLayout="scroll" paginator rows={10}>
        <Column field="s.no" header="ID" body={(index) => products.indexOf(index) + 1}></Column>
        <Column field="images" header="Image" body={imageBodyTemplate}></Column>
        <Column field="name" header="Name" body={linkToReview}></Column>
        <Column field="quantity" header="Stocks"></Column>
        <Column field="quantity_unit" header="Unit"></Column>
        <Column field="max_price" header="Price"></Column>
        <Column field="offer_price" header="Selling"></Column>
        <Column field="ratings" header="Rating" body={iosSwitch}></Column>
        <Column header="Action" body={editButtonTemplate}></Column>
      </DataTable>

      {/* Delete Modal */}
      <DeleteModal
        visible={isModalVisible}
        onHide={hideDeleteModal}
        onDelete={handleDelete}  // Directly pass handleDelete
      />
    </>
  );
}

export default ProductTable;
