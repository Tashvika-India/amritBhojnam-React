import React, { useState, useEffect } from "react";
import ProductCard from "../../web-home/components/ProductCard";
import { getWishlist } from "../../../../services/adminApiRoutes";

const WishList = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "product1" },
    { id: 2, name: "product2" },
    { id: 3, name: "product3" },
  ]);
  const [loading, setLoading] = useState(false);
  async function getWishlistData() {
    setLoading(true);
    try {
      const response = await getWishlist();
      console.log("1234567890-", response);
      setWishlist(response?.data || []);
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
      <div className="item-slider">
        <div className="row">
          {wishlist?.map((wishlist) => (
            <div className="col-md-3">
              <div className="item-slide px-2 px-lg-0" key={wishlist?.id}>
                <div className="cat-itmes gap-0 mx-0 mx-lg-2">
                  <ProductCard wishlist={wishlist} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishList;
