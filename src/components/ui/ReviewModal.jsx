import React, { useState } from 'react'
import {
    TextField,
} from "@mui/material";
// import milletIcon from "../../../assets/images/web/millet-icon.png"; 
import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import { postRatingApi } from '../../services/adminApiRoutes'; 
import { notifyError, notifySuccess } from './Notification';

const ReviewModal = ({ visible, setVisible, product_id }) => { 

    const [loading, setLoading] = useState(false);
    
    const [reviewData, setReviewData] = useState({ 
        rating: 0,
        comment: "",
    }) 
    
    const handleRatingChange = (e) => {
        setReviewData({ ...reviewData, rating: e.value });
    };

    const handleCommentChange = (e) => {
        setReviewData({ ...reviewData, comment: e.target.value });
    };

    const handleSubmit = async (e) => {
         setLoading(true);
        e.preventDefault();
        try {
            const payload = {
                product_id: product_id,
                rating: reviewData.rating,
                comment: reviewData.comment,
            };  
            const response = await postRatingApi(payload); 
            setVisible(false);
            notifySuccess("Review Added Successfully");
        } catch (error) {
            console.error("Error submitting review:", error); 
            notifyError("Failed to add Review!");
        }
        finally {
            setLoading(false);
        }
    };


    return (
        < >
            <Dialog
                header="Add Review"
                visible={visible}
                modal={false}
                style={{ width: "50vw" }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
            >
                <form >
                    <div className="d-flex gap-4 align-items-center">
                        {/* <img style={{ border: "1px solid  #D6D6D6", padding: "8px", borderRadius: "1rem" }} src={milletIcon} /> */}
                        <p className="fb-fs-20 fw-600 mb-0">Masala Millets (Veggie Masala)</p>
                    </div>
                    <div className="d-flex mb-4 mt-4 gap-4">
                        <p className="fw-bold mb-0">Give Ratings</p>
                        <Rating
                            value={reviewData.rating}
                            onChange={handleRatingChange}
                            stars={5}
                            cancel={false} 
                        />
                    </div>
                    <p className="fw-bold mb-0">Write your review</p>
                    <TextField
                        fullWidth
                        multiline
                        className="rounded-20 mt-3"
                        id="review"
                        placeholder="Write your detailed review here"
                        name="comment"
                        value={reviewData.comment}
                        onChange={handleCommentChange}
                        minRows={8}
                        variant="outlined"
                    />
                    <div className="mt-5 text-end mb-3">
                        <button className="button-primary-reverse me-4 px-5" type="button" onClick={() => setVisible(false)}>Cancel</button>
                        <button className="success-primary-button" type="button" onClick={handleSubmit} disabled={loading}>{(loading) ? "loading..." : "Submit"}</button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default ReviewModal