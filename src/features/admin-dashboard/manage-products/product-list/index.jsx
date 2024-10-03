import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductTable from "./components/ProductTable";
import { Link } from "react-router-dom";
import { getProductApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";

function ProductList() {

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  async function getProductList() {
    setLoading(true);
    try {
      const response = await getProductApi();
      setProducts(response?.data || []);
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
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
            {loading ? (  
              <Loading />
            ) : (
              <ProductTable products={products} getProductList={getProductList} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
