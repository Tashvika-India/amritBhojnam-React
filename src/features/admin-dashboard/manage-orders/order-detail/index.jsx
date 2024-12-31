import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import {
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
import { BsFillHandbagFill } from "react-icons/bs";
import { FaGears, FaRoute } from "react-icons/fa6";
import { ImPrinter } from "react-icons/im";
import { Avatar } from "primereact/avatar";
import { FaUser } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getOrderAdminApi } from "../../../../services/adminApiRoutes";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { styled } from '@mui/material/styles';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);

  const getOrderList = async (name = "") => {
    setLoading(true);
    try {
      const response = await getOrderAdminApi(id, name);
      setOrder(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

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
        <img src={rowData?.image} alt="img" width={"3.5rem"} height={"4rem"} />
      </div>
    );
  };

  const steps = [
    {
      label: 'Accepted',
      description: '10 Aug, 2024 - 07:00 PM',
    },
    {
      label: 'In Progress',
      description: '11 Aug, 2024 - 09:00 AM',
    },
    {
      label: 'Completed',
      description: '12 Aug, 2024 - 05:30 PM',
    },
  ];

  const CustomConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.mode === 'light' ? 'gray' : 'gray',
      borderWidth: 3,
      borderRadius: 1,
    },
  }));
  
  // Custom Step Icon Component
  const StepIcon = ({ active, completed }) => {
    if (completed) {
      return <CheckCircleIcon sx={{ color: '#4BAE4F' }} />;
    }
    if (active) {
      return <RadioButtonCheckedIcon sx={{ color: '#4BAE4F' }} />;
    }
    return <RadioButtonUncheckedIcon sx={{ color: 'gray' }} />;
  };

  const [activeStep, setActiveStep] = React.useState(1);

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Orders #367332"} />
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
                  value={orders}
                  responsiveLayout="scroll"
                  paginator
                  rows={10}
                >
                  <Column
                    filed="Image"
                    header="IMAGE"
                    body={orderTemplate}
                  ></Column>
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
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {step.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {step.description}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <button
          onClick={() =>
            setActiveStep((prevStep) =>
              prevStep > 0 ? prevStep - 1 : prevStep
            )
          }
          disabled={activeStep === 0}
          style={{
            padding: '10px 15px',
            border: '1px solid gray',
            borderRadius: '5px',
            backgroundColor: activeStep === 0 ? 'lightgray' : 'white',
            cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
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
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'green',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </Box>
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
                    <p className="mb-0">Aman Kumar</p>
                    <small
                      className="fw-400"
                      style={{ fontSize: ".88rem", color: "#584EE0" }}
                    >
                      +91 1234567890
                    </small>
                  </div>
                </div>
                <div class="rounded-2 bg-light-orange p-3 ">
                  <FaPhoneAlt color="#F26722" size={20} />
                </div>
                <div className=""></div>
              </div>
              <div className="mb-4">
                <p className="fw-500 text-mid-grey mb-0 pb-2 fb-fs-14">Email</p>
                <p className="fw-400" style={{ color: "#584EE0" }}>
                  customer@gmail.com
                </p>
              </div>
              <Divider />
              <div className="mt-4">
                <p className="fw-500 text-mid-grey mb-0 fb-fs-14 pb-4">
                  Payment Details
                </p>
                <div>
                  <div className="d-flex align-items-start gap-5 pb-2">
                    <p className="fw-500 mb-0">Type:</p>
                    <p className="mb-0">Card</p>
                  </div>
                  <div className="d-flex align-items-start gap-4">
                    <p className="fw-500 mb-0">Status:</p>
                    <p className="mb-0 ps-3">Paid</p>
                    <button
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
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
                  <p className="fw-500 mb-0">Type:</p>
                  <p className="mb-0">Card</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-2">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex gap-3">
                  <FaGears size={25} />
                  <p className="fw-500 fb-fs-18 mb-0">Action</p>
                </div>
              </div>
              <div className="mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetail;
