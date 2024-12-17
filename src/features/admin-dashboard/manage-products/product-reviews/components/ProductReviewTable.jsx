import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Avatar } from 'primereact/avatar';
import { RiPencilFill } from 'react-icons/ri';

const ProductReviewTable = ({ reviews }) => {

    const customerBodyTemplate = (rowData) => {
        return (
            <div className="d-flex align-items-center gap-3">
                <Avatar style={{ width: "3rem", height: "3rem", aspectRatio: "1/1" }} label={"R"} shape="circle" />
                <div>
                    <span className='fw-normal'>{rowData.user_id}</span>
                    <br />
                    <span>{rowData.phone}</span>
                </div>
            </div>
        );
    };

    const dateTimeTemplate = (rowData) => {
        const date = new Date(rowData?.created_at);
        const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

        const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);
        return (
            <>
                <span className='d-block fw-normal'>{formattedDate}</span>
                <span className='d-block fw-normal'>{formattedTime}</span>
            </>
        )
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <div className='d-inline-flex align-items-center gap-2'>
                    <span>{rowData.rating}</span> <Rating value={1} readOnly stars={1} cancel={false} />
                </div>
            </>
        )
    };

    const reviewTemplate = (rowData) => {
        return (
            <>
                <small className="fw-normal ">{rowData.comment}</small>
            </>
        )
    };

    const actionBodyTemplate = () => {
        return (
            <button
                onClick={() => handleEditClick(rowData)} title="Edit"
                className="d-flex gap-2 align-items-center border-0 rounded me-3"
                style={{ color: "#1F5FBE", backgroundColor: "#EDF1FF", padding: ".45rem .45rem" }}>
                <RiPencilFill size={20} />
            </button>
        );
    };

    return (
        <div className="card">
            <DataTable value={reviews} paginator rows={10} responsiveLayout="scroll">
                <Column field="id" header="Customer ID" style={{ width: '200px' }}></Column>
                <Column header="user_id" body={customerBodyTemplate} style={{ width: '250px' }}></Column>
                <Column field="comment" header="Review" body={reviewTemplate} style={{ width: '600px' }}></Column>
                <Column header="Date & Time" body={dateTimeTemplate} ></Column>
                <Column header="Rating" body={ratingBodyTemplate} ></Column>
                <Column header="Action" body={actionBodyTemplate} ></Column>
            </DataTable>
        </div>
    );
};

export default ProductReviewTable;
