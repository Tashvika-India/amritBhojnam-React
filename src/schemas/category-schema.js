import * as Yup from "yup";

export const categorySchema = Yup.object({
    name: Yup.string()
    .required("Category name is required"),
    img_file: Yup.string()
    .required("Image is required")
});