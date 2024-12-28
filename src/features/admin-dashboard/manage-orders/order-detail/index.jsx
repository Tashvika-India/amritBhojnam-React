import React, { useState } from "react";
import Heading from "@/components/ui/Heading";
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import { Avatar } from "primereact/avatar";

const AdminOrderDetail = () => {
    const [orders, setOrders] = useState([
        {
            Id: "#634782",
            Image: "../../../../../assets/images/dashboard/product-one.png",
            Name: "Barri Proso Millet Rice",
            Quanity: "2",
            Amount: "299",
            Total: "300",
        },
    ]);

    const events = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];

    const initials = "Aman Kumar"
        .split(" ")
        .map((n) => n[0])
        .join("");

    const orderTemplate = (rowData) => {
        return (
            <div>
                <img src={rowData?.image} alt="img" width={"3.5rem"} height={"4rem"} />
            </div>
        );
    };
    return (
        <>
            <div className="mt-3 mb-5 row">
                <div className="col-md-6">
                    <Heading value={"Orders #367332"} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-4">
                                <div>
                                    <h6 className="fw-500">Order Details</h6>
                                </div>
                                <div>
                                    <button className="btn btn-success">Invoice</button>
                                </div>
                            </div>
                            <div className="w-100">
                                <DataTable value={orders} responsiveLayout="scroll" paginator rows={10}>
                                    <Column filed="Image" header="IMAGE" body={orderTemplate}></Column>
                                    <Column filed="Name" header="NAME"></Column>
                                    <Column filed="Quanity" header="QUANTITY"></Column>
                                    <Column filed="Amount" header="AMOUNT"></Column>
                                    <Column field="Total" header="TOTAL"></Column>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div>
                                    <h6 className="fw-500">Track Order</h6>
                                </div>
                                <div>
                                    <button className="btn btn-outline-info">Accepted</button>
                                </div>
                            </div>
                            <div className="text-start">
                                <Timeline value={events} opposite={(item) => item.status} content={(item) => <small className="text-color-secondary">{item.date}</small>} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div>
                                    <h6 className="fw-500">Customer Details</h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <Avatar
                                        label={initials}
                                        style={{ height: "3.3rem", width: "3.3rem", aspectRatio: "1/1", backgroundColor: "#D3F4D4", color: "#3C8B3E" }}
                                        shape="circle"
                                        className="p-mr-2"
                                    />
                                    <div>
                                        <p className="mb-0">Aman Kumar</p>
                                        <small className="fw-400" style={{ fontSize: ".88rem" }}>+91 1234567890</small>
                                    </div>
                                </div>
                                <div className=""></div>
                            </div>
                            <div className="mb-4">
                                <p className="fw-500 text-mid-gray mb-0">Email</p>
                                <p className="fw-400">customer@gmail.com</p>
                            </div>
                            <Divider/> 
                            <div className="mt-4">
                                <p className="fw-500 text-mid-gray mb-0">Payment Details</p> 
                                <ul>
                                    <li>Type:           Card</li>
                                    <li>Status:        Paid</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div>
                                    <h6 className="fw-500">Delivery Type</h6>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="fw-500 text-mid-gray mb-0">Payment Details</p> 
                                <ul>
                                    <li>Type:           POS</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div>
                                    <h6 className="fw-500">Action</h6>
                                </div>
                            </div>
                            <div className="mt-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminOrderDetail;
