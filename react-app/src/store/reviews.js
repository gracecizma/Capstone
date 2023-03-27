const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW"
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS"
const GET_PRODUCT_REVIEWS = "reviews/GET_PRODUCT_REVIEWS"
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"


// Actions

const loadSingleReview = (review) => {
  return {
    type: GET_SINGLE_REVIEW,
    payload: review
  }
};

const loadReviewsByUser = (reviews) => {
  return {
    type: GET_USER_REVIEWS,
    payload: reviews
  }
};

const productReviews = (reviews) => {
  return {
    type: GET_PRODUCT_REVIEWS,
    payload: reviews
  }
};

const removeReview = (review) => {
  return {
    type: REMOVE_REVIEW,
    payload: review
  }
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review
  }
};

const editReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review
  }
};


// Thunks

export const getSingleReview = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`)

  if (res.ok) {
    const review = await res.json()
    // console.log("single review fetch", review)
    dispatch(loadSingleReview(review))
  }
};

export const getUserReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/profile/${id}/reviews`)

  if (res.ok) {
    const reviews = await res.json()
    console.log("user reviews fetch", reviews)
    dispatch(loadReviewsByUser(reviews))
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews`)

  if (res.ok) {
    const reviews = await res.json()
    console.log("product reviews fetch", reviews)
    dispatch(productReviews(reviews))
  }
}

export const deleteReview = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    const review = await res.json();
    // console.log("deleted review fetch", review)
    dispatch(removeReview(review));
    return review
  }
};

export const createNewReview = (newReview) => async (dispatch) => {
  const res = await fetch(`/api/reviews/new`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newReview)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log("new review fetch", data)
    dispatch(createReview(data))
    return data
  }
};

export const updateReview = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const review = await res.json()
    // console.log("update review fetch", review)
    dispatch(editReview(review))
  }
};


// Reducer

const initialState = {
  singleReview: {},
  userReviews: {},
  productReviews: {}
}

export default function reviewsReducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case GET_SINGLE_REVIEW: {
      newState.singleReview = action.payload
      // console.log("single review state", newState)
      return newState
    }
    case GET_USER_REVIEWS: {
      newState.userReviews = action.payload
      console.log("user reviews state", newState)
      return newState
    }
    case GET_PRODUCT_REVIEWS: {
      newState.productReviews = action.payload
      console.log("product reviews state", newState)
      return newState
    }
    case CREATE_REVIEW: {
      newState.userReviews[action.payload.id] = action.payload
      // console.log("create review state", newState)
      return newState
    }
    case UPDATE_REVIEW: {
      newState.userReviews[action.payload.id] = action.payload
      return newState
    }
    case REMOVE_REVIEW: {
      delete newState.singleReview[action.payload.id]
      delete newState.userReviews[action.payload.id]
      // console.log("delete review state", newState)
      return newState
    }
    default:
      return state
  }
};
