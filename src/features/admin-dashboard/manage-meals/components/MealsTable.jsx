import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RiPencilFill } from "react-icons/ri";
import image from "../../../../assets/images/dashboard/product-one.png"
import { MdDelete } from "react-icons/md";
import DeleteModal from "../../../../components/ui/DeleteModal";
import { deleteMealApi } from "../../../../services/adminApiRoutes";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";
import { Navigate, useNavigate } from "react-router-dom";


function MealsTable({ data,getMealList }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const navigate = useNavigate(); 
  
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
        onClick={() => navigate("/admin/edit-meals", { state: rowData })}
        className="d-flex gap-2 align-items-center border-0 rounded me-3"
        style={{ color: "#1F5FBE", backgroundColor: "#EDF1FF", padding: ".5rem .5rem", marginLeft: "1rem" }}>
        <RiPencilFill size={20} />
      </button>
      <button
        className="text-danger d-flex gap-2 align-items-center border-0 rounded"
        title="Delete"
        style={{ backgroundColor: "#d5768f38", padding: ".3rem .523rem" }}
        onClick={() => showDeleteModal(rowData)}>
        <MdDelete size={20} />
      </button>
    </div>
  );

  const ImageBody = (rowData) => (
    <div className="d-flex align-items-center gap-3"> 
          <img
            src={rowData?.image}
            alt={rowData?.name}
            className="img-fluid" style={{ width: "60px", height: "60px", objectFit : "cover" }}
          />  
        <p className="fw-400">{rowData?.name}</p> 
    </div>
  )

  const  ListBody = (rowData) => (
    <div className="ul"> 
        {
          rowData?.food_preference?.map((item) => {
            return (
              <li className="fw-400">{item}</li>
            )
          })
        } 
    </div>
  )


  return (
    <>
      <DataTable value={data} responsiveLayout="scroll" paginator rows={10}>
        <Column field="name" header="FOOD ITEM" body={ImageBody} ></Column>
        <Column field="food_preference" header="Food Preference" body={ListBody} ></Column>
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
