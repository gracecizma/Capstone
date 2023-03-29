import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useState } from 'react'
import { getAllCategories, getSingleProduct, updateProduct } from '../../store/products'
import './createproduct.css'


export default function UpdateProduct() {
  const product = useSelector((state) => state?.products?.singleProduct)
  console.log("single product", product)
  const currUser = useSelector((state) => state?.session?.user)
  const categoriesObj = useSelector((state) => state?.products?.categories)
  console.log("categories obj", categoriesObj)
  const categories = Object.values(categoriesObj)
  console.log("categories array", categories)

  const dispatch = useDispatch()
  const history = useHistory()

  const { id } = useParams()

  const [errors, setErrors] = useState({})
  // const [isLoaded, setIsLoaded] = useState(false);

  if (!product.id) dispatch(getSingleProduct(id))

  const [name, setName] = useState(product?.name)
  const [description, setDescription] = useState(product?.description)
  const [price, setPrice] = useState(product?.price)
  const [quantity, setQuantity] = useState(product?.quantity)
  const [imageUrl, setImageUrl] = useState(product?.image_url)
  const [category, setCategory] = useState(product?.category_id)


  useEffect(() => {
    dispatch(getAllCategories())
    setName(product?.name)
    setDescription(product?.description)
    setPrice(product?.price)
    setQuantity(product?.price)
    setImageUrl(product?.image_url)
    setCategory(product?.category_id)
  }, [dispatch, product])


  const validate = () => {
    const validationErrors = {};

    if (!name) validationErrors.name = 'Name is required';
    if (!description) validationErrors.description = 'Description is required';
    if (!price) validationErrors.price = 'Price is required';
    if (!quantity) validationErrors.quantity = 'Stock available is required';
    if (!imageUrl) validationErrors.imageUrl = "Image URL is required"
    if (description.length < 20) {
      validationErrors.description = 'Description needs a minimum of 20 characters';
    }
    if (imageUrl && !/\.(jpe?g|png)$/i.test(imageUrl)) {
      validationErrors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    return validationErrors;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate()
    console.log("errors", validationErrors)
    setErrors(validationErrors)

    if (!Object.values(validationErrors).length) {
      const updates = {
        "id": product.id,
        "name": name,
        "description": description,
        "price": parseFloat(price),
        "quantity": parseFloat(quantity),
        "seller_id": currUser.id,
        "image_url": imageUrl,
        "category": category
      }

      await dispatch(updateProduct(updates))
      history.push(`/products/${product.id}`)
    } else if (!currUser || (product.seller_id !== currUser.id)) {
      history.push("/")
    }
  }


  return (
    <>
      {/* {!isLoaded && (<h1>Unable to load form</h1>)}
      {isLoaded && ( */}
      <div className="create-product-container">
        <div className="create-product-form">
          <div className="create-header-container">
            <h1>Update Your Product</h1>
            <h2>How has your recipe changed?</h2>
          </div>
          <form onSubmit={handleSubmit}>

            <div className="create-name-container">
              <label> Name {errors?.name &&
                <span className="error-message">{errors?.name}</span>}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                />
              </label>
            </div>

            <div className="create-description-container">
              <label> Describe your recipe! Get creative and tell us what you love about it. {errors?.description &&
                <span className="error-message">{errors?.description}</span>}
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="If your recipe will be ordered as multiples, for example a dozen cookies, please say so here."
                  className="description-input"
                />
              </label>
            </div>

            <div className="create-price-container">
              <label> Set a base price for your recipe {errors?.price &&
                <span className="error-message">{errors?.price}</span>}
                <input
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  type="text"
                  placeholder="Price"
                />
              </label>
            </div>

            <div className="create-quantity-container">
              <label> How many are available to be ordered at once? {errors?.quantity &&
                <span className="error-message">{errors?.quantity}</span>}
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="text"
                  placeholder="quantity"
                />
              </label>
            </div>

            <div className="create-photo-container">
              <label>Add a picture of your masterpiece! {errors?.imageUrl &&
                <span className="error-message">{errors?.imageUrl}</span>}
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  type="text"
                  placeholder="must be .png, .jpg, or .jpeg file"
                />
              </label>
            </div>


            <div className="create-category-container">
              <label>What kind of treat is it? {errors.category &&
                <span className="error-message">{errors.category}</span>}
                <select value={category?.id} onChange={(e) => setCategory(e.target.value)}>
                  {categories?.map(category => (
                    <option
                      key={category?.id}
                      value={category?.id}
                    >
                      {category?.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="submit-button"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* )} */}
    </>
  )

}
