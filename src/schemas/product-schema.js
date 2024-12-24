import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  name: Yup.string().trim().required("Product name is required"),
  category_id: Yup.string().required("Category is required"),
  sub_category_id: Yup.string().required("Sub category is required"),
  short_description: Yup.string().required("Short description is required"),
  long_description: Yup.string().required("Long description is required"),
  quantity: Yup.string().required("Quantity is required"),
  max_price: Yup.number()
    .typeError("Max price must be a number")
    .required("Max price is required")
    .min(10, "Max price cannot be less than 10"),
  is_manually_popular: Yup.boolean().required("This field is required"),
  is_manually_best_choice: Yup.boolean().required("This field is required"),
  is_delicious: Yup.boolean().required("This field is required"),
  stock: Yup.number()
    .typeError("Stocks must be a number")
    .required("Stocks are required") ,
  images: Yup.array()
    .min(1, "At least one image is required")
    .required("Images are required"),
  days: Yup.string().trim(),
  meta_title: Yup.string().trim(),
  meta_description: Yup.string().trim(),
  meta_keywords: Yup.array().of(Yup.string().trim()),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
});
