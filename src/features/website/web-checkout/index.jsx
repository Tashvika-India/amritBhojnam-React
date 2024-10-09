import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import homeImg from "../../../assets/images/web/account/home-img.png";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";

const CheckoutPage = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="container fb-container w-75">
        <div className="checkout-page">
          <p className="fb-fs-40 fw-bold mt-5 mb-4">Checkout</p>
          <p className="fb-fs-26 fw-bold">Saved Address</p>
          <div className="row">
            <div className="col-md-7">
              <div className="summary-card rounded-20 px-2 py-3 mt-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="order-date d-flex">
                        <img
                          className="img-fluid me-1"
                          src={homeImg}
                          alt="pencil"
                        />
                        <div className="ms-3">
                          <div className="d-flex mt-2">
                            <p className="fw-600 fb-fs-18">
                              Piyush Kanwal | 7464810000
                            </p>
                            <button class="button-yellow ms-3">Default</button>
                          </div>

                          <p className="mt-2">
                            House no. 78, Ward no. 7, Vats Colony, Linepar,
                            Bahadurgarh, Haryana - 124507
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="summary-card rounded-20 px-2 py-3 mt-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="order-date d-flex">
                        <img
                          className="img-fluid me-1"
                          src={homeImg}
                          alt="pencil"
                        />
                        <div className="ms-3">
                          <div className="d-flex mt-2">
                            <p className="fw-600 fb-fs-18">
                              Piyush Kanwal | 7464810000
                            </p>
                          </div>

                          <p className="mt-2">
                            House no. 78, Ward no. 7, Vats Colony, Linepar,
                            Bahadurgarh, Haryana - 124507
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="add-address-button w-100 bg-transparent text-center fw-600">
                + Add New Address
              </button>
              <div className="new-address">
                <p className="fb-fs-26 fw-bold my-3">Add New Address</p>
                <p className="text-mid-grey">BASIC DETAILS</p>
                <form>
                  <div className="container fb-container">
                    <div className="row">
                      <div className="col-md-6 ps-0">
                        <TextField
                          fullWidth
                          className="rounded-20 me-5 mt-4"
                          id="outlined-basic"
                          label="Name"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-6 pe-0">
                        <TextField
                          fullWidth
                          className="rounded-20 me-5 mt-4"
                          id="outlined-basic"
                          label="Phone Number"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-12 px-0 mb-2">
                        <TextField
                          fullWidth
                          className="rounded-20 me-5 mt-4"
                          id="outlined-basic"
                          label="Email Address"
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </div>
                </form>
                <p className="text-mid-grey my-4">ADDRESS DETAILS</p>
                <form>
                  <div className="container fb-container">
                    <div className="row">
                      <div className="col-md-6 ps-0">
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                            State
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              label="Age"
                              onChange={handleChange}
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div className="col-md-6 pe-0">
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                            City
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              label="Age"
                              onChange={handleChange}
                            >
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div className="col-md-12 px-0">
                      <TextField
                          fullWidth
                          className="rounded-20 me-5 mt-4"
                          id="outlined-basic"
                          label="Pincode"
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-12 px-0">
                      <TextField
                          fullWidth
                          className="rounded-20 me-5 mt-4"
                          id="outlined-basic"
                          label="House / Flat /Block No."
                          variant="outlined"
                        />
                      </div>
                      <div className="col-md-12 px-0">
                      <TextField
                          fullWidth
                          className="rounded-20 me-5 mt-4"
                          id="outlined-basic"
                          label="Road /Area / Colony"
                          variant="outlined"
                        />
                      </div>
                      <button className="home-btn w-25">
                      <IoHomeOutline size={"25"} color={"#F26722"}/>
                      </button>
                      <button className="office-btn">
                      <HiBuildingOffice2 size={"25"} color={"#F26722"} />
</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default CheckoutPage;
