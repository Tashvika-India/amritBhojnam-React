import React, { useState } from "react";
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

const ProudctList = () => {
  const [minValue, setMinValue] = useState(100); // Default Min value
  const [maxValue, setMaxValue] = useState(200); // Default Max value

  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  const data = [
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
    {
      name: "Masala Millet (Veggie Masala)",
      category: "Millet",
      description: "Veggie Masala Millet",
      image_url: "path/to/image.png",
      weight: "100g",
      price: {
        original: 80,
        discounted: 70,
        currency: "₹",
      },
      discount_percentage: "10 % Off",
      calories: 80,
      availability: "In Stock",
    },
  ];

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
                    <li className="cat-btn-item active">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={catIcon} className="img-fluid" alt="icon" />
                        Millet Rice
                      </span>
                      <span className="pill-circle">6</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={bakeryImg} className="img-fluid" alt="icon" />
                        Bakery & Confectionery
                      </span>
                      <span className="pill-circle">2</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={flourImg} className="img-fluid" alt="icon" />
                        Flour
                      </span>
                      <span className="pill-circle">5</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img
                          src={beveragesImg}
                          className="img-fluid"
                          alt="icon"
                        />
                        Beverages
                      </span>
                      <span className="pill-circle">2</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={snacksImg} className="img-fluid" alt="icon" />
                        Snacks & Munching
                      </span>
                      <span className="pill-circle">5</span>
                    </li>
                    <li className="cat-btn-item">
                      <span className="d-inline-flex align-items-center gap-2">
                        <img src={mixesImg} className="img-fluid" alt="icon" />
                        Instant Mixes
                      </span>
                      <span className="pill-circle">2</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white product-detail-shadow rounded-20 p-4 px-3">
                <h6 className="underline-heading fw-bold">Price & Rating</h6>
                <div className="mb-4 pb-3 border-bottom mt-5">
                  <Slider
                    value={[minValue, maxValue]}
                    onChange={(e) => {
                      setMinValue(e.value[0]);
                      setMaxValue(e.value[1]);
                    }}
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
                              value={minValue}
                              style={{ width: "30%" }}
                              onChange={(e) => setMinValue(e.target.value)}
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
                              value={maxValue}
                              style={{ width: "30%" }}
                              onChange={(e) => setMaxValue(e.target.value)}
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
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
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
                          inputId="ingredient2" name="pizza" value="Mushroom" onChange={onIngredientsChange} checked={ingredients.includes('Mushroom')}
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
                          inputId="ingredient3" name="pizza" value="Pepper" onChange={onIngredientsChange} checked={ingredients.includes('Pepper')}
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
                          inputId="ingredient4" name="pizza" value="Onion" onChange={onIngredientsChange} checked={ingredients.includes('Onion')} 
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
                <h5 className="text-mid-grey">Showing 6 result</h5>
                <div className="sort-select d-flex">
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
                </div>
              </div>
              <div className="d-flex mt-4 gap-4 pt-2 justify-content-start flex-wrap">
                {data?.map((card, index) => (
                  <ProductCard card={card} key={index} />
                ))}
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
