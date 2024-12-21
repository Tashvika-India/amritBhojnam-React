import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md"; 
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function NutritionValueTable({nutritionValue }) {
    // const [nutrition, getNutrition] = useState([
    //         {
    //             sno:"1",
    //            nutrition_id: "#345678",
    //           nutrition_value: "carbs",
    //         },
    //     ])

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
    <DataTable
      value={nutritionValue}
      responsiveLayout="scroll"
      paginator
      rows={10}
      rowkey="id"
    >
      <Column field="sno" header="S.NO" body={(index) => nutritionValue.indexOf(index) + 1}></Column>
      <Column field="nutrition_id" header="NUTRITION ID"></Column>
      <Column field="nutrition_value" header="NUTRITION VALUE"></Column>
      <Column header="ACTION" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default NutritionValueTable;
