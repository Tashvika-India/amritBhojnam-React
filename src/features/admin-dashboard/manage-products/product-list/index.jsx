import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductTable from "./components/ProductTable";
import { Link } from "react-router-dom";
import {
  getCategoriesApi,
  getProductApi,
  searchProductApi,
} from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../../custom-compoents/useURLFilters";
import TabsButtons from "../../../../components/ui/TabsButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("Active Orders"); 

  async function getProductList() {
    setLoading(true);
    try {
      const response = await getProductApi({ ...filter, maxPrice: 5000 });
      setProducts(response?.data?.results || []);
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
    }
  }

  async function getCaterioes() {
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setCategories(filteredData);
    } catch (error) {
      console.log("Error on Category List", error);
    }
  }


  // const debouncedSearch = useCallback(
  //   debounce((value) => {
  //     searchProducts(value);
  //   }, 300),
  //   []
  // );

  // const onSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearch(value);
  //   debouncedSearch(value);
  // };

  useEffect(() => {
    getProductList();
    getCaterioes();
  }, [filter]);

  return (
    <>
      <div className="mt-3 mb-4  row">
        <div className="col-md-6 ps-4">
          <Heading value={"Products"} />
        </div>
        <div className="col-md-6 text-end">
          <Link to="/admin/add-product">
            <YellowButton lable={"+ Add New Product"} />
          </Link>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3 justify-content-end">
              <div className="col-md-4">
                <div>
                
                </div>
              </div>
              <div className="col-md-auto">
                {/* <div style={{ width: "10rem" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" size="small">In Stock</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Monthly"
                      size="small">
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={40}>40</MenuItem>
                      <MenuItem value={30}>50</MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
              </div>
              <div className="col-md-auto">
                {/* <div style={{ width: "14rem" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" size="small">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      onChange={(e) =>
                        setFilter({ ...filter, category_id: e.target.value })
                      }
                      size="small">
                      <MenuItem value={""}>All</MenuItem>
                      {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div> */}
              </div>
              <div className="col-md-3 text-end">
                <InputText
                  className="w-100"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
                  }
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
