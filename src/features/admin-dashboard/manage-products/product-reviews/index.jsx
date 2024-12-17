import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import ProductReviewTable from "./components/ProductReviewTable";
import { useParams } from "react-router-dom";
import { getRatingApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";

function ProductReviews() {

  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const [reviews, setReviews] = useState([]); 

  const reviewList = async ( ) => {
    setLoading(true);
    try {
      const response = await getRatingApi(id);  
      setReviews(response?.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product review data:', error);
    }
  };

  useEffect(() => {
    reviewList();
  }, []);

 
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
            { loading ? ( <Loading />) :  <ProductReviewTable reviews={reviews} /> }
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviews;
