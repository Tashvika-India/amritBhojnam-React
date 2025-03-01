import * as Yup from "yup";
const addressSchema = Yup.object({
    ads_name: Yup.string().required("Name is required"),
    ads_phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    ads_email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    house_flat_block_no: Yup.string().max(100, "Must be 100 characters or less").required(
        "House/Flat/Block No is required"
    ),
    road_area_colony: Yup.string().max(100, "Must be 100 characters or less").required("Road/Area/Colony is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
    save_as: Yup.string().required("Please select an option"),
});

export default addressSchema;