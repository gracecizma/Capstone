import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProducts } from "../../store/products";
import "./profile.css";


export default function Profile() {
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state?.session?.user)
  console.log("current user", currUser)
  const userProducts = useSelector((state) => state?.products?.userProducts)
  console.log("user products", userProducts)
  const productsArr = Object.values(userProducts)

  useEffect(() => {
    dispatch(getUserProducts(currUser.id))
  }, [dispatch, currUser.id])

  if (!productsArr.length) {
    return (
      <>
        <div>Manage your products</div>
        <div>
          <Link to="/products/new">
            <button>Create New Product</button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>User profile page</h1>
    </>
  )


}
