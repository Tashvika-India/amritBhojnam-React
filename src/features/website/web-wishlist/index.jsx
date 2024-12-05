import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import WishList from "./components/wishlistProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../../redux/slices/wishlistSlice";


const Wishlist = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  return (
    <div className="web-wrapper-main">
      <Header />
      <section>
        <div className="container fb-container">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="fw-bold mb-0">My Wishlist</h3>
                <p className="fb-fs-18 text text-mid-grey fw-500">
                  Total Items : 9
                </p>
              </div>
              <div className="sort-select d-flex">
                <p className="mt-1 text-mid-grey">Sort by:</p>
                <span>
                  <select
                    className="form-select fw-600 text-mid-grey border-0"
                    name=""
                    id=""
                  >
                    <option value="">Popularity</option>
                    <option value="">Low Price</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
          <div className="row" >
            <WishList />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wishlist;
