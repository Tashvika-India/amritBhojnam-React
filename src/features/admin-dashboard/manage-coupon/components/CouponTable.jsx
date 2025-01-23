import React  from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'; 
import { BsCheckCircle } from "react-icons/bs"; 
import { FaRegEdit } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../../utils/constant-variable';



const CouponTable = ({coupons}) => {


    const navigate = useNavigate();

    const ratingBodyTemplate = (rowData) => {
        return (
            <div className=''>
                {/* <RxCrossCircled color='red'  size={28}/> */}
                <BsCheckCircle color='green' size={24} />
            </div>
        )
    };
  
    const actionBodyTemplate = (rowData) => {
        return (
        <button className="text-orange d-flex gap-2 align-items-center border-0 bg-white" onClick={() => navigate(`/edit-coupon/${rowData.id}`)}>
                Edit <FaRegEdit />
            </button>
        );
    };

    const duration = (rowData) => {
        const formattedValidFrom = formatDateTime(rowData.valid_from + "T18:00:00"); 
        const formattedValidTo = formatDateTime(rowData.valid_to + "T18:00:00");
        const formattedDateRange = `${formattedValidFrom} - ${formattedValidTo}`;
        return (
            <div className=''>
                {formattedDateRange}
            </div>
        )
    };

    return (
        <div className="card">
            <DataTable value={coupons} paginator rows={10} responsiveLayout="scroll">
                <Column field="id" header="ID" body={(index) => coupons.indexOf(index) + 1}></Column>
                <Column field='coupon_code' header="CODE" className='fw-600' ></Column>
                <Column field='coupon_type' header="COUPON TYPE"  ></Column>
                <Column body={duration} header="DURATION"></Column>
                <Column field='discount_value' header="DISCOUNT"  ></Column>
                <Column field='description' header="DESCRIPTION"  ></Column>
                <Column field='max_discount' header="MAX DISCOUNT"  ></Column>
                <Column header="DELIVERY FREE" body={ratingBodyTemplate} ></Column>
                {/* <Column header="Action" body={actionBodyTemplate}></Column> */}
            </DataTable>
        </div>
    );
};

export default CouponTable;


