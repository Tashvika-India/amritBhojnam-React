import React, { useState, useEffect } from "react";
import ProductCard from "../../web-home/components/ProductCard";
import { getWishlist } from "../../../../services/adminApiRoutes";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getWishlistData() {
    setLoading(true);
    try {
      const response = await getWishlist();
      const data = response?.data || [];
      const correctData = data?.map((product) => ({
        ...product,
        is_wishlist: true,
      }));
      setWishlist(correctData);
  
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getWishlistData();
  }, []);
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
          <div className="item-slide px-2 px-lg-0" key={index}>
            <div className="cat-itmes gap-0 ">
              <ProductCard product={data} getWishlistData={getWishlistData} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WishList;
