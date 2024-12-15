import React from 'react'
import Heading from "@/components/ui/Heading";
import YellowButton from '../../../components/buttons/YellowButton'; 
import CouponTable from './components/CouponTable';

const AdminCoupon = () => {
    return (
        <>
            <div className="mt-3 mb-5 row">
                <div className="col-md-6">
                    <Heading value={"Coupons"} />
                </div>
                <div className="col-md-6 text-end">
                    <YellowButton lable={"+ Add New Coupons"} />
                </div>
            </div>

            <div className="">
                <div className="card">
                    <div className="card-body">
                        <CouponTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminCoupon;