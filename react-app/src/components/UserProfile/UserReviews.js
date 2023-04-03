import react, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../store/reviews";
import { useParams, Link } from "react-router-dom";
import DeleteReviewModal from "../ReviewModal/DeleteReview";
import OpenModalMenuItem from "../OpenModalButton/MenuItem";
import UpdateReview from "../ReviewModal/UpdateReview";
import "./userreviews.css"


export default function UserReviews() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const reviews = useSelector((state) => state?.reviews?.userReviews)
  const reviewsArr = Object.values(reviews)


  useEffect(() => {
    dispatch(getUserReviews(id))
  }, [dispatch])

  return (
    <>
      <div className="reviews-div">
        <div className="reviews-container">
          {reviewsArr.map(review => (
            <Link
              key={review.id}
              to={`/products/${review.product_id}`}
              className="single-user-review"
            >
              <div>
                Created At: {review?.created_at.substring(0, 16)}
              </div>
              <div className="user-rating-container">
                <div className="review-product-name">{review?.product?.name}</div>
                <div className="user-review-rating">{' ★ ' + review?.stars}</div>
              </div>
              <div>{review?.comment}</div>
              <div className="update-delete-reviews">
                <button className="delete-review-button">
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={<DeleteReviewModal review={review} />}
                  />
                </button>
                <button className="update-review-button">
                  <OpenModalMenuItem
                    itemText="Update"
                    modalComponent={<UpdateReview review={review} />}
                  />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )

}
