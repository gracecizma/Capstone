import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  ListGroup,
  Row,
  Col,
  Offcanvas
} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getAllProducts } from "../../store/products";
import AddToCart from "../ShoppingCart/AddToCart";
import OpenModalMenuItem from "../OpenModalButton/MenuItem";
import { addItemToCart } from "../../store/shoppingcart";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./allproducts.css"

export default function Products() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state?.products?.allProducts)
  const currUser = useSelector((state) => state?.session?.user)
  const productsArr = Object.values(products)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {
    let timeoutId;
    if (show) {
      timeoutId = setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [show]);

  if (!productsArr.length) return null

  const disableButton = () => {
    if (!currUser) {
      return true;
    }
  };

  return (
    <>
      <div className="products-div">
        <Row xs={1} md={2} lg={3} xl={3}>
          {productsArr.map((product) => (
            <Col key={product?.id}>
              <Link to={`/products/${product.id}`}>

                <Card className="product-tile" >
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
                              {product?.avg_rating ? ' ★ ' + Number(product?.avg_rating).toFixed(1) : '★ Be the first to review!'}
                            </Card.Text>
                          </ListGroup.Item>

                          <ListGroup.Item className="details-text">
                            <Card.Text className="product-total-reviews">
                              {product?.total_reviews === 0 ? '' : ''}
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
                              onClick={(e) => {
                                e.preventDefault();
                                const data = {
                                  user_id: currUser.id,
                                  product_id: product.id,
                                  quantity: 1,
                                };
                                console.log('item to be added', data);
                                dispatch(addItemToCart(data));
                                setShow(true)
                              }}
                              style={{ listStyle: 'none' }}
                            >
                              <Offcanvas
                                show={show}
                                onHide={handleClose}
                                placement="end"
                                backdrop={false}
                              >
                                <Offcanvas.Header closeButton onHide={handleClose}>
                                  <Offcanvas.Title>Item Added to Cart</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                  <AddToCart product={product} quantity={1} />
                                </Offcanvas.Body>
                              </Offcanvas>
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
      </div >
    </>
  )
}
