import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";

export default function ItemSearch() {
  const { id } = useParams();
  const item = useLoaderData();
  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart

  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("cartItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          console.log("we are dealing with duplicate");
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
            console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          console.log(filteringanyextra);

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

  return (
    <div>
      <div className="article-main">
        <div className="searched-each-item">
          <div className="box-item-searched-tab" key={item._id}>
            <img
              src={require(`./../../img/products/${item.image}`)}
              alt="imageos"
            ></img>
            <p className="name">{item.name}</p>
            <p className="price">price: ${item.price}</p>

            <button
              className="add-to-cart-button"
              // data={item}
              onClick={() => {
                const numberofitemforvalue = JSON.parse(
                  localStorage.getItem("cartItems")
                );

                setaddItemToCart(item);
                setChangeValue(numberofitemforvalue.length + 1);

                // dispatch({ type: "ADD", payload: itemss });
                // // so we here getting the data from the local storage if they are there, and adding them with the current context so it says
                // // up to date.
                // const addingToLocalStorage = JSON.parse(
                //   localStorage.getItem("cartItems")
                // );
                // const mergedArray = [...addingToLocalStorage, itemss];
                // localStorage.setItem("cartItems", JSON.stringify(mergedArray));

                // dispatchoo({ type: "SET_TO_TRUE", payload: true });
              }}
            >
              Add To Cart
            </button>
          </div>
          <div className="details">
            <div>
              <p className="name">Item Name: {item.name}</p>
              <p className="price">Item Price: ${item.price}</p>

              <p>
                Full Item Description : Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Dicta sed sunt ipsam quam assumenda quasi ipsa
                facilis laborum rerum voluptatem!
              </p>
            </div>

            {/*  if logged in can add items to favourite and will be stored on the backend.
          <button
            // data={item}
            onClick={() => {
              const itemss = item;
              dispatch({ type: "ADD", payload: itemss });
              // dispatchoo({ type: "SET_TO_TRUE", payload: true });
            }}
          >
            Add To Cart
          </button> */}
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
}

// data loader
export const itemSearchLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:4000/api/items/" + id);

  if (!res.ok) {
    throw Error("Could not find that item");
  }

  return res.json();
};
