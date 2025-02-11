import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md";
import IosSwitch from "../../../../components/ui/IosSwitch"; 
import DeleteModal from "../../../../components/ui/DeleteModal";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";
import { deleteNutritionApi } from "../../../../services/adminApiRoutes";
import { RiPencilFill } from "react-icons/ri";
import AddHealthIssue from "./AddHealthIssue";
import YellowButton from "../../../../components/buttons/YellowButton";

function  HealthIssueTable() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
    const [visible, setVisible] = useState(false);

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  const showDeleteModal = (nutrition) => {
    setCurrent(nutrition);
    setModalVisible(true);
  };

  const hideDeleteModal = () => {
    setModalVisible(false);
    setCurrent(null);
  };

  const handleDelete = async () => {
    try {
      await deleteNutritionApi(current.id);
      setModalVisible(false);
      setCurrent(null);
      getNutrition();
      notifySuccess("Nutrition deleted successfully");
    } catch (error) {
      console.error("Error deleting nutrition:", error);
      notifyError(error.response?.data?.error);
    }
  };
  const editButtonTemplate = (rowData) => (
    <div className="w-100 d-flex gap-3">
      <button
        title="Edit"
        className="d-flex gap-2 border-0 rounded ms-0"  onClick={() => handleEditClick(rowData)}
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

  const iosSwitchTemplate = (rowData) => {
    const handleToggleChange = (event) => {
      const updatedStatus = event.target.checked;
      bannerStatusChange(rowData, updatedStatus);
    };
    return (
      <IosSwitch
        name="is_active"
        checked={rowData.is_active}
        onChange={handleToggleChange}
      />
    );
  };

  return (
    <>
  <div className="row">
        <div className=" d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-500 mb-0 text-dark-grey">Health Issue</h5>
          <YellowButton handleClick={() => setVisible(true)} lable={"+ Add"} />
        </div>
      </div>
        <DataTable
        responsiveLayout="scroll"
        paginator
        rows={10}
        rowkey="id"
      >
        <Column field="name" header="NAME"></Column>
        <Column field="unit" header="UNIT"></Column>
        <Column header="ACTION" body={editButtonTemplate}></Column>
      </DataTable>
      <DeleteModal
        visible={isModalVisible}
        onHide={hideDeleteModal}
        onDelete={handleDelete}
      />
      <AddHealthIssue
                    visible={visible}
                    setVisible={setVisible}
                  
                    
                  />
    </>
  );
}

export default HealthIssueTable;
