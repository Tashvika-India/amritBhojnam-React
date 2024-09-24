import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function CategoryTable({categories , setEditData}) {

  console.log("Base Url" , baseURL)


  // Template for displaying category image and name
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={baseURL+rowData.img_file	}
          alt={rowData.name}
          style={{ width: "40px", marginRight: "10px" }}
        />
      </div>
    );
  };

  // Template for the Edit button
  const editButtonTemplate = (rowData) => {
    return (
      <span className="text-orange d-flex gap-2 align-items-center" onClick={()=>setEditData(rowData)}>
        Edit <FaRegEdit />{" "}
      </span>
    );
  };

  const iosSwitch = () => {
    return <IosSwitch />;
  };

  return (
    <DataTable value={categories} responsiveLayout="scroll" paginator rows={10}>
      <Column field="image" header="Image" body={imageBodyTemplate}></Column>
      <Column field="name" header="Name"></Column>
      <Column field="quantity" header="Products"></Column>
      <Column field="status" header="Status" body={iosSwitch}></Column>
      <Column header="Action" body={editButtonTemplate}></Column>
    </DataTable>
  );
}

export default CategoryTable;
