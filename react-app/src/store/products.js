const GET_PRODUCTS = "products/GET_PRODUCTS";
const GET_SINGLE_PRODUCT = "products/GET_SINGLE_PRODUCT";
const GET_PRODUCTS_BY_USER = "products/GET_PRODUCTS_BY_USER";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";
const CREATE_PRODUCT = "products/CREATE_PRODUCT";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";


// Actions

const loadProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products
  }
}

const loadSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    payload: product
  }
}

const loadProductsByUser = (products) => {
  return {
    type: GET_PRODUCTS_BY_USER,
    payload: products
  }
}

const removeProduct = (product) => {
  return {
    type: REMOVE_PRODUCT,
    payload: product
  }
};

const createProduct = (newProduct) => {
  return {
    type: CREATE_PRODUCT,
    payload: newProduct
  }
};

const editProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    payload: product
  }
};


// Thunks

export const getAllProducts = () => async (dispatch) => {
  const res = await fetch('/api/products')

  if (res.ok) {
    const products = await res.json()
    // console.log("all products fetch", products)
    let normalizedObj = {}
    products.products.forEach((product) => {
      normalizedObj[product.id] = product
    })
    // console.log("normalized product obj", normalizedObj)

    dispatch(loadProducts(normalizedObj))
  }
};


export const getSingleProduct = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`)

  if (res.ok) {
    const product = await res.json()
    // console.log("single product fetch", product)

    dispatch(loadSingleProduct(product))
  }
};


export const getUserProducts = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/profile/${id}`)

  if (res.ok) {
    const products = await res.json()

    let productsObj = {}
    products.products.forEach((product) => {
      productsObj[product.id] = product
    })

    // console.log("user products obj", productsObj)
    dispatch(loadProductsByUser(productsObj))
  }
};

export const deleteProduct = (product) => async (dispatch) => {
  const res = await fetch(`/api/products/${product.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  // console.log("delete product res", res)

  if (res.ok) {
    const data = await res.json();
    // console.log("deleted product", product)
    dispatch(removeProduct(data));
    dispatch(getUserProducts(product.seller_id))
    return product
  }
};

export const createNewProduct = (newProduct) => async (dispatch) => {
  const res = await fetch(`/api/products/new`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct)
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(createProduct(data))
    return data
  }
};


export const updateProduct = (product) => async (dispatch) => {
  const res = await fetch(`/api/products/${product.id}`, {
    method: 'PUT',
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(product)
  })

  if (res.ok) {
    const data = await res.json()
    // console.log("update product fetch", product)
    dispatch(editProduct(data))
    dispatch(getUserProducts(product.seller_id))
  }
};

// Reducer

const initialState = {
  allProducts: {},
  singleProduct: {},
  userProducts: {}
}

export default function productsReducer(state = initialState, action) {
  let newState = { ...state }
  switch (action.type) {
    case GET_PRODUCTS: {
      // const newState = { ...state, allProducts: { ...state.allProducts }, singleProduct: { ...state.singleProduct }, userProducts: { ...state.userProducts } }
      newState.allProducts = action.payload
      return newState
    }
    case GET_SINGLE_PRODUCT: {
      // const getSingleState = { ...state, allProducts: { ...state.allProducts }, singleProduct: {}, userProducts: {} }
      newState.singleProduct = action.payload
      // console.log("get single product state", getSingleState)
      return newState
    }
    case GET_PRODUCTS_BY_USER: {
      // const userState = { ...state, allProducts: { ...state.allProducts }, singleProduct: {}, userProducts: {} }
      // console.log("user products state", userState)
      newState.userProducts = action.payload
      return newState
    }
    case CREATE_PRODUCT: {
      // const createState = { ...state, allProducts: { ...state.allProducts }, singleProduct: {}, userProducts: {} }
      newState.allProducts[action.payload.id] = action.payload
      return newState
    }
    case UPDATE_PRODUCT: {
      // const updateState = { ...state, allProducts: { ...state.allProducts }, singleProduct: {}, userProducts: {} }
      newState.allProducts[action.payload.id] = action.payload
      // console.log("update product state", newState)
      return newState
    }
    case REMOVE_PRODUCT: {
      // const deleteState = { ...state, allProducts: { ...state.allProducts }, singleProduct: {}, userProducts: { ...state.userProducts } }
      delete newState.singleProduct[action.payload.id]
      delete newState.userProducts[action.payload.id]
      // console.log("delete product state", newState)
      return newState
    }
    default:
      return state
  }
};
