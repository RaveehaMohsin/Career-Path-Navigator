import React, { useState } from "react";
import "./review.css";

export default function Reviews({ title, data }) {
  const [reviews, setReviews] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByRating, setSortByRating] = useState(false);

  const reviewsPerPage = 12;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleSortByRating = () => {
    setSortByRating((prev) => !prev);
    const sortedReviews = [...reviews].sort((a, b) =>
      sortByRating ? a.rating - b.rating : b.rating - a.rating
    );
    setReviews(sortedReviews);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div>
      <div className="reviews-container">
        <h1 className="reviews-title">{title}</h1>

        <div className="reviews-cards-container">
          <button className="sort-button" onClick={handleSortByRating}>
            Sort by Rating {sortByRating ? "↑" : "↓"}
          </button>
        </div>

        <div className="reviews-cards">
          {currentReviews.map((review) => (
            <div
              key={review.id}
              className={`review-card rating-${review.rating}`}
            >
              <div className="review-rating">
                <span className="label">Rating: </span>
                <span className="stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <div className="review-comments">
                <span className="label">Comments: </span>
                <span>{review.comments}</span>
              </div>
              <div className="review-date">
                <span className="label">Submission Date: </span>
                <span>{review.submissionDate}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
