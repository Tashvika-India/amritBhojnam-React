import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import WishList from "./components/wishlistProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../../redux/slices/wishlistSlice";
import wishlistImage from "../../../assets/images/web/wishlist-empty.png"; 
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Loading from "../../../components/ui/Loading";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist = [], loading } = useSelector((state) => state.wishlist); 

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-4">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography className="text-orange">Wishlist</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <section className="pt-4 wishlist-page">
        <div className="container fb-container">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="fw-bold mb-0">My Wishlist</h3>
              </div>
            </div>
          </div>
          <div></div>
          <div className="row">
            {
              wishlist?.length > 0 ?
                <div className="col-12">
                  {loading ? <Loading/> : <WishList wishlist={wishlist} />}
                </div>
                :
                <div className="mx-auto col-md-8 mt-lg-5 pt-5 pt-md-0 empty-wishlist">
                  <img
                    className="img-fluid mx-auto mb-5"
                    src={wishlistImage}
                    alt="empty-wishlist"
                  />
                  <p className="fb-fs-40 fw-600 text-center">
                    Your wishlist is empty
                  </p>
                  <p className="fb-fs-lg-20 fb-fs-md-20 text-center text-mid-grey py-4">
                    Your wishlist is empty. Start adding your favourite products to
                    keep track <br></br> of what you love!
                  </p>
                  <div className="text-center">
                    <Link
                      to="/products"
                      className="button-primary  d-inline-block mt-2 px-5 text-center"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
            }
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wishlist;
