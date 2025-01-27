import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { Link } from "react-router-dom";

const OrderListComponent = ({
    order,
    handleReOrderClick,
    handleInvoiceClick,
    handleReviewClick,
    tickImg,
}) => {
    return (
        <>
            {order.results.map((item) => (
                <div
                    className="summary-card rounded-20 mb-4"
                    key={item.id}>
                    <div className="container">
                        <div className="row border-bottom px-2 px-md-3 py-3 align-items-center">
                            <div className="col-lg-3 col-md-3 col-5 mb-lg-0 mb-md-0 mb-2">
                                <p>
                                    Order ID:
                                    <span
                                        className="fw-600"
                                        title={item?.display_order_id}
                                    >
                                        &nbsp;&nbsp;
                                        {item?.display_order_id}
                                    </span>
                                </p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-7 mb-lg-0 mb-md-0 mb-2">
                                <p>
                                    Order Placed:
                                    <span className="fw-600">
                                        &nbsp;&nbsp;
                                        {new Date(
                                            item?.created_at
                                        ).toLocaleDateString("en-GB")}
                                    </span>
                                </p>
                            </div>
                            <div className="col-6 col-md-3">
                                <p>
                                    Total Amount:
                                    <span className="fw-600">
                                        &nbsp;&nbsp; ₹ {item?.amount_to_pay}
                                    </span>
                                </p>
                            </div>
                            <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-3 text-end align-self-end">
                                <button
                                    onClick={() => handleReOrderClick(item?.id)}
                                    className="fw-500 text-center border-0 text-orange bg-custom-btn-bg px-2 py-1 rounded-2 d-flex align-items-center gap-1 text-nowrap"
                                >
                                    <BsArrowRepeat size={"1.2rem"} />
                                    Buy Again
                                </button>
                                <button
                                    className="fw-500 text-center border-0 text-orange bg-custom-btn-bg d-flex align-items-center py-1 rounded-2 px-2 gap-1"
                                    onClick={() => handleInvoiceClick(item?.shipment_order_id || "")}>
                                    <HiDownload size={"1.2rem"} />
                                    Invoice
                                </button>
                            </div>
                        </div>
                        {item?.product_details.map((data) => (
                            <div className="border-bottom" key={data?.id}>
                                <div className="row px-2 px-md-3 pt-3 py-md-4">
                                    <div className="col-md-8">
                                        <div className="prod-detail d-flex align-items-center">
                                            <img
                                                className="img-fluid me-4 rounded-4"
                                                style={{
                                                    height: "6rem",
                                                    width: "6rem",
                                                }}
                                                src={data?.product?.images[0]?.image}
                                                alt="pencil"
                                            />
                                            <div>
                                                <p className="fb-fs-18 fw-600 text-dark-grey">
                                                    {data?.product?.name}
                                                </p>
                                                <p className="mt-2">
                                                    Qty:
                                                    <span className="fw-600">
                                                        {data?.item_quantity}
                                                    </span>
                                                </p>
                                                <p className="mt-2">
                                                    Size:
                                                    <span className="fw-600">
                                                        {`${data?.product?.quantity}`}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="price-sec text-end text-dark-grey">
                                            <p className="fb-fs-24 fw-bold">
                                                ₹{data?.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row m-md-3">
                                    <div className="col-md-6">
                                        <div className="d-flex mb-2 mb-md-0 delivery-check">
                                            <img
                                                className="img-fluid me-2"
                                                style={{
                                                    height: "1.3rem",
                                                    width: "1.3rem",
                                                    aspectRatio: "1/1",
                                                }}
                                                src={tickImg}
                                                alt="pencil"
                                            />
                                            <p className="text-dark-grey">
                                                Delivered within {item?.payment_details?.delivery_days} days
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-xxl-3 ms-auto text-md-end">
                                        <div className="more-option d-flex mb-2 mb-lg-0 justify-content-evenly justify-content-md-between">
                                            <button
                                                onClick={() =>
                                                    handleReviewClick(
                                                        data?.product?.id,
                                                        data?.product?.name,
                                                        data?.product?.images[0]?.image
                                                    )
                                                }
                                                className="fw-500 text-center border-0 text-dark-grey bg-transparent "
                                            >
                                                Add Review
                                            </button>
                                            <span className="vr"></span>
                                            <Link
                                                to={`/product-detail?product_id=${data?.product?.id}`}
                                                className="fw-600 text-center border-0 bg-transparent text-orange"
                                            >
                                                View Product
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default OrderListComponent;
