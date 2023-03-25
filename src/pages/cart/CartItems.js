import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

const CartItems = () => {
  const { user, dispatchUser } = useAuthContext();
  const { items, dispatch } = useItemsCartContext();
  const navTo = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [placeOrderButton, setPlaceOrderButton] = useState(false);
  const [hideOrderButton, setHideOrderButton] = useState(false);

  //
  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  // useEffect(() => {}, [duplicateItemDealWith]);

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("cartItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          //     console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          //    console.log("we are dealing with duplicate");
          //dealing with the duplicate
          // const ItemIncresedNumberofItems = checkforduplicatefilter.map(
          //   (item) => {
          //     item.numberofitem += 1;
          //     return item;
          //   }
          // );

          const ItemIncresedNumberofItems = checkforduplicatefilter.map(
            (item) => {
              item.numberofitem += 1;
              return item;
            }
          );
          // ItemIncresedNumberofItems

          // filtering the duplicated in the local storage and just keeping one

          const filteringanyextra = localStoragecurrentItems.filter((item) => {
            //    console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          //    console.log(filteringanyextra);

          dispatch({ type: "ADD", payload: ItemIncresedNumberofItems[0] });

          const mergedArray = [
            ...filteringanyextra,
            ItemIncresedNumberofItems[0],
          ];

          localStorage.setItem("cartItems", JSON.stringify(mergedArray));
        }, 500);
      } else {
        dispatch({ type: "ADD", payload: addItemToCart });

        const mergedArray = [...localStoragecurrentItems, addItemToCart];

        localStorage.setItem("cartItems", JSON.stringify(mergedArray));
      }

      // if (checkforduplicatefilter) {
      //   setDuplicateItemDealWith(checkforduplicatefilter);
      // }
      // console.log(addItemToCart);
      // console.log("we are inside");

      // so we here getting the data from the local storage if they are there, and adding them with the current context so it says
      // up to date.
      // const ToLocalStorageitems = JSON.parse(
      //   localStorage.getItem("cartItems")
      // );
    }
  }, [addItemToCart, changeValue]);

  //

  function handlesetPlaceOrderButton() {
    setPlaceOrderButton(true);
  }

  let itemQuantityOneChecking;
  let addingFilterstepone;
  let addingFiltersteptwo;
  let newFilteredTargetItem;

  let filteredTargetItem;

  // console.log(items);

  // removing onclick item from the cart selected. and re-rendering the page fast
  let filterstepone;
  let filtersteptwo;

  const CartitemsSavedFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems")
  );

  // to get all the products name in an array
  const orderProductsNameArray = CartitemsSavedFromLocalStorage.map((item) => [
    item.name,
  ]);

  const numberOfItems = CartitemsSavedFromLocalStorage.map((item) => [
    item.numberofitem,
  ]);

  // console.log(numberOfItems);

  // console.log(orderProductsNameArray);

  // to get all the products values and sums them
  const orderTotalvalueArray = CartitemsSavedFromLocalStorage.map(
    (item) => item.price * item.numberofitem
  );
  const orderTotalvalue = orderTotalvalueArray.reduce((a, b) => a + b, 0);

  const OrderDetails = {
    orderProducts: [...orderProductsNameArray],
    orderTotalValue: orderTotalvalue,
    numberofitems: [...numberOfItems],
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
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      }
    );
    // console.log(response);

    if ((response.data.status = 200)) {
      handleShowPopup();
      setHideOrderButton(true);

      // console.log("order placed and redirecting");

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
                    <div>quantity : {item.numberofitem}</div>
                    <div className="buttons-to-add-subtrack">
                      <button
                        onClick={() => {
                          addingFilterstepone = JSON.parse(
                            localStorage.getItem("cartItems")
                          );
                          addingFiltersteptwo = addingFilterstepone.filter(
                            (newCart) => newCart._id !== item._id
                          );

                          filteredTargetItem = addingFilterstepone.filter(
                            (newCart) => newCart._id === item._id
                          );

                          newFilteredTargetItem = filteredTargetItem.map(
                            (item) => {
                              item.numberofitem = item.numberofitem - 1;
                              return item;
                            }
                          );

                          [itemQuantityOneChecking] = [
                            ...newFilteredTargetItem,
                          ];

                          //    console.log(itemQuantityOneChecking.numberofitem);

                          if (itemQuantityOneChecking.numberofitem >= 1) {
                            const mergedArray2 = [
                              ...addingFiltersteptwo,
                              ...newFilteredTargetItem,
                            ];
                            //         console.log(mergedArray2);

                            localStorage.setItem(
                              "cartItems",
                              JSON.stringify(mergedArray2)
                            );

                            dispatch({
                              type: "SET_ITEM",
                              payload: mergedArray2,
                            });
                          }

                          if (itemQuantityOneChecking.numberofitem < 1) {
                            //     console.log("we can't subtract more");

                            filterstepone = JSON.parse(
                              localStorage.getItem("cartItems")
                            );

                            //     console.log(filterstepone);
                            filtersteptwo = filterstepone.filter(
                              (newCart) => newCart._id !== item._id
                            );
                            localStorage.setItem(
                              "cartItems",
                              JSON.stringify(filtersteptwo)
                            );
                            // setMyCategorya([...filtersteptwo]);

                            dispatch({
                              type: "SET_ITEM",
                              payload: filtersteptwo,
                            });
                            // console.log(items);
                          }
                          // localStorage.setItem(
                          //   "cartItems",
                          //   JSON.stringify(filtersteptwo)
                          // );
                          // setMyCategorya([...filtersteptwo]);

                          // console.log(items);
                          //   localStorage.setItem(
                          //     "cartItems",
                          //     JSON.stringify(addingFiltersteptwo)
                          //   );
                          //   // setMyCategorya([...filtersteptwo]);

                          //   dispatch({ type: "SET_ITEM", payload: addingFiltersteptwo });
                          //   // console.log(items);
                        }}
                      >
                        -1
                      </button>
                      <button
                        onClick={() => {
                          addingFilterstepone = JSON.parse(
                            localStorage.getItem("cartItems")
                          );
                          addingFiltersteptwo = addingFilterstepone.filter(
                            (newCart) => newCart._id !== item._id
                          );

                          filteredTargetItem = addingFilterstepone.filter(
                            (newCart) => newCart._id === item._id
                          );

                          newFilteredTargetItem = filteredTargetItem.map(
                            (item) => {
                              item.numberofitem = item.numberofitem + 1;
                              return item;
                            }
                          );

                          // localStorage.setItem(
                          //   "cartItems",
                          //   JSON.stringify(filtersteptwo)
                          // );
                          // setMyCategorya([...filtersteptwo]);

                          const mergedArray2 = [
                            ...addingFiltersteptwo,
                            ...newFilteredTargetItem,
                          ];
                          //    console.log(mergedArray2);

                          localStorage.setItem(
                            "cartItems",
                            JSON.stringify(mergedArray2)
                          );

                          dispatch({ type: "SET_ITEM", payload: mergedArray2 });
                          // console.log(items);
                          //   localStorage.setItem(
                          //     "cartItems",
                          //     JSON.stringify(addingFiltersteptwo)
                          //   );
                          //   // setMyCategorya([...filtersteptwo]);

                          //   dispatch({ type: "SET_ITEM", payload: addingFiltersteptwo });
                          //   // console.log(items);
                        }}

                        //   const numberofitemforvalue = JSON.parse(
                        //     localStorage.getItem("cartItems")
                        //   );

                        //   setaddItemToCart(item);
                        //   setChangeValue(numberofitemforvalue.length + 1);
                        // }}
                      >
                        +1
                      </button>
                    </div>

                    <button
                      className="remove-item-cart-button"
                      key={item}
                      onClick={() => {
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

            {user &&
              !hideOrderButton &&
              CartitemsSavedFromLocalStorage.length > 0 && (
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
