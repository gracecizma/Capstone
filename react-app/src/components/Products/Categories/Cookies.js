import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getAllProducts } from "../../../store/products";


export default function Cookies() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state?.products?.allProducts)
  console.log("products obj", products)
  const productsArr = Object.values(products)
  console.log("products array", productsArr)

  if (!productsArr.length) dispatch(getAllProducts())

  let cookieArr = [];
  productsArr?.forEach((product) => {
    if (product.category_id === 3) {
      cookieArr.push(product)
    }
  })




  return (
    <>
      <div className="products-div">
        {cookieArr.map(product => (
          <Link key={product?.id} to={`/products/${product?.id}`} className="product-tile">
            <div className="product-img-container">
              <img
                className="product-img"
                src={product?.image_url} />
            </div>

            <div className="product-details-container">
              <div className="product-name-rating-price">
                <p className="product-name">
                  {product?.name}
                </p>
                <p className="product-rating">
                  Rating:{product?.avg_rating ? ' ★ ' + Number(product?.avg_rating).toFixed(1) : '★ New'}
                </p>
                <p className="product-total-reviews">
                  {product?.total_reviews === 0 ? "" : ""}
                  {product?.total_reviews === 1 ? product?.total_reviews + ' review' : ""}
                  {product?.total_reviews > 1 ? product?.total_reviews + ' reviews' : ""}
                </p>
                <p className="product-price">
                  ${product?.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
