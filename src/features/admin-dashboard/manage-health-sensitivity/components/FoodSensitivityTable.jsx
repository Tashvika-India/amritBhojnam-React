import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md"; 
import DeleteModal from "../../../../components/ui/DeleteModal";
import {
  notifyError,
  notifySuccess,
} from "../../../../components/ui/Notification";
import { deleteFoodSensitivity, getMealFoodSensitivityApi } from "../../../../services/adminApiRoutes";
import AddFoodSensitivity from "./AddFoodSensitivity";
import { RiPencilFill } from "react-icons/ri";
import YellowButton from "../../../../components/buttons/YellowButton";
import Loading from "../../../../components/ui/Loading";


function FoodSensitivityTable() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState(null);

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  const handleAddClick = () => {
    setEditData(null); 
    setVisible(true);
  };

  const getMealFoodSensitivity = async () => {
    setLoading(true)
    try {
      const response = await getMealFoodSensitivityApi();
      setData(response?.data?.results)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

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
      await deleteFoodSensitivity(current.id);
      setModalVisible(false);
      setCurrent(null);
      setEditData(null);
      notifySuccess("Food Sensitivity deleted successfully");
      getMealFoodSensitivity();
    } catch (error) {
      console.error("Error deleting nutrition:", error);
      notifyError(error.response?.data?.error);
    }
  };

  useEffect(() => {
    getMealFoodSensitivity();
  }, []);

  const editButtonTemplate = (rowData) => (
    <div className="w-100 d-flex gap-3">
      <button
        title="Edit"
        className="d-flex gap-2 border-0 rounded ms-0"
        onClick={() => handleEditClick(rowData)}
        style={{
          color: "#1F5FBE",
          backgroundColor: "#EDF1FF",
          padding: ".5rem .5rem",
          marginLeft: "1rem",
        }}
      >
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


  return (
    <>
      <div className="row">
        <div className=" d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-500 mb-0 text-dark-grey">Food Sensitivity</h5>
          <YellowButton handleClick={handleAddClick}  lable={"+ Add"} />
        </div>
      </div>
      {
        loading ? <Loading /> :
          <>
            <DataTable value={data} responsiveLayout="scroll" paginator rows={10} rowkey="id">
              <Column field="food_sensitivity" header="NAME" className="fw-400"></Column>
              <Column field="user_count" header="USER" className="fw-400"></Column>
              <Column header="ACTION" body={editButtonTemplate} style={{ width: "20%" }}></Column>
            </DataTable>
            <DeleteModal
              visible={isModalVisible}
              onHide={hideDeleteModal}
              onDelete={handleDelete}
            />
            <AddFoodSensitivity visible={visible} setVisible={setVisible} editData={editData} getMealFoodSensitivity={getMealFoodSensitivity} loading={loading} setLoading={setLoading} />
          </>
      }
    </>
  );
}

export default FoodSensitivityTable;
