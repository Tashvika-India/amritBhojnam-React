import React from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductTable from "./components/ProductTable";

function ProductList() {
  return (
    <>
      <div className="mt-3 mb-5 row">
        <div className="col-md-6">
          <Heading value={"Products"} />
        </div>
        <div className="col-md-6 text-end">
          <YellowButton lable={"+ Add New Product"} />
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
            <ProductTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
