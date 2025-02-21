import { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function ChildSlider({ minPrice, maxPrice, onSliderChange }) { 
    const [sliderValue, setSliderValue] = useState([minPrice, maxPrice]);  
 
    useEffect(() => {
        setSliderValue([minPrice, maxPrice]); 
    }, [minPrice, maxPrice]);  
 
    const debouncedUpdateFilters = useCallback(
        debounce((newValue) => {
            const [min, max] =
                newValue[0] > newValue[1] ? [newValue[1], newValue[0]] : newValue;

            onSliderChange([min, max]);
        }, 500), 
        [onSliderChange]
    );
 
    const handleChange = (event, newValue) => {
        setSliderValue(newValue);  
        debouncedUpdateFilters(newValue);  
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
