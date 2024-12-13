import React, { useEffect, useState } from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import fireImg from "../../../assets/images/web/Fire.png";
import productCard from "../../../assets/images/web/product-card.png";
import { FiHeart, FiMinus } from "react-icons/fi";
import catIcon from "../../../assets/images/web/products/product-cat.svg";
import bakeryImg from "../../../assets/images/web/products/bakery.png";
import beveragesImg from "../../../assets/images/web/products/beverages.png";
import flourImg from "../../../assets/images/web/products/flour-img.png";
import mixesImg from "../../../assets/images/web/products/mixes.png";
import snacksImg from "../../../assets/images/web/products/snacks.png";
import { Slider } from "primereact/slider";
import starImg from "../../../assets/images/web/products/star.png";
import { grey } from "@mui/material/colors";
import { Checkbox } from "primereact/checkbox";
import ProductCard from "../web-home/components/ProductCard";
import { InputText } from "primereact/inputtext";
import Loading from "../../../components/ui/Loading";
import {
  getCategoriesApi,
  getProductApi,
} from "../../../services/adminApiRoutes";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { scrollToTop } from "../../../utils/constant-variable";

const ProudctList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minValue, setMinValue] = useState(100);
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [maxValue, setMaxValue] = useState(200);
  const [filters, setFilters] = useURLFilters();
  const [ingredients, setIngredients] = useState([]);
  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];
    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);
    setIngredients(_ingredients);
  };

  async function getCategoryList() {
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setCategoryList(filteredData || []);
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
    }
  }

  async function getProductList() {
    setLoading(true);
    try {
      const response = await getProductApi(filters);
      setProducts(response?.data?.results || []);
    } catch (error) {
      console.log("Error on Product List", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductList();
  }, [filters]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleDebouncedChange = debounce((value) => {
    if (value[0] > value[1]) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: value[1],
        maxPrice: value[0],
      }));
      return;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: value[0],
      maxPrice: value[1],
    }));
  }, 300);

  useEffect(() => {
    navigate(
      `/products?category_id=${filters.category_id}&name=${filters.name}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&rating=${filters.rating}`
    );
    scrollToTop()
  }, [filters]);

  return (
    <div className="web-wrapper-main">
      <Header />
      <section>
        <div className="container fb-container">
          <div className="row">
            <div className="col-lg-3 col-12">
              <div className="bg-white product-detail-shadow rounded-20 p-4 mb-5">
                <h6 className="underline-heading fw-bold">Category</h6>
                <div className="">
                  <ul className="category-select-list">
                    {categoryList?.map((item, index) => (
                      <li
                        className={`cat-btn-item cursor-pointer ${
                          filters?.category_id === item?.id ? "active" : ""
                        }`}
                        key={index}
                        onClick={() =>
                          setFilters({ ...filters, category_id: item?.id })
                        }
                      >
                        <span className="d-inline-flex align-items-center gap-2">
                          {/* <img src={item?.image} className="img-fluid" alt="icon" /> */}
                          {item?.name}
                        </span>
                        {/* <span className="pill-circle">{item?.product_count}</span> */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-white product-detail-shadow rounded-20 p-4 px-3">
                <h6 className="underline-heading fw-bold">Price & Rating</h6>
                <div className="mb-4 pb-3 border-bottom mt-5">
                  <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onChange={(e) => handleDebouncedChange(e.value)}
                    className="w-14rem"
                    range
                    min={0} // Set minimum range value
                    max={500} // Set maximum range value
                  />
                  <div className="row mt-4">
                    <div className="col-5 pe-0">
                      <div className="max-border">
                        <p className="ms-2 fw-300">
                          Min:{" "}
                          <span className="fw-500 ms-2">
                            <span>Rs.</span> {/* Rs. prefix */}
                            <InputText
                              value={filters.minPrice}
                              style={{ width: "30%" }}
                              readOnly
                              className="border-0 px-0"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 text-center">
                      <FiMinus size={40} color={"#918E92"} />
                    </div>
                    <div className="col-5 ps-0">
                      <div className="max-border">
                        <p className="ms-2 fw-300">
                          Max:{" "}
                          <span className="fw-500 ms-2">
                            <span>Rs.</span>
                            <InputText
                              value={filters.maxPrice}
                              style={{ width: "30%" }}
                              readOnly
                              className="border-0 px-0"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="fw-500 pb-2">Customer Ratings</p>
                  <ul className="mt-2">
                    <li className="d-flex my-3">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          variant="filled"
                          inputId="ingredient1"
                          value="4"
                          onChange={(e) =>
                            setFilters({ ...filters, rating: 4 })
                          }
                          checked={filters.rating == 4}
                        />
                        <label htmlFor="ingredient1" className="ms-3 d-flex">
                          4
                          <span>
                            <img
                              className="img-fluid mt-1 mx-1"
                              src={starImg}
                              alt="star"
                            />
                          </span>
                          & More
                        </label>
                      </div>
                    </li>
                    <li className="d-flex my-3">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          variant="filled"
                          inputId="ingredient2"

                          value="3"
                          onChange={(e) =>
                            setFilters({ ...filters, rating: 3 })
                          }
                          checked={filters.rating == 3}
                        />
                        <label htmlFor="ingredient2" className="ms-3 d-flex">
                          3
                          <span>
                            <img
                              className="img-fluid mt-1 mx-1"
                              src={starImg}
                              alt="star"
                            />
                          </span>
                          & More
                        </label>
                      </div>
                    </li>
                    <li className="d-flex my-3">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          variant="filled"
                          inputId="ingredient3"
                          value="2"
                          onChange={(e) =>
                            setFilters({ ...filters, rating: 2 })
                          }
                          checked={filters.rating == 2}
                        />
                        <label htmlFor="ingredient3" className="ms-3 d-flex">
                          2
                          <span>
                            <img
                              className="img-fluid mt-1 mx-1"
                              src={starImg}
                              alt="star"
                            />
                          </span>
                          & More
                        </label>
                      </div>
                    </li>
                    <li className="d-flex my-3">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          variant="filled"
                          inputId="ingredient4"
                          value="1"
                          onChange={(e) =>
                            setFilters({ ...filters, rating: 1 })
                          }
                          checked={filters.rating == 1}
                        />
                        <label htmlFor="ingredient4" className="ms-3 d-flex">
                          1
                          <span>
                            <img
                              className="img-fluid mt-1 mx-1"
                              src={starImg}
                              alt="star"
                            />
                          </span>
                          & More
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-12">
              <div className="d-flex justify-content-between align-items-center mt-lg-0 mt-4">
                <h5 className="text-mid-grey">
                  Showing {products?.length} result
                </h5>
                {/* <div className="sort-select d-flex">
                  <p className="mt-1 text-mid-grey">Sort by:</p>
                  <span>
                    <select
                      className="form-select fw-600 text-mid-grey border-0"
                      name=""
                      id=""
                    >
                      <option value="">Popularity</option>
                    </select>
                  </span>
                </div> */}
              </div>
              <div className="row">
                {loading ? (
                  <Loading />
                ) : Array.isArray(products) && products.length > 0 ? (
                  <div
                    className="d-grid mt-4 pt-2 gap-4 flex-wrap justify-content-between"
                    style={{
                      gridTemplateColumns:
                        window.innerWidth > 768
                          ? "repeat(4, 1fr)"
                          : "repeat(2, 1fr)",
                    }}
                  >
                    {products.map((item) => (
                      <ProductCard product={item} key={item.id || item.index} />
                    ))}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center w-100">
                    <h3 className="text-center">No Product Found</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProudctList;
