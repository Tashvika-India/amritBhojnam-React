import React from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductReviewTable from "./components/ProductReviewTable";

function ProductReviews() {
  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Product Reviews"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton lable={"+ Add New Review"} />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <ProductReviewTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviews;
