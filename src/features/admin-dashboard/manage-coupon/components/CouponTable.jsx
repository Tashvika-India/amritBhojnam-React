import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsCheckCircle } from "react-icons/bs";
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../../utils/constant-variable';
import DeleteModal from '../../../../components/ui/DeleteModal';
import { MdDelete } from 'react-icons/md';
import { deleteCouponApi } from '../../../../services/adminApiRoutes';
import { RiPencilFill } from 'react-icons/ri';
import { notifyError, notifySuccess } from '../../../../components/ui/Notification';



const CouponTable = ({ coupons, getCoupons }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [current, setCurrent] = useState(null);

    const navigate = useNavigate();

    const ratingBodyTemplate = (rowData) => {
        return (
            <div className=''>
                {/* <RxCrossCircled color='red'  size={28}/> */}
                <BsCheckCircle color='green' size={24} />
            </div>
        )
    };

    const showDeleteModal = (data) => {
        setCurrent(data);
        setModalVisible(true);
    };

    const hideDeleteModal = () => {
        setModalVisible(false);
        setCurrent(null);
    };

    const handleDelete = async () => {
        try {
            await deleteCouponApi(current.id);
            setModalVisible(false);
            setCurrent(null);
            getCoupons();
            notifySuccess("Coupon deleted successfully");
        } catch (error) {
            console.error("Error deleting Coupon:", error);
            notifyError(error.response?.data?.error);
        }
    };

    const handleEditClick = (rowData) => {
        navigate("/admin/edit-coupon", { state: rowData });
      };
    

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="w-100 d-flex gap-3">
                <button onClick={() => handleEditClick(rowData)}
                    title="Edit"
                    className="d-flex gap-2 border-0 rounded ms-0"
                    style={{ color: "#1F5FBE", backgroundColor: "#EDF1FF", padding: ".5rem .5rem", marginLeft: "1rem" }}>
                    <RiPencilFill size={20} />
                </button>
                <button
                    className="text-danger d-flex gap-2 align-items-center border-0 rounded"
                    title="Delete"
                    style={{ backgroundColor: "#d5768f38", paddingBlock: ".3rem" }}
                    onClick={() => showDeleteModal(rowData)}>
                    <MdDelete size={20} />
                </button>
            </div>
        );
    };

    const duration = (rowData) => {
        const formattedValidFrom = formatDateTime(rowData.valid_from + "T18:00:00");
        const formattedValidTo = formatDateTime(rowData.valid_to + "T18:00:00");
        const formattedDateRange = `${formattedValidFrom} - ${formattedValidTo}`;
        return (
            <span className='fw-400' style={{ fontSize: ".9rem" }}>
                {formattedDateRange}
            </span>
        )
    };

    return (
        <div className="card">
            <DataTable value={coupons} paginator rows={10} responsiveLayout="scroll">
                <Column field="id" header="S.NO" body={(index) => coupons.indexOf(index) + 1}></Column>
                <Column field='coupon_code' header="CODE" className='fw-600' ></Column>
                <Column field='coupon_type' header="COUPON TYPE"  ></Column>
                <Column body={duration} header="DURATION" style={{ width: "13rem" }} ></Column>
                <Column field='discount_value' header="DISCOUNT"  ></Column>
                <Column field='description' header="DESCRIPTION"  ></Column>
                <Column field='max_discount' header="MAX DISCOUNT"  ></Column>
                <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
            <DeleteModal
                visible={isModalVisible}
                onHide={hideDeleteModal}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default CouponTable;


