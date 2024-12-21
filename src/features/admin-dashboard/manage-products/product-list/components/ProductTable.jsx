import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../../../../../components/ui/DeleteModal";
import { MdDelete } from "react-icons/md";
import { deleteProductApi } from "../../../../../services/adminApiRoutes";
import { baseURL } from "../../../../../utils/constant-variable";
import { RiPencilFill } from "react-icons/ri";

function ProductTable({ products, getProductList }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Store the current product in one state
  const navigate = useNavigate();

  const showDeleteModal = (product) => {
    setCurrentProduct(product); // Store the product to delete
    setModalVisible(true);
  };

  const hideDeleteModal = () => {
    setModalVisible(false);
    setCurrentProduct(null); // Reset current product after modal is closed
  };

  const handleDelete = async () => {
    try {
      await deleteProductApi(currentProduct.id); // Use currentProduct directly
      getProductList();
      console.log("Record deleted successfully");
      hideDeleteModal();
      // Optionally update your product list here (e.g., remove the deleted product from UI)
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (rowData) => {
    navigate("/admin/edit-product", { state: rowData });
  };

  const imageBodyTemplate = (rowData) => {

    const imageUrl = rowData?.images[0]?.image;   
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={rowData?.images?.[0]?.image}
          alt={rowData?.name}
          className="img-fluid"
          style={{ width: "3.5rem", height: "4rem" }}
        />
      </div>
    );
  };

  const linkToReview = (rowData) => (
    <Link to="/product/product-reviews" className="text-dark fw-normal">
      {rowData.name}
    </Link>
  );

  const editButtonTemplate = (rowData) => (
    <div className="w-100 d-flex gap-1 ">
      <button
        onClick={() => handleEditClick(rowData)}
        title="Edit"
        className="d-flex gap-2 align-items-center border-0 rounded me-3"
        style={{
          color: "#1F5FBE",
          backgroundColor: "#EDF1FF",
          padding: ".1rem .45rem",
        }}
      >
        <RiPencilFill size={20} />
      </button>
      <button
        className="text-danger d-flex gap-2 align-items-center border-0 rounded"
        title="Delete"
        style={{ backgroundColor: "#d5768f38", paddingBlock: ".3rem" }}
        onClick={() => showDeleteModal(rowData)}
      >
        <MdDelete size={20} />
      </button>
    </div>
  );

  const iosSwitch = (rowData) => (
    <Link
      to={`/product/product-reviews/${rowData.id}`}
      className="d-flex gap-2 align-items-center"
    >
      <FaStar className="text-warning" /> {Math.round(rowData.ratings)}
    </Link>
  );

  return (
    <>
      <DataTable value={products} responsiveLayout="scroll" paginator rows={50}>
        <Column
          field="id"
          header="SR.NO"
          body={(index) => products.indexOf(index) + 1}
          className="fw-400"
        ></Column>
        <Column field="images" header="IMAGE" body={imageBodyTemplate}></Column>
        <Column field="name" header="NAME" className="fw-400"></Column>
        {/* <Column
          field="category_name"
          header="CATEGORY"
          className="fw-400"
        ></Column> */}
        <Column
          field="quantity"
          header="QUANTITY(type)"
          className="fw-400"
        ></Column>
        <Column field="stock" header="Stocks Left" className="fw-400"></Column>
        <Column
          field="max_price"
          header="PRICE (₹)"
          className="fw-400"
        ></Column>
        <Column field="offer_price" header="SALE PRICE (₹)" className="fw-400">
          {" "}
        </Column>
        {/* <Column field="ratings" header="RATING" body={iosSwitch}></Column> */}
        <Column header="ACTION" body={editButtonTemplate}></Column>
      </DataTable>

      {/* Delete Modal */}
      <DeleteModal
        visible={isModalVisible}
        onHide={hideDeleteModal}
        onDelete={handleDelete} // Directly pass handleDelete
      />
    </>
  );
}

export default ProductTable;
