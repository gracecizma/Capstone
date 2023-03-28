import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  getUserCart,
  updateItemInCart,
  deleteFromCart,
} from "../../store/shoppingcart";
// import { addNewOrder } from "../../store/orders"
import "./shoppingcart.css";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.carts.cart);
  console.log("cart items", userCart);
  const currUser = useSelector((state) => state?.session?.user);
  console.log("current user", currUser);
  const history = useHistory();

  let cartArr;
  if (userCart) {
    cartArr = Object.values(userCart);
  }

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  if (!currUser) {
    return (
      <div className="cart-container">
        <h1>Please log in to add items to cart</h1>
      </div>
    );
  }

  const updateHandler = async (e, item) => {
    const itemData = {
      id: item.id,
      userId: currUser.id,
      productId: item.product_id,
      quantity: e.target.value,
    };
    await dispatch(updateItemInCart(itemData));
  };

  const deleteHandler = async (e, item) => {
    e.preventDefault();
    const itemData = {
      id: item.id,
      userId: currUser.id,
      productId: item.product_id,
    };
    await dispatch(deleteFromCart(itemData));
  };

  const orderHandler = async (e) => {
    e.preventDefault();

    history.push(`/orders/success`);

    return;
  };

  function maxAvailable(quantity) {
    const maxQuantity = [];
    for (let i = 1; i <= quantity; i++) {
      maxQuantity.push(i);
    }
    return maxQuantity;
  }

  const cartQuantity = (cartArr) => {
    let total = 0;
    for (let item of cartArr) {
      total += item.quantity;
    }
    return total;
  };

  const cartPrice = (cartArr) => {
    let total = 0;
    for (let item of cartArr) {
      let itemPrice = item.quantity * item.product.price;
      console.log("item price", itemPrice);
      total += itemPrice;
    }
    return total;
  };

  if (cartQuantity === 0) {
    return (
      <div className="empty-cart-container">
        <h1>Your cart is currently empty.</h1>
        <NavLink to="/">Discover something unique to fill it up</NavLink>
      </div>
    );
  }

  let totalQuantity = cartQuantity(cartArr);
  console.log("cart array", cartArr);
  let totalPrice = cartPrice(cartArr);

  return (
    // <h1>Welcome to your shopping cart</h1>
    <div className="full-cart-container">
      <div className="cart-quantity-header">
        {totalQuantity === 1 ? (
          <h2>{totalQuantity} item in your cart</h2>
        ) : (
          <h2>{totalQuantity} items in your cart</h2>
        )}
      </div>

      <div className="cart-items-container">
        {cartArr?.map((item) => (
          <div key={item.id} className="single-cart-item-container">
            <div className="cart-preview-img-container">
              <img
                className="cart-preview-img"
                src={item.product?.images[0]?.url}
              />
            </div>

            <div className="cart-item-info">
              <h3>{item.product.name}</h3>

              <button
                className="remove-from-cart-button form-button"
                onClick={(e) => deleteHandler(e, item)}
              >
                Remove
              </button>

              <div className="cart-item-quantity">
                <p className="total-text">Quantity</p>
                <select onChange={(e) => updateHandler(e, item)}>
                  {maxAvailable(item.product.quantity).map((number) =>
                    item.quantity === number ? (
                      <option value={number}>{number} </option>
                    ) : (
                      <option value={number}>{number}</option>
                    )
                  )}
                </select>
              </div>

              <div className="cart-item-price">
                <div>
                  ${parseFloat(item.product.price * item.quantity).toFixed(2)}
                </div>
                {item.product.quantity === 1 ? (
                  <div> Last item available! Order soon!</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
