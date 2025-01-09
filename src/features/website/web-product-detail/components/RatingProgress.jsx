import React from "react";
import { ProgressBar } from "primereact/progressbar";
import { FaStar } from "react-icons/fa";

const RatingBar = ({ ratingData }) => {
  const totalRatings = ratingData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div  style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      {ratingData.map((item) => (
        <div key={item.star} style={styles.row}>
          {/* Star Label */}
          <div style={styles.starLabel}>
            <span style={styles.starText}>{item.star}</span>
            <FaStar />
          </div>

          {/* Progress Bar */}
          <div style={styles.progressBarContainer}>
            <ProgressBar
              value={(item.count / totalRatings) * 100}
              style={styles.progressBar}
              color="#D59615"
            />
          </div>

          {/* Count */}
          <div className="text-mid-grey" style={styles.count}>{item.count}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
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
