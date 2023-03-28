import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProduct } from '../../store/products'
import { useHistory } from "react-router-dom"
import './deleteproduct.css'


export default function DeleteProductModal({ product }) {
  const currUser = useSelector((state) => state?.session?.user)

  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = async (e) => {
    e.preventDefault()
    await dispatch(deleteProduct(product)).then(closeModal)
    history.push(`/users/profile/${product.seller_id}`)
  }

  return (
    <>
      <div className="delete-product-container">
        <div className="delete-product-header">
          <h2 className="confirm-delete-product">Confirm Delete</h2>
          <h3 className="are-you-sure">Are you sure you want to delete this product?</h3>
        </div>

        <div className="delete-buttons-container">
          <button
            onClick={handleClick}
            className="delete-button"
          >
            Yes (Delete Product)
          </button>
          <button
            onClick={closeModal}
            className="keep-button"
          >
            No (Keep Product)
          </button>
        </div>
      </div>
    </>
  )
}
