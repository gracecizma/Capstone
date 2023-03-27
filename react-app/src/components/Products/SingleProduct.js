import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store/products";
import { getProductReviews, getUserReviews, deleteReview, updateReview } from "../../store/reviews";
import { useParams } from "react-router-dom";
import ReviewModal from "../ReviewModal"
import DeleteReviewModal from "../ReviewModal/DeleteReview";
import OpenModalMenuItem from "../OpenModalButton/MenuItem";
import "./singleproduct.css";


export default function SingleProduct() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector((state) => state?.products?.singleProduct)
  // console.log("product obj", product)
  const currUser = useSelector((state) => state?.session?.user)
  const userReviews = useSelector((state) => state?.reviews?.userReviews)
  console.log("user reviews", userReviews)
  const userReviewsArr = Object.values(userReviews)
  console.log("user reviews array", userReviewsArr)
  const productReviews = useSelector((state) => state?.reviews?.productReviews)
  console.log("product reviews", productReviews)
  const productReviewsArr = Object.values(productReviews)

  // const [hasReviewed, setHasReviewed] = useState(false)

  // if (!product.id) dispatch(getSingleProduct(id))

  useEffect(() => {
    dispatch(getSingleProduct(id))
    dispatch(getProductReviews(id))
    dispatch(getUserReviews(currUser?.id))
  }, [dispatch])

  // if (userReviewsArr?.some((review) => review.product_id === id)) {
  //   setHasReviewed(true)
  // }

  const deleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
  }

  const canReview = (currUser && product.user_id !== currUser.id)

  return (
    <>
      <div className="single-product-div">
        <div className="single-product-container">
          <div className="single-product-image-container">
            <img className="single-product-image" src={product?.image_url} />
          </div>
          <div className="single-product-info-container">
            <h2 className="single-product-name">
              {product?.name}
            </h2>
            <div className="single-product-rating">
              {product?.avg_rating ? ' ★ ' + Number(product?.avg_rating).toFixed(1) : '★ New'}
            </div>
            <div className="num-reviews">
              {product && product?.total_reviews === 1 ? product?.total_reviews + ' review' : ""}
              {product && product?.total_reviews !== 1 ? product?.total_reviews + ' reviews' : ""}
            </div>
            <div className="single-product-price">
              ${product?.price}
            </div>
            <div className="single-product-description">
              {product?.description}
            </div>
          </div>
        </div>
        <div className="reviews-container">
          <div className="reviews-header">
            {product && product?.total_reviews === 1 ? product?.total_reviews + ' review' : ""}
            {product && product?.total_reviews !== 1 ? product?.total_reviews + ' reviews' : ""}
          </div>
          <div className="post-review-container">
            {canReview && (
              <button
                className="post-review-button"
              >
                <OpenModalMenuItem
                  itemText="Post your review"
                  itemTextClassName="review-button-text"
                  modalComponent={<ReviewModal productId={product?.id} />}
                />
              </button>
            )}
          </div>
          <div className="product-reviews-container">
            {!product?.total_reviews && canReview ? "Be the first to post a review!" : ""}
            {productReviewsArr?.slice(0).reverse().map(review => (
              <div key={review.id} className="single-review">
                <div className="review-username">{review?.author?.username}</div>
                <div className="review-rating">{review?.stars} ★ </div>
                <div className="review-text">{review?.comment}</div>
                {currUser && review?.user_id === currUser.id && (
                  <button className="delete-review-button">
                    <OpenModalMenuItem
                      itemText="Delete"
                      modalComponent={<DeleteReviewModal review={review} />}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )



}
