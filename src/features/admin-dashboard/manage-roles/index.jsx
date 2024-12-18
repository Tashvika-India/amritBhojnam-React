import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { Link } from "react-router-dom";
import { getProductApi } from "../../../services/adminApiRoutes";
import ProductTable from "../manage-products/product-list/components/ProductTable";
import Loading from "../../../components/ui/Loading";
import { InputText } from "primereact/inputtext";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import TabsButtons from "../../../components/ui/TabsButton";

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function Roles() {
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
          <Heading value={"Roles"} />
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
              <div className="col-md-5">
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
              <div className="col-md-1"></div>
              <div className="col-md-3"></div>
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

export default Roles;
