import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
  Breadcrumbs,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Timeline } from "primereact/timeline";
import { BsBoxFill, BsFillHandbagFill } from "react-icons/bs";
import { FaGears, FaLocationDot, FaRoute } from "react-icons/fa6";
import { ImPrinter } from "react-icons/im";
import { Avatar } from "primereact/avatar";
import { FaUser } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getOrderAdminApi } from "../../../../services/adminApiRoutes";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { styled } from "@mui/material/styles";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from 'primereact/floatlabel';
import { notifyError } from "../../../../components/ui/Notification";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [datetime12h, setDateTime12h] = useState(null);


  const getOrderList = async (name = "") => {
    setLoading(true);
    try {
      const response = await getOrderAdminApi(id, name);
      setOrderData(response?.data?.results[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError(error.response?.data?.error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);


  const events = [
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: "pi pi-shopping-cart",
      color: "#FF9800",
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
    },
  ];

  const initials = "Aman Kumar"
    .split(" ")
    .map((n) => n[0])
    .join("");

  const orderTemplate = (rowData) => {
    return (
      <div>
        <img src={rowData?.product?.images[0]?.image} alt="img" width={60} height={60} />
      </div>
    );
  };

  const steps = [
    {
      label: "Accepted",
      description: "10 Aug, 2024 - 07:00 PM",
    },
    {
      label: "In Progress",
      description: "11 Aug, 2024 - 09:00 AM",
    },
    {
      label: "Completed",
      description: "12 Aug, 2024 - 05:30 PM",
    },
  ];

  const CustomConnector = styled(StepConnector)(({ theme }) => ({
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.mode === "light" ? "gray" : "gray",
      borderWidth: 3,
      borderRadius: 1,
    },
  }));

  // Custom Step Icon Component
  const StepIcon = ({ active, completed }) => {
    if (completed) {
      return <CheckCircleIcon sx={{ color: "#4BAE4F" }} />;
    }
    if (active) {
      return <RadioButtonCheckedIcon sx={{ color: "#4BAE4F" }} />;
    }
    return <RadioButtonUncheckedIcon sx={{ color: "gray" }} />;
  };

  const [activeStep, setActiveStep] = React.useState(1); 
  

  return (
    <>
      <div className="mt-3 mb-5 row">
      <div className="col-12 mb-3">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/orders"} >Orders List</Link>
            <Typography className="text-orange">Order Detail</Typography>
          </Breadcrumbs>
        </div> 
        <div className="col-6">
          <Heading value={`Order : ${orderData?.display_order_id}`} />
        </div> 
      </div>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card px-3">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <div className="d-flex gap-3">
                  <BsFillHandbagFill size={20} />
                  <p className="fw-500 fb-fs-18 mb-0">Order Details</p>
                </div>
                <div>
                  <button className="btn aqua-button">
                    <ImPrinter fill="#40A3AA" size={20} />
                    Invoice
                  </button>
                </div>
              </div>
              <div className="w-100">
                <DataTable
                  value={orderData?.product_details}
                  responsiveLayout="scroll"
                  paginator
                  rows={3}
                >
                  <Column
                    filed="Image"
                    header="IMAGE"
                    body={orderTemplate}
                  ></Column>
                  <Column filed="Name" header="NAME" body={rowData => rowData?.product?.name}></Column>
                  <Column filed="Quanity" header="QUANTITY" body={rowData => rowData?.item_quantity}></Column>
                  <Column filed="Amount" header="AMOUNT" body={rowData => rowData?.price}></Column>
                  {/* <Column field="Total" header="TOTAL"></Column> */}
                </DataTable>
                <div className="w-100">
                  <ul>
                    <li className="py-3 text-end">
                      <span className="d-inline-block text-start" style={{ width: "15rem" }}>Sub Total</span> <span className="d-inline-block text-end" style={{ width: "5rem" }}>Rs. {~~(orderData?.amount_to_pay)}</span>
                    </li>
                    <li className="border-top py-3 text-end">
                      <span className="d-inline-block text-start" style={{ width: "15rem" }}>Extra Charges</span> <span className="d-inline-block text-end" style={{ width: "5rem" }}>Rs. {~~(orderData?.delivery_charges)}</span>
                    </li>
                    <li className="border-top py-3 text-end">
                      <span className="d-inline-block text-start" style={{ width: "15rem" }}>Total</span> <span className="d-inline-block text-end" style={{ width: "5rem" }}>Rs. {~~(orderData?.total)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card p-2">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <FaRoute size={25} />
                  <p className="fw-500 fb-fs-18 mb-0">Track Order</p>
                </div>
                <div>
                  <button className="btn light-aqua-button py-1">
                    Accepted
                  </button>
                </div>
              </div>
              <div className="text-start Track-stepper pt-4">
                <Box sx={{ maxWidth: 400 }}>
                  <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                    connector={<CustomConnector />}
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          StepIconComponent={(props) => (
                            <StepIcon
                              active={props.active}
                              completed={props.completed}
                            />
                          )}
                        >
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {step.label}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {step.description}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                    }}
                  >
                    <button
                      onClick={() =>
                        setActiveStep((prevStep) =>
                          prevStep > 0 ? prevStep - 1 : prevStep
                        )
                      }
                      disabled={activeStep === 0}
                      style={{
                        padding: "10px 15px",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        backgroundColor:
                          activeStep === 0 ? "lightgray" : "white",
                        cursor: activeStep === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() =>
                        setActiveStep((prevStep) =>
                          prevStep < steps.length - 1 ? prevStep + 1 : prevStep
                        )
                      }
                      style={{
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "green",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </button>
                  </Box> */}
                </Box>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-2">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <FaUser size={20} />
                  <p className="fw-500 fb-fs-18 mb-0">Customer Details</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                  <Avatar
                    label={initials}
                    style={{
                      height: "3.3rem",
                      width: "3.3rem",
                      aspectRatio: "1/1",
                      backgroundColor: "#D3F4D4",
                      color: "#3C8B3E",
                    }}
                    shape="circle"
                    className="p-mr-2"
                  />
                  <div>
                    <p className="mb-0">{orderData?.delivering_to?.ads_name}</p>
                    <small
                      className="fw-400"
                      style={{ fontSize: ".88rem", color: "#584EE0" }}
                    > {orderData?.delivering_to?.ads_phone}
                    </small>
                  </div>
                </div>
                <div className="rounded-2 bg-light-orange p-3 ">
                  <FaPhoneAlt color="#F26722" size={20} />
                </div>
              </div>
              <div className="mb-4">
                <p className="fw-500 text-mid-grey mb-0 pb-2 fb-fs-14">Email</p>
                <p className="fw-400" style={{ color: "#584EE0" }}>
                  {orderData?.delivering_to?.ads_email || "N/A"}
                </p>
              </div>
              <Divider />
              <div className="mt-4">
                <p className="fw-500 text-mid-grey mb-0 fb-fs-14 pb-4">
                  Payment Details
                </p>
                <div>
                  <div className="d-flex align-items-start gap-5 pb-2">
                    <p className="fw-500 mb-0">Type</p> <span> :</span>
                    <p className="mb-0">{orderData?.payment_details?.payment_mode}</p>
                  </div>
                  <div className="d-flex align-items-start gap-4">
                    <p className="fw-500 mb-0">Status</p> <span> :</span>
                    <p className="mb-0 ps-3">{orderData?.payment_details?.status}</p>
                    {/* <button
                      style={{
                        color: "#584EE0",
                        fontSize: "0.875rem",
                        backgroundColor: "#EDECFF",
                        border: "none",
                        padding: "4px 1.2rem",
                        borderRadius: "5px",
                      }}
                    >
                      Set Paid
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-2 mt-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <BsBoxFill size={22} />
                  <p className="fw-500 fb-fs-18 mb-0">
                    Package Dimension & Weight
                  </p>
                </div>
              </div>
              <div className="d-flex gap-4 mt-5">
                <p className="fw-500" style={{ width: "30%" }}>Length </p> <span>:</span>
                <p className="">{~~(orderData?.length)} cm</p>
              </div>
              <div className="d-flex gap-4">
                <p className="fw-500" style={{ width: "30%" }}>Breadth </p> <span>:</span>
                <p className="">{~~(orderData?.breadth)} Cm</p>
              </div>
              <div className="d-flex gap-4">
                <p className="fw-500" style={{ width: "30%" }}>Height </p> <span>:</span>
                <p className="">{~~(orderData?.height)} Cm</p>
              </div>
              <div className="d-flex gap-4">
                <p className="fw-500" style={{ width: "30%" }}>Weight </p> <span>:</span>
                <p className="">{(orderData?.weight_in_g)} Kg</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="card p-2">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <TbTruckDelivery size={28} />
                      <p className="fw-500 fb-fs-18 mb-0">Delivery Type</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <div className="d-flex align-items-start gap-5">
                      <p className="fw-500 mb-0">Type</p> <span> :</span>
                      <p className="mb-0">POS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-2">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <FaGears size={25} />
                      <p className="fw-500 fb-fs-18 mb-0">Action</p>
                    </div>
                  </div>
                  <div className="mt-4 d-flex gap-3">
                    <FloatLabel>
                      <Calendar inputId="birth_date" value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
                      <label htmlFor="birth_date">Enter Delivery Date</label>
                    </FloatLabel>
                    <div className="">
                      <button className="lt-blue-button">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card p-2 mt-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex gap-3">
                      <FaLocationDot size={23} />
                      <p className="fw-500 fb-fs-18 mb-0">Address Details</p>
                    </div>
                  </div>
                  <div className="d-flex mt-4 pt-3">
                    <div className="w-50">
                      <p className="fw-600 mb-0">Delivery Address</p>
                      <div className="mt-4">
                        <div className="d-flex align-items-start">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Name </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}>{orderData?.delivering_to?.ads_name || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Address </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Address Line 2 </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>City </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.city || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Pin Code </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.pincode || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>State </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.state || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Country </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> India</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Phone </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0",width: "60%" }}> {orderData?.delivering_to?.ads_phone || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Email </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0",width: "60%" }}> {orderData?.delivering_to?.ads_email || ''}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-50">
                      <p className="fw-600 mb-0">Shipping Address</p>
                      <div className="mt-4">
                        <div className="d-flex align-items-start">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Name </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.ads_name || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Address </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Address Line 2 </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {`${orderData?.delivering_to?.house_flat_block_no || ''} ${orderData?.delivering_to?.road_area_colony || ''} ${orderData?.delivering_to?.state || ''} ${orderData?.delivering_to?.pincode || ''}`}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>City </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.city || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Pin Code </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.pincode || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>State </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> {orderData?.delivering_to?.state || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Country </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{width: "80%"}}> India</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Phone </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0",width: "60%" }}> {orderData?.delivering_to?.ads_phone || ''}</p>
                        </div>
                        <div className="d-flex align-items-start pt-2">
                          <p className="fw-500 mb-0" style={{width: "20%"}}>Email </p> <span> :</span>
                          <p className="mb-0 ps-4" style={{ color: "#584EE0",width: "60%" }}> {orderData?.delivering_to?.ads_email || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetail;
