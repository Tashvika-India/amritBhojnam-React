import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


function ContactTable({ contact, filter, setContact }) {
  const [originalContact, setOriginalContact] = useState([]); 

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
      <Column field="id" header="ID"></Column>
      <Column field="name" header="NAME" style={{ width: "12rem" }}></Column>
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
