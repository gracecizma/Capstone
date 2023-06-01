const GET_CART = "shopping-cart/GET_CART"
const ADD_CART_ITEM = "shopping-cart/ADD_ITEM"
const EDIT_CART_ITEM = "shopping-cart/EDIT_CART_ITEM"
const REMOVE_FROM_CART = "shopping-cart/REMOVE_FROM_CART"

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart
})

const addCartItem = (cart) => {
  return {
    type: ADD_CART_ITEM,
    payload: cart
  }
}

const updateCartItem = (cart) => {
  return {
    type: EDIT_CART_ITEM,
    payload: cart
  }
}

const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item
})


// Get cart
export const getUserCart = () => async (dispatch) => {
  const res = await fetch(`/api/shopping-cart/`)

  if (res.ok) {
    const data = await res.json();
    // console.log("get user cart data", data)
    let normalizedObj = {}
    data.forEach((item) => normalizedObj[item.id] = item)
    // console.log("user cart data normalized obj", normalizedObj)
    dispatch(getCart(normalizedObj))
  }
}

// Add item to cart
export const addItemToCart = (item) => async (dispatch) => {
  const res = await fetch("/api/shopping-cart/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })
  if (res.ok) {
    const data = await res.json()
    console.log("add item to cart data", data)
    dispatch(addCartItem(data))
  }
}

// update cart item
export const updateItemInCart = (item) => async (dispatch) => {
  const res = await fetch("/api/shopping-cart/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(updateCartItem(data))
    dispatch(getUserCart())
  }
}


// Delete from cart
export const deleteFromCart = (item) => async (dispatch) => {
  const res = await fetch(`api/shopping-cart/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })

  if (res.ok) {
    dispatch(removeFromCart())
    dispatch(getUserCart())
  }
}


const initialState = {
  cart: []
};


export default function cartReducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case GET_CART: {
      newState.cart = action.payload
      console.log("new state get cart", newState)
      return newState
    }
    case ADD_CART_ITEM: {
      console.log("new state add to cart action", action.payload)
      console.log("new state add to cart", newState.cart)
      if (newState.cart.length) {
        console.log("hit if statement")
        newState.cart.forEach((item) => {
          if (item.product_id === action.payload.product_id) {
            item.quantity += action.payload.quantity
          }
        })
      } else {
        console.log("hit else statement")
        newState.cart.push(action.payload)
      }
      return newState
    }
    case EDIT_CART_ITEM: {
      newState.cart[action.payload.id].quantity = action.payload.quantity
      return newState
    }
    case REMOVE_FROM_CART: {
      delete newState.cart[action.payload]
      return newState
    }
    default:
      return newState
  }
}
