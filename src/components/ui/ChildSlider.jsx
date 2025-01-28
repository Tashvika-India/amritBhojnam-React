import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
    return `${value}°C`;
}

export default function ChildSlider({ minPrice, maxPrice, onSliderChange }) {
    const handleChange = (event, newValue) => {
        onSliderChange(newValue);
    };

    return (
       <div className="price-range-slider px-2">
        <Box sx={{ width: "100%" }}>
            <Slider
                getAriaLabel={() => "Price range"}
                value={[minPrice, maxPrice]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={500}
            />
        </Box>
        </div>
    );
}
