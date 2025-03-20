import React from "react";
import { ProgressBar } from "primereact/progressbar";
import { FaStar } from "react-icons/fa";

const RatingBar = ({ ratingData }) => {
  const totalRatings = Object.keys(ratingData || {})
    .map((key) => ratingData[key])
    .reduce((sum, count) => sum + count, 0);
  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratingData?.[`${star}_star_count`] || 0;
        const percentage = totalRatings ? (count / totalRatings) * 100 : 0;

        return (
          <div
            key={star}
            style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}> 
            <span style={{ width: "30px", fontWeight: "bold" }}>{star}★</span> 
            <ProgressBar
              value={percentage}
              style={{
                flex: 1,
                height: "10px",
                backgroundColor: "#f2f2f2",
                borderRadius: "5px",
                overflow: "hidden",
              }}
              color="#f26722"
            /> 
            <span style={{ marginLeft: "10px", fontSize: "14px" }}>{count}</span>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  starLabel: {
    display: "flex",
    alignItems: "center",
    width: "50px",
    fontSize: "18px",
  },
  starText: {
    marginRight: "5px",
    fontWeight: "bold",
  },
  progressBarContainer: {
    flex: 1,
    margin: "0 10px",
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#DADADA",
    borderRadius: "5px",
  },
  count: {
    width: "30px",
    textAlign: "right",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default RatingBar;
