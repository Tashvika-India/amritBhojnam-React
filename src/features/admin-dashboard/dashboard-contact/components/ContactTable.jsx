import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
function ContactTable({ contact, filter, setContact }) {
  console.log(filter);
  useEffect(() => {
    if (!filter) {
      return;
    }

    if (filter === "subscribe") {
      const filteredData = contact?.filter((detail) => detail?.name === filter);
      setContact(filteredData);
    } else if (filter === "unSubcribed") {
      console.log("called");
      const filteredData = contact?.filter(
        (detail) => detail?.name !== "subscribe"
      );
      setContact(filteredData);
    }
  }, [filter]);
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
