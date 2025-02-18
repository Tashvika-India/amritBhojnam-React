import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { darkenColor, getRandomColor, isGreyColor, lightenColor } from "../../../../utils/constant-variable"; 
import { Avatar } from "primereact/avatar";


function ContactTable({ contact, filter, setContact }) {
  const [originalContact, setOriginalContact] = useState([]); 

   const nameBodyTemplate = (rowData) => {
          let backgroundColor = getRandomColor(); 
          if (isGreyColor(backgroundColor)) {
              backgroundColor = lightenColor(backgroundColor, 0.3);  
          } 
          backgroundColor = lightenColor(backgroundColor, 0.5);   
          const textColor = darkenColor(backgroundColor, 0.3); 
  
          return (
              <div className="d-flex align-items-center gap-3">
                  <Avatar
                      style={{ backgroundColor: backgroundColor, color: textColor, textTransform: 'uppercase' }}
                      label={rowData?.name?.slice(0, 2)}
                      shape="circle"
                      className="p-4"
                  />
                  <div>
                      <span>{rowData?.name}</span>
                  </div>
              </div>
          );
      };
  

  useEffect(() => {
    if (contact.length > 0 && originalContact.length === 0) {
      setOriginalContact(contact);
    }
  }, [contact]);
  

  useEffect(() => {
    if (!filter || filter === "all") {
      setContact(originalContact);
    } else if (filter === "subscribe") {
      setContact(originalContact.filter((detail) => detail?.name === "subscribe"));
    } else if (filter === "unSubcribed") {
      setContact(originalContact.filter((detail) => detail?.name !== "subscribe"));
    }
  }, [filter, originalContact]);

  return (
    <DataTable
      value={contact}
      responsiveLayout="scroll"
      paginator
      rows={10}
      rowKey="id"
    >
      <Column field="id" header="ID" body={(index) => contact.indexOf(index) + 1} style={{ width: "5rem" }}></Column>
      <Column field="name" header="NAME" body={nameBodyTemplate} style={{ width: "12rem" }}></Column>
      <Column field="email" header="EMAIL" style={{ width: "20rem" }}></Column>
      <Column
        field="phone"
        header="PHONE NO"
        style={{ width: "15rem" }}
      ></Column>
      <Column
        field="message"
        header="MESSAGE"
        body={(rowData) => (
          <span
            className="text-wrap d-inline-block"
            style={{ wordBreak: "break-all" }}
          >
            {rowData?.message}
          </span>
        )}
        style={{ width: "25rem" }}
      ></Column>
    </DataTable>
  );
}

export default ContactTable;
