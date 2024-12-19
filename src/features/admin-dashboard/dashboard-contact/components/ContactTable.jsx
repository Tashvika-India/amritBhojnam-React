import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaRegEdit } from "react-icons/fa";
import banner from "../../../../assets/images/web/web-banner.png";
import IosSwitch from "../../../../components/ui/IosSwitch";
import { baseURL } from "../../../../utils/constant-variable";

function ContactTable() {

  const [contact, setContact] = useState([
          {
              sno:"1",
              name: "Admin",
              email: "shivani.chauhan@fictivebox.com",
              phone: "9845886552",
              message:"I am the user"
          },
      ])

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
    <DataTable value={contact} responsiveLayout="scroll" paginator rows={10} rowkey="id">
      <Column field="sno" header="S.NO"></Column>
      <Column field="name" header="NAME"></Column>
      <Column field="email" header="EMAIL"></Column> 
      <Column field="phone" header="PHONE NO"></Column> 
      <Column field="message" header="MESSAGE"></Column>
    </DataTable>
  );
}

export default ContactTable;
