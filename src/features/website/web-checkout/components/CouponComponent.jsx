import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, Box, Button } from "@mui/material";
import { notifySuccess } from "../../../../components/ui/Notification";

const CouponComponent = ({ couponList, onCouponApply, couponCode, getCouponList }) => {
    const [selectedCoupon, setSelectedCoupon] = useState(couponCode);
    const [filteredCoupons, setFilteredCoupons] = useState(couponList);

    useEffect(() => {
        setFilteredCoupons(couponList.filter(c => c.coupon_code !== couponCode));
    }, [couponCode, couponList]);

    const handleCouponChange = (event, newValue) => {
        const newCoupon = newValue ? newValue.coupon_code : "";
        setSelectedCoupon(newCoupon);
        onCouponApply(newCoupon);
        notifySuccess(newCoupon ? "Coupon applied successfully" : "Coupon removed successfully");
    };

    const handleRemoveCoupon = () => {
        setSelectedCoupon(""); 
        onCouponApply("");
        notifySuccess("Coupon removed successfully");
    };

    return (
        <div className="coupan-applied">
            <Box sx={{ mt: 4, width: "100%" }}>
                <Autocomplete
                    options={filteredCoupons}
                    getOptionLabel={(option) => option.coupon_code}
                    onChange={handleCouponChange}
                    value={filteredCoupons.find(c => c.coupon_code === selectedCoupon) || null}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Apply Coupon"
                            placeholder="Search or select a coupon"
                            variant="outlined"
                            fullWidth
                        />
                    )}
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
                    sx={{ mb: 2 }} 
                />
                {selectedCoupon && (
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                        <strong>Coupon Applied:</strong> {selectedCoupon}
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ ml: 2 }}
                            onClick={handleRemoveCoupon}
                        >
                            Remove
                        </Button>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default CouponComponent;