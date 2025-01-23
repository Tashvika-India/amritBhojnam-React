import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";
import DeleteModal from "../../../../components/ui/DeleteModal";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";
import { deleteNutritionApi } from "../../../../services/adminApiRoutes";

function NutritionTable({ nutrition, getNutrition }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);

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
    <div className="w-100 d-flex gap-1 ">
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
      <DataTable
        value={nutrition}
        responsiveLayout="scroll"
        paginator
        rows={10}
        rowkey="id"
      >
        <Column field="sno" header="S.NO" body={(e) => nutrition.indexOf(e) + 1}></Column>
        <Column field="name" header="NAME"></Column>
        <Column field="unit" header="UNIT"></Column>
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

export default NutritionTable;
