import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { Tab } from "react-bootstrap";
import Loading from "../../../components/ui/Loading";
import ProductCard from "../web-home/components/ProductCard";
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder, Label } from "@mui/icons-material";
import BestProduct from "../web-home/components/BestProduct";

const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <div className="web-wrapper-main">
      <Header />
      <section>
        <div className="container fb-container">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="fw-bold">My Wishlist</h3>
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
          {/* <div className="row">
                {loading ? (
                  <Loading />
                ) : (
                  Array.isArray(products) && products.length > 0 ? (
                    <div
                      className="d-grid mt-4 pt-2 gap-4 flex-wrap justify-content-between"
                      style={{ gridTemplateColumns: window.innerWidth > 768 ? "repeat(4, 1fr)" : "repeat(2, 1fr)"  }}
                    >
                      {products.map((item) => (
                        <ProductCard product={item} key={item.id || item.index} />
                      ))}
                    </div>
                  ) )
                };
              </div> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wishlist;
