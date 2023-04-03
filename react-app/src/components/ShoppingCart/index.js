import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserCart, updateItemInCart, deleteFromCart } from "../../store/shoppingcart";
// import { addNewOrder } from "../../store/orders"
import "./cart.css";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.carts.cart);
  console.log("cart items", userCart);
  const currUser = useSelector((state) => state?.session?.user);
  console.log("current user", currUser);
  // const history = useHistory();

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

  // const orderHandler = async (e) => {
  //   e.preventDefault();

  //   history.push(`/orders/success`);

  //   return;
  // };

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

  // const cartPrice = (cartArr) => {
  //   let total = 0;
  //   for (let item of cartArr) {
  //     let itemPrice = item.quantity * item.product.price;
  //     console.log("item price", itemPrice);
  //     total += itemPrice;
  //   }
  //   return total;
  // };

  let totalQuantity = cartQuantity(cartArr);
  console.log("cart quantity", totalQuantity)

  if (totalQuantity === 0) {
    return (
      <div className="empty-cart-container">
        <h1>Your cart is currently empty.</h1>
        <NavLink to="/products">Continue shopping</NavLink>
      </div>
    );
  }

  // let totalPrice = cartPrice(cartArr);

  return (
    // <h1>Welcome to your shopping cart</h1>
    <div className="full-cart-container">
      <div className="cart-total-quantity-header">
        {totalQuantity === 1 ? (
          <h2>{totalQuantity} item in your cart</h2>
        ) : (
          <h2>{totalQuantity} items in your cart</h2>
        )}
      </div>

      <div className="cart-items-container">
        <div className="cart-items-header">
          <p className="cart-product-header">Product</p>
          <p className="cart-price-header">Price</p>
          <p className="cart-quantity-header">Qty</p>
          <p className="cart-total-header">Total</p>
        </div>
        {cartArr?.map((item) => (
          <div key={item.id} className="single-cart-item-container">
            <div className="cart-preview-img-container">
              <h3>{item.product.name}</h3>
              <img
                className="cart-preview-img"
                src={item.product.image_url}
                style={{ width: "200px", height: "200px" }}
              />
            </div>





            <div className="cart-item-price">
              ${parseFloat(item.product.price).toFixed(2)}
            </div>

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
              <button
                className="remove-from-cart-button"
                onClick={(e) => deleteHandler(e, item)}
              >
                Remove
              </button>
            </div>

            <div className="cart-item-total-price">
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

        ))}
      </div>
    </div>
  );
}
