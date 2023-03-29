import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct, getAllCategories } from "../../store/products";
import "./createproduct.css"


export default function CreateProduct() {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector((state) => state?.session?.user)
  const categoriesObj = useSelector((state) => state?.products?.categories)
  console.log("categories obj", categoriesObj)
  const categories = Object.values(categoriesObj)
  console.log("categories array", categories)

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState(categories[0]?.id)

  // console.log("category?", category)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])


  if (!currUser) {
    history.push("/login")
  }


  const validate = () => {
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (!description) validationErrors.description = "Description is required";
    if (description && description.length < 20) validationErrors.description = "Description must be at least 20 characters";
    if (!price) validationErrors.price = "Price is required";
    if (!quantity) validationErrors.quantity = "Stock available is required";
    if (!imageUrl) validationErrors.imageUrl = "Preview image is required";
    if (imageUrl && !/\.(jpe?g|png)$/i.test(imageUrl)) {
      validationErrors.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    if (category === 1) validationErrors.category = "Category is required"
    return validationErrors;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors)

    if (!Object.values(validationErrors).length) {
      const product = {
        "name": name,
        "description": description,
        "price": parseFloat(price),
        "quantity": parseFloat(quantity),
        "seller_id": currUser.id,
        "image_url": imageUrl,
        "category_id": category
      }

      const newProductObj = await dispatch(createNewProduct(product))
      // console.log("new product obj", newProductObj)
      if (newProductObj) history.push(`/products/${newProductObj.id}`)
    } else {
      return;
    }
  }


  return (
    <>
      <div className="create-product-container">
        <div className="create-product-form">
          <div className="create-header-container">
            <h1>Create a New Product</h1>
            <h2>Tell us about your recipe!</h2>
          </div>
          <form onSubmit={handleSubmit}>

            <div className="create-name-container">
              <label> Name {errors.name &&
                <span className="error-message">{errors.name}</span>}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                />
              </label>
            </div>

            <div className="create-description-container">
              <label> Describe your recipe! Get creative and tell us what you love about it. {errors.description &&
                <span className="error-message">{errors.description}</span>}
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
              <label> Set a base price for your recipe {errors.price &&
                <span className="error-message">{errors.price}</span>}
                <input
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  type="text"
                  placeholder="Price"
                />
              </label>
            </div>

            <div className="create-quantity-container">
              <label> How many are available to be ordered at once? {errors.quantity &&
                <span className="error-message">{errors.quantity}</span>}
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="text"
                  placeholder="quantity"
                />
              </label>
            </div>

            <div className="create-photo-container">
              <label>Add a picture of your masterpiece! {errors.imageUrl &&
                <span className="error-message">{errors.imageUrl}</span>}
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  type="text"
                  placeholder="must be link ending in .png, .jpg, or .jpeg"
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )



}
