import React from "react";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { BiReset } from "react-icons/bi";
// import starImg from "../../../../assets/images/web/products/star.png";

const FilterComponent = ({
  filters,
  setFilters,
  categoryList,
  handleDebouncedChange,
  resetFilters,
}) => {
  return (
    <div className="filters-wrapper">
      <div className="bg-white product-detail-shadow rounded-20 p-4 mb-5">
        <h6 className="underline-heading fw-bold d-flex align-items-center justify-content-between">
          <span>Category</span>
          <button
            onClick={resetFilters}
            title="reset all"
            className="bg-transparent border-0 text-yellow fs-3"
          >
            <BiReset />
          </button>
        </h6>
        <div>
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
                  {item?.name}
                </span>
                <span className="pill-circle">{item?.product_count}</span>
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
            min={0}
            max={500}
          />
          <div className="row mt-4">
            <div className="col-5 pe-0">
              <div className="max-border">
                <p className="ms-2 fw-300">
                  Min:
                  <span className="fw-500 ms-2">
                    <span>Rs.</span>
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
              <span>-</span>
            </div>
            <div className="col-5 ps-0">
              <div className="max-border">
                <p className="ms-2 fw-300">
                  Max:
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
        <div>
          <p className="fw-500 pb-2">Customer Ratings</p>
          <ul className="mt-2">
            {[4, 3, 2, 1].map((rating) => (
              <li className="d-flex my-3" key={rating}>
                <div className="d-flex align-items-center">
                  <Checkbox
                    variant="filled"
                    inputId={`rating-${rating}`}
                    value={rating}
                    onChange={() => setFilters({ ...filters, rating })}
                    checked={filters.rating == rating}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="ms-3 d-flex"
                  >
                    {rating}
                    <img
                      className="img-fluid mt-1 mx-1"
                      src={starImg}
                      alt="star"
                    />
                    & More
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
