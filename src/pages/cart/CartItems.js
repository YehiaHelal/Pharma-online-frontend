import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";
import axios from "axios";
import { useState } from "react";

const CartItems = () => {
  const { user, dispatchUser } = useAuthContext();
  const { items, dispatch } = useItemsCartContext();
  const navTo = useNavigate();
  const [myCategory, setMyCategory] = useState("");
  const [myCategorya, setMyCategorya] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [placeOrderButton, setPlaceOrderButton] = useState(false);

  function handlesetPlaceOrderButton() {
    setPlaceOrderButton(true);
  }

  // console.log(items);

  // removing onclick item from the cart selected. and re-rendering the page fast
  let filterstepone;
  let filtersteptwo;

  const CartitemsSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems")
  );

  // to get all the products name in an array
  const orderProductsNameArray = CartitemsSavedFromLocalStorage.map(
    (item) => item.name
  );

  // to get all the products values and sums them
  const orderTotalvalueArray = CartitemsSavedFromLocalStorage.map(
    (item) => item.price
  );
  const orderTotalvalue = orderTotalvalueArray.reduce((a, b) => a + b, 0);

  const OrderDetails = {
    orderProducts: [...orderProductsNameArray],
    orderTotalValue: orderTotalvalue,
  };

  function handleShowPopup() {
    setShowPopup(true);
  }

  // to send the order place on the backend
  const CartFunctionHandler = async () => {
    // fetch request and if ok the cookie will be removed
    

    const response = await axios.post(
      "https://pharma-online-api-production.up.railway.app/api/orders/cartorder",
      { OrderDetails },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    if ((response.data.status = 200)) {
      handleShowPopup();

      console.log("order placed and redirecting");

      setTimeout(() => {
        localStorage.removeItem("cartItems");
        navTo("/");
      }, 2000);
    }
  };

  return (
    <>
      <div className="article-main">
        <div className="cart-page-main">
          <div className="item-default-On-Cart-Page-Left">
            {CartitemsSavedFromLocalStorage &&
              CartitemsSavedFromLocalStorage.map((item) => {
                return (
                  <div className="box" key={item._id}>
                    <img
                      src={require(`./../../img/products/${item.image}`)}
                      alt="imageos"
                    ></img>
                    <div className="name">{item.name}</div>
                    <div className="price">Price:{item.price}</div>
                    <div>quantity : 1</div>
                    {/* <div className="buttons-to-add-subtrack">
                      <button>+1</button>
                      <button>-1</button>
                    </div> */}

                    <button
                      className="remove-item-cart-button"
                      key={item}
                      onClick={() => {
                        // setMyCategory(item._id);

                        filterstepone = JSON.parse(
                          localStorage.getItem("cartItems")
                        );
                        filtersteptwo = filterstepone.filter(
                          (newCart) => newCart._id !== item._id
                        );
                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify(filtersteptwo)
                        );
                        // setMyCategorya([...filtersteptwo]);

                        dispatch({ type: "SET_ITEM", payload: filtersteptwo });
                        // console.log(items);
                      }}

                      // data={item}
                      // onClick={() => {
                      //   const itemss = item;
                      //   // dispatch({ type: "ADD", payload: itemss });
                      // }}
                    >
                      Remove item
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="cart-page-rightSide-order-details">
            <p>Order Details: </p>
            <p>Order total price: {orderTotalvalue}$ </p>

            {!user && <p>To place the order please login</p>}
            {handlesetPlaceOrderButton}

            {placeOrderButton && (
              <p>Please add a tour first to be able to place the order</p>
            )}

            {CartitemsSavedFromLocalStorage.length === 0 && (
              <div>
                <p>Please add an item first to place an order</p>
              </div>
            )}

            {CartitemsSavedFromLocalStorage.length > 0 && (
              <button onClick={CartFunctionHandler}>Place your order</button>
            )}

            {showPopup && <p>Order was placed, Redirecting in 2 second...</p>}
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </>
  );
};

export default CartItems;
