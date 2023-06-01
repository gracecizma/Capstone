import React, { useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  ListGroup
} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getAllProducts } from "../../../store/products";
import AddToCart from "../../ShoppingCart/AddToCart";
import OpenModalMenuItem from "../../OpenModalButton/MenuItem";
import { addItemToCart } from "../../../store/shoppingcart";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../allproducts.css'


export default function Breads() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state?.products?.allProducts)
  // console.log("products obj", products)
  const productsArr = Object.values(products)
  // console.log("products array", productsArr)
  const currUser = useSelector((state) => state?.session?.user)

  if (!productsArr.length) dispatch(getAllProducts())

  let breadArr = [];
  productsArr?.forEach((product) => {
    if (product.category_id === 1) {
      breadArr.push(product)
    }
  })



  const disableButton = () => {
    if (!currUser) {
      return true;
    }
  };


  return (
    <>
      <div className="products-div">
        <Row xs={1} md={2} lg={3} xl={3} className="row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

          {breadArr.map((product) => (
            <Col key={product.id}>

              <Link to={`/products/${product?.id}`} className="product-tile">
                <Card className="product-tile">
                  <div className="product-name-container">
                    <Card.Title className="product-name">{product?.name}</Card.Title>
                  </div>
                  <div className="product-img-container">
                    <Card.Img className="product-img" src={product?.image_url} />
                  </div>

                  <Card.Body className="product-details-container">
                    <ListGroup variant="flush" className="product-grid-list">
                      <Row>
                        <Col xs={6} md={6} lg={6} xl={6}>
                          <ListGroup.Item className="details-text">
                            <Card.Text className="product-rating">
                              {product?.avg_rating ? '★ ' + Number(product?.avg_rating).toFixed(1) : '★ Be the first to review!'}
                            </Card.Text>
                          </ListGroup.Item>

                          <ListGroup.Item className="details-text">
                            <Card.Text className="product-total-reviews">
                              {product?.total_reviews === 1 ? product?.total_reviews + ' review' : ''}
                              {product?.total_reviews > 1 ? product?.total_reviews + ' reviews' : ''}
                            </Card.Text>
                          </ListGroup.Item>
                        </Col>

                        <Col xs={6} md={6} lg={6} xl={6}>
                          <ListGroup.Item className="details-text">
                            <Card.Text className="product-price">
                              ${parseFloat(product?.price).toFixed(2)}
                            </Card.Text>
                          </ListGroup.Item>

                          <ListGroup.Item className="details-text">
                            <Button
                              className="cart-button"
                              onClick={(e) => {
                                e.preventDefault();
                                const data = {
                                  user_id: currUser.id,
                                  product_id: product.id,
                                  quantity: 1,
                                };
                                console.log('item to be added', data);
                                dispatch(addItemToCart(data));
                              }}
                              style={{ listStyle: 'none' }}
                            >
                              <OpenModalMenuItem
                                itemText="Add to cart"
                                itemTextClassName="cart-button-text"
                                modalDisabled={disableButton}
                                modalComponent={<AddToCart product={product} quantity={1} />}
                              />
                            </Button>
                          </ListGroup.Item>
                        </Col>
                      </Row>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
