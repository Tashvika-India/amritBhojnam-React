import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const ShipingPolicy = () => {
  return (
    <>
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-5">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography className="text-orange">Shipping Policy</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <section className="terms-conditions mt-5">
        <div className="container fb-container">
          <div className=" ">
            <h1 className="text-center text-orange fw-bold">Shipping policy</h1>
            <div className="py-5 mt-4">
              <p>
              ORDER PROCESSING: Please allow 1 business day to process your order. You will receive an email once your order is on its way! 
              </p>
              <p>
              LOCAL DELIVERY: Local delivery is available for addresses near Delhi, India. Orders placed before 11 AM during store hours will be delivered within 3-4 business days. Orders placed outside of these hours will be delivered the next business day. 
              </p>
              <p>
              FLAT RATE SHIPPING: Orders are generally shipped within 2 business days using our standard delivery provider. A flat rate shipping fee of ₹100 applies to orders shipping to locations outside the local delivery area. Optional: We do not ship outside of India at this time. 
              </p>
              <p>DOMESTIC SHIPPING RATES AND ESTIMATES: For calculated shipping rates: Shipping charges for your order will be calculated and displayed at checkout. For simple flat rate shipping: We offer a ₹[100 flat rate shipping to locations within India. Free shipping is available for orders over ₹750. </p>
              <p>
              INTERNATIONAL SHIPPING: We do not offer international shipping. We only ship to locations within India. 
              </p>
              <p>
              REFUNDS, RETURNS, AND EXCHANGES: We accept returns up to 3-4 days after delivery if the item is unused and in its original condition. In the event that your order arrives damaged, please email us as soon as possible at info@amritbhojanam.com with your order number and a photo of the item’s condition. We address these issues on a case-by-case basis and will strive to work towards a satisfactory solution. 
              </p>
              <p>
              If you have any further questions, please don't hesitate to contact us at info@amritbhojanam.com. 
              </p>
              <p>
              Thank you for choosing Amrit Bhojanam. We look forward to serving you with our exceptional millet-based products! 
              </p>
              <p>
              Warm regards, 
              </p>
            </div>
          </div>

        </div>
      </section>
      <Footer />
      </div>
    </>
  );
};

export default ShipingPolicy;
