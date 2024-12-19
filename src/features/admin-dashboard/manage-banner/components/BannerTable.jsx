import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function BannerTable({banner , setEditData , setVisible, bannerStatusChange}) {

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={baseURL + rowData?.img_file}
                alt={rowData?.name}
                className="img-fluid" style={{ width: "3.5rem", height: "4.5rem" }}
              />
            </div>
    );
  };

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

    // Template for the Edit button
    const editButtonTemplate = (rowData) => {
      return (
        <button className="text-orange d-flex gap-2 align-items-center border-0 bg-white" onClick={()=> handleEditClick(rowData)}>
          Edit <FaRegEdit /> 
        </button>
      );
    };

  return (
    <DataTable value={banner} responsiveLayout="scroll" paginator rows={10} rowkey="id">
      <Column field="id" header="ID" body={(index) => banner.indexOf(index) + 1}></Column>
      <Column field="img_file" header="IMAGE" body={imageBodyTemplate}></Column>
      <Column field="title" header="Title"></Column> 
      <Column field="platform" header="PLATFORM"></Column> 
      <Column field="is_active" header="STATUS" body={iosSwitchTemplate}></Column>
      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default BannerTable;
