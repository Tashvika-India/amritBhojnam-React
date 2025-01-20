import React, { useState } from "react";
import { TextField, Autocomplete, Button, Box } from "@mui/material";

const CouponComponent = ({ couponList, onCouponApply }) => {
    const [selectedCoupon, setSelectedCoupon] = useState("");
    const [isApplied, setIsApplied] = useState(false);

    const handleApplyCoupon = () => {
        if (selectedCoupon) {
            onCouponApply(selectedCoupon);
            setIsApplied(true);
        }
    };

    const handleCouponChange = (event, newValue) => {
        setSelectedCoupon(newValue ? newValue.coupon_code : "");
        setIsApplied(false);
    };

    return (
        <Box sx={{ mt: 4, width: "100%" }}>
            <Autocomplete
                options={couponList}
                getOptionLabel={(option) => option.coupon_code}
                onChange={handleCouponChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Apply Coupon"
                        placeholder="Search or select a coupon"
                        variant="outlined"
                        fullWidth
                        onChange={() => setIsApplied(false)} />)}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <span className="me-2">{option.coupon_code}</span>
                        <small style={{ color: "gray" }}>{option.description}</small>
                    </Box>
                )}
                sx={{ mb: 2 }} />
            {!isApplied && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyCoupon}
                    disabled={!selectedCoupon}
                    fullWidth>
                    Apply
                </Button>
            )}
            {selectedCoupon && isApplied && (
                <Box sx={{ mt: 2 }}>
                    <strong>Coupon Applied:</strong> {selectedCoupon}
                </Box>
            )}
        </Box>
    );
};

export default CouponComponent;
