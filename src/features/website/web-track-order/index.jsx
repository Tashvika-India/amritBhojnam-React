import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";

const TrackOrder = () => {
    const orderSteps = [
      { label: "Order Placed", description: "We have received your order", date: "17 Jan, 2025" },
      { label: "Order Packed", description: "Your product packed and ready to ship", date: "18 Jan, 2025" },
      { label: "Out Of Delivery", description: "Your product is out for delivery", date: "19 Jan, 2025" },
    ];
 
   

  return (
    <div className="web-wrapper-main">
      <Header />
   
      <div className="container fb-container mt-5">
        <div className="row">
       <p className="fb-fs-40 fw-bold">Track Order</p>
       <p className="fb-fs-26 fw-500 my-4">Order ID: <span className="text-yellow fw-600"> #123456789</span></p>
       <div className="col-md-7">
        <div className="track-left">

        </div>
       </div>
       <div className="col-md-5">
       <div className="track-right">

</div>
       </div>
        </div>

       
      </div>
      <Footer />
    </div>
  );
};
export default TrackOrder;
