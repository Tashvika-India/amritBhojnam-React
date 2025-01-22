import * as Yup from "yup";

export const subcategorySchema = Yup.object({
    name: Yup.string()
    .required("Category name is required"),
});