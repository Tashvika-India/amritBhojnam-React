import React, { useState, useEffect } from "react";
import ProductCard from "../../web-home/components/ProductCard";
import { getWishlist } from "../../../../services/adminApiRoutes";
import { useSelector } from "react-redux";

const WishList = () => {
  const { wishlist=[], loading } = useSelector((state) => state.wishlist);


  
  return (
    <>
      <div
        className="item-slider mt-4  d-grid justify-content-between gap-3"
        style={{
          gridTemplateColumns:
            window.innerWidth > 768 ? "repeat(5, 1fr)" : "repeat(2, 1fr)",
        }}
      >
        {wishlist?.map((data, index) => (
          <div className="item-slide px-2 px-lg-0" key={data.id}>
            <div className="cat-itmes gap-0 ">
              <ProductCard product={data} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WishList;
