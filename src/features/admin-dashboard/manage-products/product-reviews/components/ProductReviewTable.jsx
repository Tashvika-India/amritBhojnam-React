import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Avatar } from 'primereact/avatar';

const ProductReviewTable = () => {
    const reviews = [
        { customerId: '367332', customerName: 'Aman Kumar', phone: '+91 1234567890', review: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 5, initials: 'AK' },
        { customerId: '634782', customerName: 'Raj Singh', phone: '+91 1234567890', review: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4, initials: 'RS' },
        { customerId: '745883', customerName: 'David', phone: '+91 1234567890', review: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 5, initials: 'D' },
        { customerId: '846272', customerName: 'Piyush', phone: '+91 1234567890', review: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4.5, initials: 'P' },
        { customerId: '857353', customerName: 'Rahul Singh', phone: '+91 1234567890', review: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4.5, initials: 'RS' },
        { customerId: '634782', customerName: 'Mohit Kumar', phone: '+91 1234567890', review: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4, initials: 'MK' }
    ];

    const customerBodyTemplate = (rowData) => {
        return (
            <div className="d-flex align-items-center gap-3">
                <Avatar label={rowData.initials} shape="circle" className="" />
                <div>
                    <span>{rowData.customerName}</span>
                    <br />
                    <span>{rowData.phone}</span>
                </div>
            </div>
        );
    };

    const dateTimeTemplate = (rowData) => {
        return `${rowData.date} ${rowData.time}`;
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
    };

    const actionBodyTemplate = () => {
        return (
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" />
        );
    };

    return (
        <div className="card">
            <DataTable value={reviews} paginator rows={10} responsiveLayout="scroll">
                <Column field="customerId" header="Customer ID"></Column>
                <Column header="Customer" body={customerBodyTemplate}></Column>
                <Column field="review" header="Review"></Column>
                <Column header="Date & Time" body={dateTimeTemplate}></Column>
                <Column header="Rating" body={ratingBodyTemplate}></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default ProductReviewTable;
