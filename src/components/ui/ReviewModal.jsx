import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { postRatingApi } from "../../services/adminApiRoutes";
import { notifyError, notifySuccess } from "./Notification";
import MultiImagesUploadWeb from "../fileUpload/MultiImagesUploadWeb ";

const ReviewModal = ({ visible, setVisible, data }) => {

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            rating: 0,
            comment: "",
            images: [],
        },
        validationSchema: Yup.object({
            rating: Yup.number().min(1, "Rating is required").required("Rating is required"),
            comment: Yup.string().required("Comment is required"),
            images: Yup.array().of(Yup.mixed()), // Optional validation for images
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await postRatingApi({ product_id: data?.id, ...values });
                notifySuccess("Review Added Successfully");
                resetForm();
                setVisible(false);
            } catch (error) {
                console.log("Error submitting review:", error?.response?.data?.error);
                notifyError(error?.response?.data?.error);
            }
        },
    });

    const { values, errors, touched, setFieldValue, handleSubmit, handleChange } = formik;


    return (
        <Dialog header="Add Review" visible={visible} modal={false} style={{ width: "50vw", borderRadius: "1.25rem", overflow: "hidden" }} onHide={() => setVisible(false)}>
            <form onSubmit={handleSubmit}>
                <div className="px-3 pt-2">
                    <div className="">
                        <div className="d-flex justify-content-between gap-4 align-items-center mb-2">
                            <div className="d-inline-flex align-items-center gap-3">
                                <img style={{ border: "1px solid  #D6D6D6", padding: "8px", borderRadius: "1rem" }} src={data?.image} width={"80px"} height={"80px"} />
                                <p className="fb-fs-20 fw-600 mb-0">{data?.name}</p>
                            </div>
                            <div className="">
                                <h5 className="d-flex gap-2 align-items-center justify-content-end">Give Ratings :
                                    <Rating
                                        value={values.rating}
                                        onChange={(e) => setFieldValue("rating", e.value)}
                                        stars={5}
                                        cancel={false}
                                    />
                                    {touched.rating && errors.rating && (
                                        <span className="text-danger">{errors.rating}</span>
                                    )}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3 pt-2">
                    <div className="card-body">
                        <h5 className="mb-4">Image</h5>
                        <MultiImagesUploadWeb
                            formik={formik}
                            name="images"
                        />
                        {touched.images && errors.images && (
                            <span className="text-danger">{errors.images}</span>
                        )}
                    </div>
                </div>
                <div className="mb-4 px-3 pt-2">
                    <div className="card-body">
                        <h5 className="mb-4">Write your review</h5>
                        <TextField
                            fullWidth
                            multiline
                            name="comment"
                            placeholder="Write your detailed review here"
                            rows={6}
                            variant="outlined"
                            value={values.comment}
                            onChange={handleChange}
                            error={touched.comment && Boolean(errors.comment)}
                            helperText={touched.comment && errors.comment}
                        />
                    </div>
                </div>
                <div className="text-end mt-4">
                    <button
                        className="button-primary-reverse me-4 px-5"
                        type="button"
                        onClick={() => setVisible(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="success-primary-button"
                        type="submit"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Loading..." : "Submit"}
                    </button>
                </div>
            </form>
        </Dialog >
    );
};

export default ReviewModal;
