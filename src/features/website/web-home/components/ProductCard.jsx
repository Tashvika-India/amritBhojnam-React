import React from 'react'
import { Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import productCard from "../../../../assets/images/web/product-card.png";
import fireImg from "../../../../assets/images/web/Fire.png";

const ProductCard = ({card,index}) => {

    const label = { inputProps: { "aria-label": "Checkbox demo" } };


    return (
        < >
            <div className="product-card border py-3 px-4" key={index}>
                <div className="d-flex justify-content-between ">
                    <div>
                        <span className="product-badge badge bg-yellow fw-500">
                            {card.discount_percentage}
                        </span>
                    </div>
                    <div>
                        <Checkbox
                            {...label}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            style={{
                                color: "#F26722",
                                margin: "0",
                                padding: "0",
                            }}
                        />
                    </div>
                </div>
                <span className="product-fav"></span>
                <div className="">
                    <img
                        className="img-fluid pb-3"
                        src={productCard}
                        alt="product"
                    />
                </div>
                <h6 className="fb-fs-12 fw-500 d-flex text-brown">
                    <span>
                        <img
                            className="img-fluid"
                            src={fireImg}
                            alt="fire"
                        />
                    </span>
                    {card.calories}
                </h6>
                <h5 className="fb-fs-14 fw-600 masala-con">
                    {card.name}
                </h5>
                <h5 className="fb-fs-14 fw-600 text-grey">{card.weight}</h5>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <h6 className="fb-fs-20 fw-bold mb-0">
                        <small className="fw-500 fb-fs-16 text-grey">
                            <strike>{card.price.currency}{card.price.original}</strike>
                        </small>
                        {card.price.currency}
                        {card.price.discounted}
                    </h6>
                    <button className="button-primary py-1 rounded fb-fs-14 fw-600">
                        Add
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductCard