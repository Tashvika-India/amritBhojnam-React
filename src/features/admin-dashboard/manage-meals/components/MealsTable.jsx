import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RiPencilFill } from "react-icons/ri";


function MealsTable() {

    const [role, setRole] = useState([
        {
            sno:1,
            title: "Admin",
            permission: "[user,admin,order]"
        },
    ])


  const editButtonTemplate = () => (
    <div className="w-100 d-flex gap-1 ">
      <button
         title="Edit"
        className="d-flex gap-2 align-items-center border-0 rounded me-3"
        style={{ color: "#1F5FBE", backgroundColor: "#EDF1FF", padding:".5rem .5rem", marginLeft: "1rem" }}
      >
        <RiPencilFill size={20} />
      </button>
    </div>
  );

  

  return (
    <>
      <DataTable value={role} responsiveLayout="scroll" paginator rows={10}>
        <Column field="food-item" header="FOOD ITEM" body={(index) => role.indexOf(index) + 1}></Column>
        <Column field="quantity" header="QUANTITY" ></Column> 
        <Column field="calories" header="CALORIES"></Column>
        <Column field="protein" header="PROTEIN"></Column>
        <Column field="carbs" header="CARBS"></Column>
        <Column field="fat" header="FAT"></Column>
        <Column header="ACTION" body={editButtonTemplate}></Column>
      </DataTable>
    </>
  );
}

export default MealsTable;
