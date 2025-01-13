import React from "react";
import { ProgressBar } from "primereact/progressbar";
import { FaStar } from "react-icons/fa";

const RatingBar = ({ ratingData }) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      {ratings.map((star) => (
        <div key={star} style={styles.row}>
          <div style={styles.starLabel}>
            <span style={styles.starText}>{star}</span>
            <FaStar />
          </div>
          <div style={styles.progressBarContainer}>
            <ProgressBar
              value={(ratingData?.[`${star}_star_count`] / 5) * 100}
              style={styles.progressBar}
              color="#f26722"
            />
          </div>
          <div className="text-mid-grey" style={styles.count}>
            {ratingData?.[`${star}_star_count`]}
          </div>
        </div>
      ))}
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
