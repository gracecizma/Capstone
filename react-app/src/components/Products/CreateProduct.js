import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/products";


export default function CreateProduct() {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector((state) => state?.session?.user)
  const userId = currUser.id

  if (!currUser) {
    history.push("/login")
  }





}
