import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductTable from "./components/ProductTable";
import { Link } from "react-router-dom";
import {
  getProductApi,
  searchProductApi,
} from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../../custom-compoents/useURLFilters";

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function ProductList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useURLFilters([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function getProductList() {
    setLoading(true);
    try {
      const response = await getProductApi({...filter , maxPrice:5000});
      setProducts(response?.data?.results || []);
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
    }
  }


  const debouncedSearch = useCallback(
    debounce((value) => {
      searchProducts(value);
    }, 300),
    []
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    getProductList();
  }, [filter]);

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
            <div className="row mb-3">
              <div className="col-md-5"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-3">
                <InputText
                  value={filter.name}
                  onChange={(e)=>setFilter({...filter,name:e.target.value})}
                  placeholder="Search Product" 
                />
              </div>
            </div>
            <div className="">
              {loading ? (
                <Loading />
              ) : (
                <ProductTable
                  products={products}
                  getProductList={getProductList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
