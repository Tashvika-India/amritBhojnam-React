import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RiPencilFill } from "react-icons/ri";
import image from "../../../../assets/images/dashboard/product-one.png"
import { MdDelete } from "react-icons/md";
import DeleteModal from "../../../../components/ui/DeleteModal";
import { deleteMealApi } from "../../../../services/adminApiRoutes";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";


function MealsTable({ data,getMealList }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const showDeleteModal = (data) => {
    setCurrent(data);
    setModalVisible(true);
  };
  const hideDeleteModal = () => {
    setModalVisible(false);
    setCurrent(null);
  };

  const handleDelete = async () => {
    try {
      await deleteMealApi(current?.id);
      setModalVisible(false);
      getMealList();
      setCurrent(null); 
      notifySuccess("Meal item deleted successfully");
    } catch (error) {
      console.error("Error deleting nutrition:", error);
      notifyError(error.response?.data?.error);
    }
  }; 

  const editButtonTemplate = (rowData) => (
    <div className="w-100 d-flex gap-1 ">
      <button
        title="Edit"
        className="d-flex gap-2 align-items-center border-0 rounded me-3"
        style={{ color: "#1F5FBE", backgroundColor: "#EDF1FF", padding: ".5rem .5rem", marginLeft: "1rem" }}>
        <RiPencilFill size={20} />
      </button>
      <button
        className="text-danger d-flex gap-2 align-items-center border-0 rounded"
        title="Delete"
        style={{ backgroundColor: "#d5768f38", paddingBlock: ".3rem" }}
        onClick={() => showDeleteModal(rowData)}>
        <MdDelete size={20} />
      </button>
    </div>
  );

  const ImageBody = (rowData) => (
    <div className="row">
      <div className="col-6">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={image}
            alt={rowData?.name}
            className="img-fluid" style={{ width: "3.5rem", height: "4.5rem" }}
          />
        </div>
      </div>
      <div className="col-6">
        <p>{rowData?.name}</p>
      </div>
    </div>
  )


  return (
    <>
      <DataTable value={data} responsiveLayout="scroll" paginator rows={10}>
        <Column field="name" header="FOOD ITEM" body={ImageBody} ></Column>
        <Column field="food_preference" header="Food Preference" ></Column>
        <Column field="kcal" header="CALORIES"></Column>
        <Column field="protein" header="PROTEIN"></Column>
        <Column field="carbs" header="CARBS"></Column>
        <Column field="fat" header="FAT"></Column>
        <Column header="ACTION" body={editButtonTemplate}></Column>
      </DataTable>

      <DeleteModal
        visible={isModalVisible}
        onHide={hideDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
}

export default MealsTable;
