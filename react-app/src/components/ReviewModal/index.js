import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom"
import { createNewReview } from '../../store/reviews';
import StarRating from './StarRating'
import './reviewmodal.css'

export default function ReviewModal({ productId }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState([])
  const [disabled, setDisabled] = useState(true)

  const currUser = useSelector((state) => state?.session?.user)

  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    setErrors(validate())
  }, [comment, rating])

  useEffect(() => {
    if (!errors.length && rating > 0) {
      setDisabled(false)
    }
  }, [errors])

  const validate = () => {
    const validationErrors = [];
    if (comment && comment.length < 10) {
      validationErrors.push('Review needs 10 or more characters');
    }
    return validationErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!errors.length) {
      const newReview = {
        user_id: currUser.id,
        product_id: productId,
        comment,
        stars: rating
      }
      await dispatch(createNewReview(newReview))
        .then(closeModal)
      history.push(`/products/${productId}`)
    } else {
      return;
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
            placeholder="Leave your review here"
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
              Submit your review
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
