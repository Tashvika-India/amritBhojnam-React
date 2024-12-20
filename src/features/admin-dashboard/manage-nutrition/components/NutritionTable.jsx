import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import banner from "../../../../assets/images/web/web-banner.png";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function NutritionTable({ nutrition , getNutrition }) {

//   const [nutrition, getNutrition] = useState([
//           {
//             //   sno:"1",
//             //   name: "Admin",
//             //   unit: "4",
//           },
//       ])

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={baseURL+rowData.img_file	}
          alt={rowData.name}
          className="img-fluid img-table-thumbnail"
        />
      </div>
    );
  };
   const editButtonTemplate = (rowData) => (
      <div className="w-100 d-flex gap-1 ">
        <button
          className="text-danger d-flex gap-2 align-items-center border-0 rounded" title="Delete"
          style={{ backgroundColor: "#d5768f38", paddingBlock:".3rem" }}
          onClick={() => showDeleteModal(rowData)}  >
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
    <DataTable value={nutrition} responsiveLayout="scroll" paginator rows={10} rowkey="id">
      <Column field="sno" header="S.NO"></Column>
      <Column field="name" header="NAME"></Column>
      <Column field="unit" header="UNIT"></Column> 
       <Column header="ACTION" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default NutritionTable;
