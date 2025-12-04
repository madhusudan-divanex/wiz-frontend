import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { securePostData } from "../../services/api";

function FeedbackModal({ show, onClose, feedbackUser }) {
    const [rating, setRating] = useState(4);
    const [title, setTitle] = useState("");
    const [feedback, setFeedback] = useState("");
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userId == feedbackUser) {
            toast.error('You could not give feedback to yourself')
            return
        }
        if (!userId) {
            toast.error('Please login to give feedback')
            navigate('/login')
            return
        }
        const data = { userId, rating, title, feedback, feedbackUser }
        try {
            const result = await securePostData('api/users/feedback', data)
            if (result.status) {
                toast.success(result.message)
                onClose();
            }
        } catch (error) {

        }
    };

    return (
        <div
            className={`modal fade ${show ? "show d-block" : ""}`}
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3 rounded-3">
                    {/* Modal Header */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="modal-title fw-semibold">
                            Share Your Feedback – Nathan Patton
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    {/* Star Rating */}
                    <div className="mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <i
                                key={star}
                                className={`bi bi-star-fill fs-4 me-1 ${star <= rating ? "text-warning" : "text-secondary"
                                    }`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setRating(star)}
                            ></i>
                        ))}
                    </div>

                    {/* Feedback Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Feedback</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Write your feedback..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn w-100" style={{ backgroundColor: "#4A3AFF", color: "white" }}>
                            Submit
                        </button>
                    </form>

                    {/* Footer Text */}
                    <p className="mt-3 small text-secondary">
                        <span className="fw-semibold">Your Feedback Matters:</span> Rest assured,
                        your feedback will remain confidential and will not be shared directly
                        with the service provider. Instead, it will contribute to an overall
                        rating that helps other customers get a general sense of the provider’s
                        performance. All information is handled securely.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FeedbackModal;
