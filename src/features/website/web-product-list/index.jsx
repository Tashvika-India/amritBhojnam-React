import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { BiReset } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import { Slider } from "primereact/slider";
import starImg from "../../../assets/images/web/products/star.png";
import { Checkbox } from "primereact/checkbox";
import ProductCard from "../web-home/components/ProductCard";
import { InputText } from "primereact/inputtext";
import Loading from "../../../components/ui/Loading";
import emptyProducts from "../../../assets/images/web/empty-products.png";
import {
  getCategoriesApi,
  getProductApi,
} from "../../../services/adminApiRoutes";
import useURLFilters from "../../../custom-compoents/useURLFilters";
import { Link, useNavigate } from "react-router-dom";
import { debounce, set } from "lodash";
import { scrollToTop } from "../../../utils/constant-variable";
import { Offcanvas } from "react-bootstrap";
import {
  clearProductList,
  fetchProductList,
} from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { GrPowerReset } from "react-icons/gr";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { notifyError } from "../../../components/ui/Notification";
import ChildSlider from "../../../components/ui/ChildSlider";

const ProudctList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, updateFilters] = useURLFilters();

  const { productList, loading, error } = useSelector((state) => state.product);

  const defaultFilters = useMemo(
    () => ({
      category_id: "",
      maxPrice: "500",
      minPrice: "0",
      name: "",
      product_id: "",
      rating: "",
      search: "",
    }),
    []
  );

  // Memoized debounced function to reduce API calls
  const debouncedFilters = useMemo(
    () =>
      debounce((updatedFilters) => {
        dispatch(fetchProductList(updatedFilters));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedFilters(filters);
    return () => {
      debouncedFilters.cancel();
    };
  }, [filters, debouncedFilters]);

  const areObjectsEqual = (obj1, obj2) =>
    Object.keys(obj1).every((key) => obj1[key] === obj2[key]);

  const isFiltersChanged = !areObjectsEqual(filters, defaultFilters);

  const toggleMobileFilter = () => setShowFilter((prev) => !prev);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];
    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);
    setIngredients(_ingredients);
  };

  async function getCategoryList() {
    setIsLoading(true);
    try {
      const response = await getCategoriesApi();
      const filteredData = (response?.data || []).filter(
        (item) => item.is_active === true
      );
      setCategoryList(filteredData || []);
    } catch (error) {
      console.error("Error on Product List", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    const queryString = `/products?category_id=${filters.category_id}&name=${filters.name}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&rating=${filters.rating}`;

    if (window.location.pathname + window.location.search !== queryString) {
      navigate(queryString, { replace: true });
    }
    setShowFilter(false);
  }, [filters, navigate]);

  const handleSliderChange = useCallback(
    debounce((newValue) => {
      const [minPrice, maxPrice] =
        newValue[0] > newValue[1] ? [newValue[1], newValue[0]] : newValue;

      updateFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
      }));
    }, 500),
    []
  );

  return (
    <div className="web-wrapper-main">
      <Header />
      <div className="pt-4">
        <div className="container fb-container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography className="text-orange">Products</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <section className="product-list pt-4">
        <div className="container fb-container">
          <div className="row">
            <div className="col-md-3  d-none d-lg-block">
              <div className="bg-white product-detail-shadow rounded-20 p-4 mb-5">
                <h6 className="underline-heading fw-bold d-flex align-items-center justify-content-between">
                  <span className="text-dark-grey">Category</span>
                  {isFiltersChanged && (
                    <button
                      onClick={() =>
                        updateFilters({
                          ...filters,
                          category_id: "",
                          name: "",
                          minPrice: "0",
                          maxPrice: "500",
                          rating: "",
                        })
                      }
                      title="reset all"
                      className="bg-transparent border-0 text-semi-orange fs-3"
                    >
                      <GrPowerReset />
                    </button>
                  )}
                </h6>
                <div className="mt-5">
                  <ul className="category-select-list">
                    {isLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <li
                            key={index}
                            className="cat-btn-item cat-skeleton-loader"
                          >
                            <span className="cat-skeleton-text w-50"></span>
                            <span className="pill-circle cat-skeleton-circle"></span>
                          </li>
                        ))
                      : categoryList?.map((item, index) => (
                          <li
                            className={`cat-btn-item cursor-pointer ${
                              filters?.category_id === item?.id ? "active" : ""
                            }`}
                            key={index}
                            onClick={() =>
                              updateFilters((prevFilters) => ({
                                ...prevFilters,
                                category_id:
                                  prevFilters.category_id === item?.id
                                    ? ""
                                    : item?.id,
                              }))
                            }
                          >
                            <span className="d-inline-flex align-items-center gap-2">
                              {item?.name}
                            </span>
                            <span className="pill-circle">
                              {item?.product_count}
                            </span>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
              <div className="bg-white product-detail-shadow rounded-20 p-4 px-3">
                <h6 className="underline-heading fw-bold">Price & Rating</h6>
                <div className="mb-4 pb-3 border-bottom mt-5">
                  <ChildSlider
                    minPrice={parseInt(filters.minPrice, 10)}
                    maxPrice={parseInt(filters.maxPrice, 10)}
                    onSliderChange={handleSliderChange}
                  />
                  <div className="row mt-lg-2 mb-4">
                    <div className="col-5 pe-0" style={{ width: "40%" }}>
                      <div className="max-border text-align-center">
                        <p className="ms-2 fw-300">
                          Min:
                          <span className="fw-500 ms-2">
                            <span>Rs.</span>
                            <InputText
                              value={filters.minPrice}
                              style={{ width: "30%" }}
                              onChange={(e) => {
                                const newMin = e.target.value;
                                if (!isNaN(newMin) && newMin >= 0) {
                                  updateFilters((prevFilters) => ({
                                    ...prevFilters,
                                    minPrice: newMin,
                                  }));
                                }
                              }}
                              className="border-0 px-0"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 text-center">
                      <FiMinus size={40} color={"#918E92"} />
                    </div>
                    <div className="col-5 ps-0" style={{ width: "40%" }}>
                      <div className="max-border text-align-center">
                        <p className="ms-2 fw-300">
                          Max:
                          <span className="fw-500 ms-2">
                            <span>Rs.</span>
                            <InputText
                              value={filters.maxPrice}
                              style={{ width: "30%" }}
                              onChange={(e) => {
                                const newMax = e.target.value;
                                if (!isNaN(newMax) && newMax <= 5000) {
                                  updateFilters((prevFilters) => ({
                                    ...prevFilters,
                                    maxPrice: newMax,
                                  }));
                                }
                              }}
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
                    {[5, 4, 3, 2, 1].map((value) => (
                      <li className="d-flex my-3" key={value}>
                        <div className="d-flex align-items-center">
                          <Checkbox
                            variant="filled"
                            inputId={`rating-${value}`}
                            value={value}
                            onChange={(e) => {
                              const selectedRating = e.target.value;
                              updateFilters((prevFilters) => ({
                                ...prevFilters,
                                rating:
                                  prevFilters.rating == selectedRating
                                    ? ""
                                    : selectedRating,
                              }));
                            }}
                            checked={filters.rating == value}
                          />
                          <label
                            htmlFor={`rating-${value}`}
                            className="ms-3 d-flex align-items-center"
                          >
                            <span className="me-2">{value}</span>
                            {[...Array(value)].map((_, index) => (
                              <img
                                key={index}
                                className="img-fluid me-1"
                                src={starImg}
                                alt="star"
                              />
                            ))}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9 ">
              <div className="d-flex justify-content-between align-items-center mt-lg-0 mt-4">
                <p className="fb-fs-18 text-mid-grey mb-0">
                  Showing {productList?.length} result
                </p>
                <button
                  className="button-primary d-inline-block d-lg-none py-1"
                  onClick={() => setShowFilter(true)}
                >
                  Filter
                </button>
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
                ) : Array.isArray(productList) && productList.length > 0 ? (
                  <div
                    className="d-grid mt-4 pt-2 gap-4 flex-wrap justify-content-between"
                    style={{
                      gridTemplateColumns:
                        window.innerWidth > 1024
                          ? "repeat(4, 1fr)"
                          : window.innerWidth > 768
                          ? "repeat(3, 1fr)"
                          : "repeat(2, 1fr)",
                    }}
                  >
                    {productList.map((item) => (
                      <ProductCard product={item} key={item.id || item.index} />
                    ))}
                  </div>
                ) : (
                  <div
                    className="align-content-center empty-products-card w-100 mt-lg-5 pt-lg-5"
                    style={{ height: "50dvh" }}
                  >
                    <img
                      className="img-fluid mx-auto mb-4 empty-products"
                      src={emptyProducts}
                      alt="empty-products"
                    />
                    <h3 className="text-center fw-600">No Products Found</h3>
                    <p className="text-mid-grey fb-fs-20 text-center mt-3">
                      No results for your search. Try different keywords or
                      browse <br></br> our categories.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <div className="d-lg-none">
        <Offcanvas
          show={showFilter}
          onHide={toggleMobileFilter}
          placement="start"
          className="cart-offcanvas"
          style={{ width: "30%" }}
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="text-ornage fs-5 fw-500">
              Product Filter
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="px-4 pb-0">
            <div className="mobile-product-filter">
              <div className="bg-white product-detail-shadow rounded-20 p-4 ">
                <h4 className="underline-heading filter-heading fw-bold d-flex align-items-center justify-content-between">
                  <span>Category</span>{" "}
                  {isFiltersChanged && (
                    <button
                      onClick={() =>
                        updateFilters({
                          ...filters,
                          category_id: "",
                          name: "",
                          minPrice: "",
                          maxPrice: "",
                          rating: "",
                        })
                      }
                      title="reset all"
                      className="bg-transparent border-0 text-semi-orange fs-3"
                    >
                      <GrPowerReset />
                    </button>
                  )}{" "}
                </h4>
                <div className="">
                  <ul className="category-select-list">
                    {isLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <li
                            key={index}
                            className="cat-btn-item cat-skeleton-loader"
                          >
                            <span className="cat-skeleton-text w-50"></span>
                            <span className="pill-circle cat-skeleton-circle"></span>
                          </li>
                        ))
                      : categoryList?.map((item, index) => (
                          <li
                            className={`cat-btn-item cursor-pointer ${
                              filters?.category_id === item?.id ? "active" : ""
                            }`}
                            key={index}
                            onClick={() =>
                              updateFilters((prevFilters) => ({
                                ...prevFilters,
                                category_id:
                                  prevFilters.category_id === item?.id
                                    ? ""
                                    : item?.id,
                              }))
                            }
                          >
                            <span className="d-inline-flex align-items-center gap-2">
                              {item?.name}
                            </span>
                            <span className="pill-circle">
                              {item?.product_count}
                            </span>
                          </li>
                        ))}
                  </ul>
                </div>
                <h4 className="underline-heading filter-heading fw-bold mt-4">
                  Price & Rating
                </h4>
                <div className="mb-4 pb-3 border-bottom mt-5">
                  <ChildSlider
                    minPrice={parseInt(filters.minPrice, 10)}
                    maxPrice={parseInt(filters.maxPrice, 10)}
                    onSliderChange={handleSliderChange}
                  />
                  <div className="row mt-4">
                    <div className="col-5 pe-0" style={{ width: "41.5%" }}>
                      <div className="max-border">
                        <p className="ms-2 fw-300 mb-0">
                          Min:
                          <span className="fw-500 ms-2">
                            <span>Rs.</span>
                            <InputText
                              value={filters.minPrice}
                              style={{ width: "30%" }}
                              onChange={(e) => {
                                const newMin = e.target.value;
                                if (!isNaN(newMin) && newMin >= 0) {
                                  updateFilters((prevFilters) => ({
                                    ...prevFilters,
                                    minPrice: newMin,
                                  }));
                                }
                              }}
                              className="border-0 px-0"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 text-center">
                      <FiMinus size={40} color={"#918E92"} />
                    </div>
                    <div className="col-5 ps-0" style={{ width: "41.5%" }}>
                      <div className="max-border">
                        <p className="ms-2 fw-300 mb-0">
                          Max:
                          <span className="fw-500 ms-2">
                            <span>Rs.</span>
                            <InputText
                              value={filters.maxPrice}
                              style={{ width: "30%" }}
                              onChange={(e) => {
                                const newMax = e.target.value;
                                if (!isNaN(newMax) && newMax <= 5000) {
                                  updateFilters((prevFilters) => ({
                                    ...prevFilters,
                                    maxPrice: newMax,
                                  }));
                                }
                              }}
                              className="border-0 px-0"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <h4 className="underline-heading filter-heading fw-bold mt-4">
                    Customer Ratings
                  </h4>
                  <ul className="mt-2">
                    {[4, 3, 2, 1].map((value) => (
                      <li className="d-flex my-3" key={value}>
                        <div className="d-flex align-items-center">
                          <Checkbox
                            variant="filled"
                            inputId={`rating-${value}`}
                            value={value}
                            onChange={(e) => {
                              const selectedRating = e.target.value;
                              updateFilters((prevFilters) => ({
                                ...prevFilters,
                                rating:
                                  prevFilters.rating == selectedRating
                                    ? ""
                                    : selectedRating,
                              }));
                            }}
                            checked={filters.rating == value}
                          />
                          <label
                            htmlFor={`rating-${value}`}
                            className="ms-3 d-flex"
                          >
                            {value}
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
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default ProudctList;
