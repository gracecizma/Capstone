import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProducts } from "../../store/products";
import OpenModalMenuItem from "../OpenModalButton/MenuItem";
import DeleteProductModal from "../DeleteProductModal";
import "./profile.css";


export default function Profile() {
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state?.session?.user)
  console.log("current user", currUser)
  const userProducts = useSelector((state) => state?.products?.userProducts)
  console.log("user products", userProducts)
  const productsArr = Object.values(userProducts)


  useEffect(() => {
    dispatch(getUserProducts(currUser?.id))
  }, [dispatch, currUser?.id])

  if (!currUser?.id) {
    return (
      <h1>Please log in to see your profile</h1>
    )
  }

  if (!productsArr.length) {
    return (
      <>
        <div>Create your first product!</div>
        <div>
          <Link to="/products/new">
            <button>Create</button>
          </Link>
        </div>
      </>
    )
  }

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <div>Create a new product</div>
      <div>
        <Link to="/products/new">
          <button>Create</button>
        </Link>
      </div>
      <div className="user-products-div">
        {productsArr.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="product-tile">
            <div className="user-product-name-container">
              <p className="user-product-name">
                {product.name}
              </p>
            </div>
            <div className="user-product-img-container">
              <img
                className="user-product-img"
                src={product.image_url} />
            </div>

            <div className="user-product-details-container">
              <div className="user-product-rating-price">
                <p className="user-product-rating">
                  Rating:{product.avg_rating ? ' ★ ' + Number(product.avg_rating).toFixed(1) : '★ New'}
                </p>
                <p className="user-product-price">
                  ${product.price}
                </p>
              </div>
              <div className="edit-delete-buttons">
                <Link to={`/products/${product.id}/edit`}>
                  <button className="edit-product-button">Update</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={handleDelete}
                >
                  <OpenModalMenuItem
                    itemText="Delete"
                    modalComponent={<DeleteProductModal product={product} />}
                  />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )


}
