import React from "react";
import { useModal } from "../../context/Modal";
import { NavLink } from 'react-router-dom';



export default function AddToCart({ product, quantity }) {
  const { closeModal } = useModal()

  const handleClick = () => {
    closeModal()
  }

  return (
    <div className="cart-modal-container">
      <div className="cart-content-container">
        <div className="cart-img-text-container">
          <div className="cart-text-container">
            {quantity} {quantity > 1 ? "items added to cart" : "item added to cart"}
          </div>
          <div>
            <img className="cart-image" src={product.image_url} style={{ width: "200px", height: "200px" }} />
          </div>
        </div>
        <div className="cart-buttons-container">
          <NavLink to="/shopping-cart">
            <button
              className="view-cart-btn"
              onClick={handleClick}
            >
              View Cart & Checkout
            </button>
          </NavLink>
          <button
            className="keep-shopping-btn"
            onClick={handleClick}
          >
            Keep Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
