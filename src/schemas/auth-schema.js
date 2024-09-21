import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Please enter email address"),
  password: Yup.string().required("Please enter password"),
});