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
      <div className="mt-3 mb-4  row">
        <div className="col-md-6 ps-4">
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
              <div className="col-md-4">
                <div>
                  <div className="mb-3">
                    <TabsButtons
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      labelOne={"Active Orders"}
                      labelTwo={"New Orders"}
                    />
                  </div>
                  {/* {activeTab === "Active Orders" && <ProductTable />}
                  {activeTab === "New Orders" && <ProductTable />} */}
                </div>
              </div>
              <div className="col-md-2">
                <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">In Stock</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Monthly"
                    size="small">
                    <MenuItem value={10}>One</MenuItem>
                    <MenuItem value={20}>Two</MenuItem>
                    <MenuItem value={30}>Three</MenuItem>
                    <MenuItem value={40}>Four</MenuItem>
                    <MenuItem value={30}>Five</MenuItem>
                  </Select>
                </FormControl>
                </div>
              </div>
              <div className="col-md-2 text-end">
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Monthly"
                    size="small">
                    <MenuItem value={10}>Rice</MenuItem>
                    <MenuItem value={20}>Millet</MenuItem>
                    <MenuItem value={30}>Flour</MenuItem>
                    <MenuItem value={40}>Snacks</MenuItem>
                    <MenuItem value={30}>Instant Mixes</MenuItem>
                  </Select>
                </FormControl>
                </div>
              </div>
              <div className="col-md-3 ms-auto text-end">
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
