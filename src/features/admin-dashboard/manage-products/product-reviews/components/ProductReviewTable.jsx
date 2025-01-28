import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Avatar } from 'primereact/avatar';
import { RiPencilFill } from 'react-icons/ri';
import { darkenColor, getRandomColor, isGreyColor, lightenColor } from '../../../../../utils/constant-variable';

const ProductReviewTable = ({ reviews }) => {
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
                    label={rowData?.user_name?.slice(0, 2)}
                    shape="circle"
                    className="p-4"
                />
                <div>
                    <span className='fw-400'>{rowData.user_name}</span> 
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
                <Column field="id" header="Customer ID" style={{ width: '12%' }} body={(rowData) => <span style={{ color: "#584EE0" }} title={rowData.id}>{rowData.id.slice(0, 8)}</span>}></Column>
                <Column field='user_name' header="User Name" body={nameBodyTemplate} style={{ width: '20%' }}></Column>
                <Column field="comment" header="Review" body={reviewTemplate} style={{ width: '500px' }}></Column>
                <Column header="Date & Time" body={dateTimeTemplate} ></Column>
                <Column header="Rating" body={ratingBodyTemplate} ></Column>
                <Column header="Action" body={actionBodyTemplate} ></Column>
            </DataTable>
        </div>
    );
};

export default ProductReviewTable;
