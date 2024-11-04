import * as Yup from "yup";

export const bannerSchema = Yup.object({
  title: Yup.string()
  .min(3, 'Title must be at least 3 characters')
  .required('Title is required'),
  sub_title: Yup.string()
  .required('Sub-title is required'),
  
});