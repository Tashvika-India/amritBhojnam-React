import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductTable from "./components/ProductTable";
import { Link } from "react-router-dom";
import { getProductApi } from "../../../../services/adminApiRoutes";

function ProductList() {

  const [products, setProducts] = useState([]);

  async function getProductList() {
    try {
      const response = await getProductApi();
      setProducts(response?.data || []);
    } catch (error) {
      console.log("Error on Product List", error);
    }
  }

  

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Products"} />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/add-product">
            <YellowButton lable={"+ Add New Product"} />
          </Link>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <ProductTable products={products}  />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
