import React, { useCallback, useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductTable from "./components/ProductTable";
import { Link } from "react-router-dom";
import { getProductApi, searchProductApi } from "../../../../services/adminApiRoutes";
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
  const [search, setSearch] = useState('');

  const [filter, setFilter] = useURLFilters([]);

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  async function getProductList() {
    setLoading(true);
    try {
      const response = await getProductApi(filter);
      setProducts(response?.data?.results || []);
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
    }
  }

  async function searchProducts(query) {
    if (!query) {
      getProductList(); // If search input is cleared, fetch all products again
      return;
    }

    setLoading(true); // Show loading spinner while fetching
    try {
      const response = await searchProductApi(query); // Search products by query
      setProducts(response?.data || []); // Update the product list with search results
    } catch (error) {
      console.error("Error on Search Product", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  }

  // Memoize the debounced function using useCallback to ensure it doesn't get recreated on each render
  const debouncedSearch = useCallback(
    debounce((value) => {
      searchProducts(value); // Call search API after user stops typing
    }, 300),
    [] // Empty dependency array to ensure this is only created once
  );

  // Handle search input change
  const onSearchChange = (e) => {
    const value = e.target.value; // Get value from the search input
    setSearch(value); // Update search state
    debouncedSearch(value); // Trigger the debounced search function
  };


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
            <div className="row mb-3">
              <div className="col-md-5"></div>
              <div className="col-md-2">

              </div>
              <div className="col-md-2">
              </div>
              <div className="col-md-3">
                <InputText
                  value={search} // Bind input value to state
                  onChange={onSearchChange} // Call handler on input change
                  placeholder="Search Product" // Placeholder text
                />
              </div>
            </div>
            <div className="">
              {loading ? (
                <Loading />
              ) : (
                <ProductTable products={products} getProductList={getProductList} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
