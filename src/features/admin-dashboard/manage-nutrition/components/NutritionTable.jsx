import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";
import DeleteModal from "../../../../components/ui/DeleteModal";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";
import { delteNutritionApi } from "../../../../services/adminApiRoutes";

function NutritionTable({ nutrition, getNutrition }) {
   const [isModalVisible, setModalVisible] = useState(false);
   const [current, setCurrent] = useState(null); 
  //   const [nutrition, getNutrition] = useState([
  //           {
  //             //   sno:"1",
  //             //   name: "Admin",
  //             //   unit: "4",
  //           },
  //       ])

    const showDeleteModal = (nutrition) => {
      setCurrent(nutrition); // Store the product to delete
      setModalVisible(true);
    };
  
    const hideDeleteModal = () => {
      setModalVisible(false);
      setCurrent(null); // Reset current product after modal is closed
    };
  
    const handleDelete = async () => {
      try {
        await delteNutritionApi(current.id); // Use current directly
        getNutrition(); 
        hideDeleteModal();
        notifySuccess("Nutrition deleted successfully");
        // Optionally update your product list here (e.g., remove the deleted product from UI)
      } catch (error) {
        console.error("Error deleting nutrition:", error);
        notifyError(error.response?.data?.error);
      }
    };

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={baseURL + rowData.img_file}
          alt={rowData.name}
          className="img-fluid img-table-thumbnail"
        />
      </div>
    );
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
