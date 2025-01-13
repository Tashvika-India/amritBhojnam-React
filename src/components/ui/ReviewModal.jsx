import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { postRatingApi } from "../../services/adminApiRoutes";
import { notifyError, notifySuccess } from "./Notification";
import MultiImagesUploadWeb from "../fileUpload/MultiImagesUploadWeb ";
import IosSwitch from "./IosSwitch";

const ReviewModal = ({ visible, setVisible, data }) => {

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            rating: 0,
            comment: "",
            is_anonymous: false,
            images: [],
        },
        validationSchema: Yup.object({
            rating: Yup.number().min(1, "Rating is required").required("Rating is required"),
            comment: Yup.string().required("Comment is required"),
            images: Yup.array().of(Yup.mixed()),
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
        <Dialog className="web-review-modal" header="Add Review" visible={visible} modal={false} style={{ minWidth: "50vw", borderRadius: "1.25rem", overflow: "hidden" }} onHide={() => setVisible(false)}>
            <form onSubmit={handleSubmit}>
                <div className="px-lg-3 pt-2">
                    <div className="">
                        <div className="d-flex justify-content-between gap-2 gap-lg-4 align-items-center mb-2 flex-wrap">
                            <div className="d-inline-flex align-items-center gap-3">
                                <img style={{ border: "1px solid  #D6D6D6", padding: "8px", borderRadius: "1rem" }} src={data?.image} width={"80px"} height={"80px"} />
                                <h6 className="fb-fs-20 fw-600 mb-0">{data?.name}</h6>
                            </div>
                            <div className="">
                                <div className="">
                                    <IosSwitch
                                        checked={formik.values.is_anonymous}
                                        onChange={(e) => formik.setFieldValue("is_anonymous", e.target.checked)}
                                    />
                                </div>
                                <h5 className="d-flex gap-2 align-items-center justify-content-end mb-0">Give Ratings :
                                    <Rating
                                        value={values.rating}
                                        onChange={(e) => formik.setFieldValue("rating", e.value)}
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
                <div className="px-lg-3 pt-lg-2">
                    <div className="card-body">
                        <h5 className="mb-2 mb-lg-4 ">Image</h5>
                        <MultiImagesUploadWeb
                            formik={formik}
                            name="images"
                        />
                        {touched.images && errors.images && (
                            <span className="text-danger">{errors.images}</span>
                        )}
                    </div>
                </div>
                <div className="mb-2 mb-lg-4 px-lg-3 pt-lg-2">
                    <div className="card-body">
                        <h5 className="mb-2 mb-lg-4">Write your review</h5>
                        <TextField
                            fullWidth
                            multiline
                            name="comment"
                            placeholder="Write your detailed review here"
                            rows={4}
                            variant="outlined"
                            value={values.comment}
                            onChange={handleChange}
                            error={touched.comment && Boolean(errors.comment)}
                            helperText={touched.comment && errors.comment}
                        />
                    </div>
                </div>
                <div className="text-end mt-4 d-flex justify-content-end align-items-center gap-3">
                    <button
                        className="button-primary-reverse px-lg-5"
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
