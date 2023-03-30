import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store/products";
import { getProductReviews, getUserReviews } from "../../store/reviews";
import { addItemToCart } from "../../store/shoppingcart";
import { useParams } from "react-router-dom";
import ReviewModal from "../ReviewModal"
import DeleteReviewModal from "../ReviewModal/DeleteReview";
import OpenModalMenuItem from "../OpenModalButton/MenuItem";
import UpdateReview from "../ReviewModal/UpdateReview";
import AddToCart from "../ShoppingCart/AddToCart";
import "./singleproduct.css";


export default function SingleProduct() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector((state) => state?.products?.singleProduct)
  // console.log("product obj", product)
  const currUser = useSelector((state) => state?.session?.user)
  const userReviews = useSelector((state) => state?.reviews?.userReviews)
  // console.log("user reviews", userReviews)
  const userReviewsArr = Object.values(userReviews)
  // console.log("user reviews array", userReviewsArr)
  const productReviews = useSelector((state) => state?.reviews?.productReviews)
  // console.log("product reviews", productReviews)
  const productReviewsArr = Object.values(productReviews)

  const [quantity, setQuantity] = useState(0)
  const [hasReviewed, setHasReviewed] = useState(() => {
    // Retrieve the value from localStorage, default to false if it doesn't exist
    return localStorage.getItem(`hasReviewed_${currUser?.id}_${product.id}`) === "true" || false
  })

  useEffect(() => {
    dispatch(getSingleProduct(id))
    dispatch(getProductReviews(id))
    if (currUser) dispatch(getUserReviews(currUser.id))
  }, [dispatch, currUser?.id])

  useEffect(() => {
    if (userReviewsArr?.some((review) => review.product_id === product.id)) {
      setHasReviewed(true)
      localStorage.setItem(`hasReviewed_${currUser?.id}_${product.id}`, "true")
    }
  }, [userReviewsArr])

  const canReview = (currUser && (product.seller_id !== currUser.id) && !hasReviewed)

  // console.log("product id", id)

  const deleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
  }


  const maxAvailable = [];
  for (let i = 1; i <= product.quantity; i++) {
    maxAvailable.push(i);
  }

  const quantityUpdate = (e) => {
    setQuantity(e.target.value);
  };

  const addCartClick = async (e) => {
    e.preventDefault();


    const data = {
      user_id: currUser.id,
      product_id: product.id,
      quantity: quantity
    }
    console.log("item to be added", data)
    await dispatch(addItemToCart(data))
  }

  const disableButton = () => {
    if (!currUser) {
      return true;
    }
  };

  console.log("can review?", canReview)
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

            <div className="cart-button-container">
              <select className="select-quantity" onChange={quantityUpdate}>
                <option>Select Quantity</option>
                {maxAvailable.map((number) => (
                  <option>{number}</option>
                ))}
              </select>
              <button
                className="cart-button"
                onClick={addCartClick}
              >
                <OpenModalMenuItem
                  itemText="Add to cart"
                  itemTextClassName="cart-button-text"
                  modalDisabled={disableButton}
                  modalComponent={<AddToCart product={product} quantity={quantity} />}
                />
              </button>
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
                <div className="review-rating">{review?.stars + ' ★ '}</div>
                <div className="review-text">{review?.comment}</div>
                {currUser && review?.user_id === currUser.id && (
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )



}
