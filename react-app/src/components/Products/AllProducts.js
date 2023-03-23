import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getAllProducts } from "../../store/products";

export default function Products() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state?.products?.allProducts)
  console.log("products obj", products)
  const productsArr = Object.values(products)
  console.log("products array", productsArr)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  if (!productsArr.length) return null

  return (
    <>
      <div>
        {productsArr.map(product => (
          <Link key={product.id} to={`products/${product.id}`} className="product-tile">
            <div>
              <img src={product.image_url} />
            </div>

            <div>
              <div>
                <p>
                  {product.name}
                </p>
                <p>
                  {product.avg_rating}
                </p>
                <p>
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
