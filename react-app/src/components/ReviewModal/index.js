import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useHistory } from "react-router-dom"
import { createNewReview } from '../../store/reviews';
import StarRating from './StarRating'
import './reviewmodal.css'

function ReviewModal({ productId }) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [errors, setErrors] = useState([])
  const [disabled, setDisabled] = useState(true)

  const currUser = useSelector((state) => state?.session?.user)

  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

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


    if (!errors.length) {
      const newReview = {
        review,
        stars: rating
      }
      await dispatch(createNewReview(newReview))
        .then(closeModal)
      history.push(`/products/${productId}`)
    } else {
      return;
    }
  }
}
