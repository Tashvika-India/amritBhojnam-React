import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import { Link, useParams } from "react-router-dom";
import { getOrderAdminApi, getOrderSuccessAdminApi } from "../../../../services/adminApiRoutes";

const AllOrderDetail = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [orderDetail, setOrderDetail] = useState([]);

    const getOrderList = async (name = "") => {
        setLoading(true);
        try {
            const response = await getOrderAdminApi(id, name);
            setOrderDetail(response?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderList();
    }, []);


    return (
        <>
            <div className="mt-5 mb-5 row">
                <div className="col-md-6">
                    <Heading value={`Orders #${orderDetail[0]?.display_order_id}`}  />
                </div>
                <div className="col-md-6 text-end">
                    <Link to={"/admin/order-detail/"} className="button-primary" type="button">Order Page</Link>
                </div>
            </div>
            <div className="card p-3">
                <div className="card-body">
                    <div className="order-details-container row">
                        <div className="col-md-6">
                            <div className="section mb-3">
                                <h4 className="mb-4">General Information</h4>
                                <p className="mb-2"><strong>Order ID:</strong> {orderDetail[0]?.id || "N/A"}</p>
                                <p className="mb-2"><strong>Order Date:</strong> {orderDetail[0]?.created_at || "N/A"}</p>
                                <p className="mb-2"><strong>Pickup Location:</strong> {orderDetail[0]?.pickup_location || "N/A"}</p>
                                <p className="mb-2"><strong>Channel ID:</strong> {orderDetail[0]?.channel_id}</p>
                                <p className="mb-2"><strong>Comment:</strong> {orderDetail[0]?.comment}</p>
                            </div>
                            <div className="section mb-3">
                                <h4 className="mb-4">Billing Details</h4>
                                <p className="mb-2"><strong>Name:</strong> {`${orderDetail[0]?.delivering_to?.ads_name}` || "N/A"}</p>
                                <p className="mb-2"><strong>Address:</strong> {`${orderDetail[0]?.delivering_to?.house_flat_block_no} ${orderDetail[0]?.delivering_to?.road_area_colony} ${orderDetail[0]?.delivering_to?.state} ${orderDetail[0]?.delivering_to?.pincode}`}</p>
                                <p className="mb-2"><strong>Address Line 2:</strong> {orderDetail[0]?.billing_address_2 || "N/A"}</p>
                                <p className="mb-2"><strong>City:</strong> {orderDetail[0]?.delivering_to?.city || "N/A"}</p>
                                <p className="mb-2"><strong>Pincode:</strong> {orderDetail[0]?.delivering_to?.pincode || "N/A"}</p>
                                <p className="mb-2"><strong>State:</strong> {orderDetail[0]?.delivering_to?.state || "N/A"}</p>
                                <p className="mb-2"><strong>Country:</strong> {"India"}</p>
                                <p className="mb-2"><strong>Email:</strong> {orderDetail[0]?.delivering_to?.ads_email || orderDetail[0]?.delivering_to?.user_detail?.email}</p>
                                <p className="mb-2"><strong>Phone:</strong> {orderDetail[0]?.delivering_to?.ads_phone || "N/A"}</p>
                            </div>
                            <div className="section mb-3">
                                <h4 className="mb-4">Shipping Details</h4>
                                <p className="mb-2"><strong>Same as Billing:</strong> {orderDetail[0]?.shipping_is_billing ? "Yes" : "No"}</p>
                                <p className="mb-2"><strong>Name:</strong> {`${orderDetail[0]?.delivering_to?.ads_name}` || "N/A"}</p>
                                <p className="mb-2"><strong>Address:</strong> {`${orderDetail[0]?.delivering_to?.house_flat_block_no} ${orderDetail[0]?.delivering_to?.road_area_colony} ${orderDetail[0]?.delivering_to?.state} ${orderDetail[0]?.delivering_to?.pincode}`}</p>
                                <p className="mb-2"><strong>Address Line 2:</strong> {orderDetail[0]?.billing_address_2 || "N/A"}</p>
                                <p className="mb-2"><strong>City:</strong> {orderDetail[0]?.delivering_to?.city || "N/A"}</p>
                                <p className="mb-2"><strong>Pincode:</strong> {orderDetail[0]?.delivering_to?.pincode || "N/A"}</p>
                                <p className="mb-2"><strong>State:</strong> {orderDetail[0]?.delivering_to?.state || "N/A"}</p>
                                <p className="mb-2"><strong>Country:</strong> {"India"}</p>
                                <p className="mb-2"><strong>Email:</strong> {orderDetail[0]?.delivering_to?.ads_email || orderDetail[0]?.delivering_to?.user_detail?.email}</p>
                                <p className="mb-2"><strong>Phone:</strong> {orderDetail[0]?.delivering_to?.ads_phone || "N/A"}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="section mb-3">
                                <h4 className="mb-4">Order Items</h4>
                                {/* {orderDetail[0]?.order_items.length > 0 ? (
                                    <ul>
                                        {orderDetail[0]?.order_items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No items in this order.</p>
                                )}   */}
                            </div>
                            <div className="section mb-3">
                                <h4 className="mb-4">Payment & Charges</h4>
                                <p className="mb-2"><strong>Payment Method:</strong> {orderDetail[0]?.payment_method}</p>
                                <p className="mb-2"><strong>Shipping Charges:</strong> ₹{orderDetail[0]?.shipping_charges}</p>
                                <p className="mb-2"><strong>Giftwrap Charges:</strong> ₹{orderDetail[0]?.giftwrap_charges}</p>
                                <p className="mb-2"><strong>Transaction Charges:</strong> ₹{orderDetail[0]?.transaction_charges}</p>
                                <p className="mb-2"><strong>Total Discount:</strong> ₹{orderDetail[0]?.total_discount}</p>
                                <p className="mb-2"><strong>Subtotal:</strong> ₹{orderDetail[0]?.sub_total}</p>
                            </div>
                            <div className="section mb-3">
                                <h4 className="mb-4">Package Dimensions & Weight</h4>
                                <p className="mb-2"><strong>Length:</strong> {orderDetail[0]?.length || "N/A"} </p>
                                <p className="mb-2"><strong>Breadth:</strong> {orderDetail[0]?.breadth || "N/A"} </p>
                                <p className="mb-2"><strong>Height:</strong> {orderDetail[0]?.height || "N/A"} </p>
                                <p className="mb-2"><strong>Weight:</strong> {orderDetail[0]?.weight || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllOrderDetail;
