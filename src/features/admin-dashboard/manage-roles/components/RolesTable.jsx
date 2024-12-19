import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md"; 
import { deleteProductApi } from "../../../../services/adminApiRoutes";
import { baseURL } from "../../../../utils/constant-variable";
import { RiPencilFill } from "react-icons/ri";


function ProductTable() {

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
        <Column field="sno" header="S.NO" body={(index) => role.indexOf(index) + 1}></Column>
        <Column field="title" header="TITLE" ></Column> 
        <Column field="permission" header="PERMISSIONS"></Column>
        <Column header="ACTION" body={editButtonTemplate}></Column>
      </DataTable>
    </>
  );
}

export default ProductTable;
