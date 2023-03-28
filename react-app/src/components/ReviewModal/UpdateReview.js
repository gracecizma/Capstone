import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import StarRating from "./StarRating"
import { updateReview, getSingleReview } from "../../store/reviews";
import { getSingleProduct } from "../../store/products";


export default function UpdateReview({ review }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  const toUpdate = useSelector((state) => state?.reviews?.singleReview)

  const currUser = useSelector((state) => state?.session?.user)

  if (!toUpdate.id) dispatch(getSingleReview(review.id))

  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(toUpdate.stars)
  const [errors, setErrors] = useState([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setComment(toUpdate?.comment)
    setRating(toUpdate?.stars)
  }, [toUpdate, dispatch])

  useEffect(() => {
    setErrors(validate())
  }, [review, rating])

  useEffect(() => {
    if (!errors.length && rating > 0) {
      setDisabled(false)
    }
  }, [errors])

  const validate = () => {
    const validationErrors = [];
    if (review && review.length < 10) {
      validationErrors.push('Review needs 10 or more characters');
    }
    return validationErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    // console.log("errors", errors)


    if (!Object.values(validationErrors).length) {
      const updates = {
        "id": review.id,
        "user_id": currUser.id,
        "product_id": review.product_id,
        "comment": comment,
        "stars": rating
      }
      await dispatch(updateReview(updates))
        .then(closeModal)
    } else {
      setDisabled(true)
      return
    }
  }

  return (
    <>
      <div className="review-modal-container">
        <form
          onSubmit={handleSubmit}
          className="review-form"
        >
          <div className="review-header">
            <h2>How was it?</h2>
          </div>
          <div className="errors">
            {errors?.map((error, index) =>
              <div key={index} className="error-message">{error}</div>
            )}
          </div>
          <textarea
            cols="60"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          >
          </textarea>
          <div className="stars-container">

            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="review-submit">
            <button
              className="submit-review-button"
              disabled={disabled}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
