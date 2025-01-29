import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function ChildSlider({ minPrice, maxPrice, onSliderChange }) {
    // Local state for real-time UI update
    const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);

    // Debounced function for updating filters
    const debouncedUpdateFilters = useCallback(
        debounce((newValue) => {
            const [min, max] =
                newValue[0] > newValue[1] ? [newValue[1], newValue[0]] : newValue;

            onSliderChange([min, max]);
        }, 500), // Only update filters after 500ms of inactivity
        [onSliderChange]
    );

    // Handle slider change
    const handleChange = (event, newValue) => {
        setSliderValue(newValue); // Update slider UI instantly
        debouncedUpdateFilters(newValue); // Delay API/filter update
    };

    return (
        <div className="price-range-slider px-2">
            <Box sx={{ width: "100%" }}>
                <Slider
                    getAriaLabel={() => "Price range"}
                    value={sliderValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={500}
                />
            </Box>
        </div>
    );
}
