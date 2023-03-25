import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import { useParams, Link } from "react-router-dom";
import "./singleproduct.css";


export default function SingleProduct() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector((state) => state?.products?.singleProduct)
  console.log("product obj", product)
  const currUser = useSelector((state) => state?.session?.user)


  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [dispatch, id])

  if (product === undefined) {
    return null;
  }

  return (
    <>
      <div className="single-product-div">
        <div className="single-product-container">
          <div className="single-product-image-container">
            <img className="single-product-image" src={product.image_url} />
          </div>
          <div className="single-product-info-container">
            <h2 className="single-product-name">
              {product.name}
            </h2>
            <div className="single-product-rating">
              {product.avg_rating ? ' ★ ' + Number(product.avg_rating).toFixed(1) : '★ New'}
            </div>
            <div className="single-product-price">
              ${product.price}
            </div>
            <div className="single-product-description">
              {product.description}
            </div>
          </div>
        </div>
        <div className="single-product-reviews-container">
          reviews go here
        </div>
      </div>
    </>
  )



}
