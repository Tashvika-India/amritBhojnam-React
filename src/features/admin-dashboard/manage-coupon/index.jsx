import React, { useEffect, useState } from 'react'
import Heading from "@/components/ui/Heading";
import YellowButton from '../../../components/buttons/YellowButton';
import CouponTable from './components/CouponTable';
import { Link } from 'react-router-dom';
import { getCouponApi } from '../../../services/adminApiRoutes';
import Loading from '../../../components/ui/Loading';

const AdminCoupon = () => {
    const [loding, setLoding] = useState(false);
    const [coupons, setCoupons] = useState([]); 
    const getCoupons = async () => {
        setLoding(true);
        try {
            const response = await getCouponApi();
            setCoupons(response?.data);
            setLoding(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCoupons();
    }, []);

    return (
        <>
            <div className="mt-3 mb-5 row">
                <div className="col-md-6">
                    <Heading value={"Coupons"} />
                </div>
                <div className="col-md-6 text-end">
                    <Link to="/add-coupon">
                        <YellowButton lable={"+ Add New Coupons"} />
                    </Link>
                </div>
            </div>
            <div className="">
                <div className="card">
                    <div className="card-body">
                        {
                            loding ? <Loading /> :
                                <CouponTable coupons={coupons} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminCoupon;