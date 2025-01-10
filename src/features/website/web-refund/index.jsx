import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const RefundPolicy = () => {
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
            <Typography className="text-orange">Refund Policy</Typography>
          </Breadcrumbs>
        </div>
      </div>
        <section className="terms-conditions mt-5">
          <div className="container fb-container">
            <div className=" ">
              <h1 className="text-center text-orange fw-bold">Refund policy</h1>
              <div className="py-5 mt-3">
                <p>
                  We have a 30-day return policy, which means you have 30 days
                  after receiving your item to request a return.
                </p>
                <p>
                  To be eligible for a return, your item must be in the same
                  condition that you received it, unworn or unused, with tags, and
                  in its original packaging. You’ll also need the receipt or proof
                  of purchase.
                </p>
                <p>
                  To start a return, you can contact us at
                  amrit.bhojnam@outlook.com. Please note that returns will need to
                  be sent to the following address:
                </p>
                <p>[INSERT RETURN ADDRESS]</p>
                <p>
                  If your return is accepted, we’ll send you a return shipping
                  label, as well as instructions on how and where to send your
                  package. Items sent back to us without first requesting a return
                  will not be accepted.
                </p>
                <p>
                  You can always contact us for any return question at
                  amrit.bhojnam@outlook.com.
                </p>
              </div>
            </div>

            <div className="section-1 mb-5">
              <h5 className="text-center pb-2 fw-600">Damages and issues</h5>
              <p className="fb-fs-12">
                Please inspect your order upon reception and contact us
                immediately if the item is defective, damaged or if you receive
                the wrong item, so that we can evaluate the issue and make it
                right.
              </p>
            </div>

            <div className="section-1 mb-5">
              <h5 className="text-center pb-2 fw-600">
                Exceptions / non-returnable items
              </h5>
              <p className="fb-fs-12">
                Certain types of items cannot be returned, like perishable goods
                (such as food, flowers, or plants), custom products (such as
                special orders or personalized items), and personal care goods
                (such as beauty products). We also do not accept returns for
                hazardous materials, flammable liquids, or gases. Please get in
                touch if you have questions or concerns about your specific item.
              </p>
              <p>
                In addition to the specific uses set out below, we may use
                information we collect about you to communicate with you, provide
                or improve or improve the Services, comply with any applicable
                legal obligations, enforce any applicable terms of service, and to
                protect or defend the Services, our rights, and the rights of our
                users or others.
              </p>
              <p>
                Unfortunately, we cannot accept returns on sale items or gift
                cards.
              </p>
            </div>

            <div className="section-1 mb-5">
              <h5 className="text-center pb-2 fw-600">Exchanges</h5>
              <p className="fb-fs-12">
                The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
              </p>
            </div>

            <div className="section-1 mb-5">
              <h5 className="text-center pb-2 fw-600">European Union 14 day cooling off period</h5>
              <p className="fb-fs-12">
                Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
              </p>
            </div>

            <div className="section-1 mb-5 pb-5">
              <h5 className="text-center pb-2 fw-600">Refunds</h5>
              <p className="fb-fs-12">
                We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                If more than 15 business days have passed since we’ve approved your return, please contact us at amrit.bhojnam@outlook.com.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default RefundPolicy;
