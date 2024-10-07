import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function BannerTable({banner , setEditData , setVisible}) {

  const handleEditClick = (rowData) => {
    setEditData(rowData);
    setVisible(true);
  };

  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={baseURL+rowData.img_file	}
          alt={rowData.name}
          style={{ width: "3.125rem", aspectRatio: "1/1" }}
        />
      </div>
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

  const iosSwitch = () => {
    return <IosSwitch />;
  };

  return (
    <DataTable value={banner} responsiveLayout="scroll" paginator rows={10} rowkey="id">
      <Column field="id" header="ID" body={(index) => banner.indexOf(index) + 1}></Column>
      <Column field="img_file" header="IMAGE" body={imageBodyTemplate}></Column>
      <Column field="title" header="Title"></Column> 
      <Column field="platform" header="PLATFORM"></Column> 
      <Column field="status" header="STATUS" body={iosSwitch}></Column>
      <Column header="ACTION" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default BannerTable;
