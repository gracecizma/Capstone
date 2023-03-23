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
    <h1>Single Product Page</h1>
  )



}
