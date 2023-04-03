import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import { useHistory } from "react-router-dom";
import "./search.css"


export default function SearchPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state?.products?.allProducts);
  const [filter, setFilter] = useState("Relevancy");
  const [display, setDisplay] = useState([]);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  let allProducts = Object.values(products);
  console.log("products arr", allProducts)

  let search = window.location.pathname;

  let splitSearch = search.split("/");
  console.log("path", splitSearch[2]);
  let newStr = splitSearch[2].replace("%20", " ");
  console.log("new string", newStr);


  let filteredProducts = [];

  if (allProducts.length) {
    for (let i = 0; i < allProducts.length; i++) {
      // console.log(all[i]);
      // console.log(all[i]["name"]);
      if (allProducts[i]["name"].toLowerCase().includes(newStr.toLowerCase())) {
        filteredProducts.push(allProducts[i]);
      }
    }
  }

  const filterHelper = (a, b) => {
    let d1 = new Date(a.created_at);
    let d2 = new Date(b.created_at);

    return d1.getTime() > d2.getTime();
  };

  useEffect(() => {
    if (filteredProducts.length) {
      console.log(filter);
      if (filter === "Most Recent") {
        filteredProducts = filteredProducts.sort((a, b) => filterHelper);
      }

      if (filter === "Lowest Price") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      }

      if (filter === "Highest Price") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }

      if (filter === "Top Reviewed") {
        filteredProducts.sort((a, b) => a.price < b.price);
      }

      console.log("use hit");
      console.log("filtered", filteredProducts);
      setDisplay(filteredProducts);
    }
  }, [filter]);

  if (allProducts.length === 0) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!display.length && !filteredProducts.length) {
    return (
      <div className="no-results">
        <div className="no-results-text">
          {"No Results for '" + newStr.replace("%20", " ") + "'"}
        </div>
        <div className="try-again">
          Try searching for something else instead?
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="all-products-container">
        <div className="filter-results-bar">
          <div className="filter button">
            {" "}
            <form className="filter-form" onSubmit={handleSubmit}>
              <select
                className="filter-round"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="Relevancy">Filter by: Relevancy</option>
                <option value="Lowest Price">Filter by: Lowest Price</option>
                <option value="Highest Price">Filter by: Highest Price</option>
                <option value="Top Reviewed">Filter by: Top Reviewed</option>
                <option value="Most Recent">Filter by: Most Recent</option>
              </select>
            </form>
          </div>

          <div className="num-results">
            {filteredProducts.length ? filteredProducts.length : ""}{" "}
            {filteredProducts.length > 1
              ? "Results"
              : filteredProducts.length === 0
                ? "No Results"
                : "Result"}{" "}
            for {`"${newStr.replace("%20", " ")}"`}
          </div>
        </div>
        <div className="products-container">
          {display.length
            ? display.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => history.push(`/products/${product.id}`)}
              >

                <div>


                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-image-container">
                      <img
                        className="single-product-image"
                        src={product.image_url}
                      />
                    </div>
                    <div className="reviews-price">
                      <div className="product-reviews">{' ★ ' + product.avg_rating}</div>
                      <p className="price">${product.price}</p>
                    </div>
                  </div>
                </div>

              </div>
            ))
            : filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={() => history.push(`/products/${product.id}`)}
              >
                <div>


                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-image-container">
                      <img
                        className="single-product-image"
                        src={product.image_url} />
                    </div>
                    <div className="product-reviews">{' ★ ' + product.avg_rating}</div>
                    <p className="price">${product.price}</p>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );

}
