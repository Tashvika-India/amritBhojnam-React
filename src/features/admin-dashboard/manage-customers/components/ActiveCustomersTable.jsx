import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'; 
import { Avatar } from 'primereact/avatar'; 
import { darkenColor, getRandomColor, isGreyColor, lightenColor } from '../../../../utils/constant-variable';

const ActiveCustomersTable = ({ customer }) => {
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
                    label={rowData?.full_name?.slice(0, 2)}
                    shape="circle"
                    className="p-4"
                />
                <div>
                    <span>{rowData?.full_name}</span>
                </div>
            </div>
        );
    };
    return (
        <div className="card">
            <DataTable value={customer} paginator rows={10} responsiveLayout="scroll">
                <Column field='id' header="CUSTOMER ID" body={(rowData) => <span title={rowData.id}>{rowData.id.slice(10)}...</span>}></Column>
                <Column field="full_name" header="NAME" body={nameBodyTemplate}></Column>
                <Column field="email" header="EMAIL"></Column>
                <Column field="phone_number" header="PHONE"></Column>
                {/* <Column header="Action" body={actionBodyTemplate}></Column> */}
            </DataTable>

            {/* <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar('Kent Dodds')} />
      <Avatar {...stringAvatar('Jed Watson')} />
      <Avatar {...stringAvatar('Tim Neutkens')} />
    </Stack> */}
        </div>
    )
};

export default ActiveCustomersTable;
