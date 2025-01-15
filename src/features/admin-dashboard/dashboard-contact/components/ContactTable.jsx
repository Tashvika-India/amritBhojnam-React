import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column"; 
function ContactTable({contact}) { 
  
  return (
    <DataTable value={contact} responsiveLayout="scroll" paginator rows={10} rowkey="id">
      <Column field="id" header="ID" className="w-25"></Column>
      <Column field="name" header="NAME"></Column>
      <Column field="email" header="EMAIL"></Column> 
      <Column field="phone" header="PHONE NO"></Column> 
      <Column field="message" header="MESSAGE"></Column>
    </DataTable>
  );
}

export default ContactTable;
