import { useItemsCartContext } from "../hooks/useItemsCartContext";
import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useEffect, useState } from "react";

const AllItemsOnMainPage = (props) => {
  const { allItems, dispatcho } = useFetchItemsContext(); // for checking all the items fetched
  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart

  const firstTen = props.props;

  let emptyarray = [];
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify(emptyarray));
  }

  const [value, setValue] = useState(0); // integer state
  const [ItemsShowen0, setItemsShowen] = useState([]); // integer state

  // const { showedItems, setShowedItems } = useState();
  // const changeShowedItemsdata = (item) => {
  //   setShowedItems(item.slice(10, 20));
  // };

  useEffect(() => {
    setItemsShowen((ItemsShowen0) => allItems.slice(0, 10));
  }, [allItems]);

  // const addingToLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

  // console.log(addingToLocalStorage);

  // when u write from 0 to 10 , the first index is at 0 and the 10 item is at 9 index , and starting from 0 index so total 10
  // const newData1 = allItems.slice(0, 10);
  // console.log(newData1);
  // const newData2 = allItems.slice(10, 20);
  // console.log(newData2);

  return (
    <div>
      <div className="item-default-On-Main-Page">
        {ItemsShowen0 &&
          ItemsShowen0.map((item) => {
            return (
              <div className="box" key={item._id}>
                <a href={"http://localhost:3000/" + item._id}>
                  <img
                    src={require(`./../img/products/${item.image}`)}
                    alt="imageos"
                  ></img>
                  <p className="name">{item.name}</p>
                  <p className="price">price: ${item.price}</p>
                </a>

                <button
                  className="add-to-cart-button"
                  // data={item}
                  onClick={() => {
                    const itemss = item;
                    dispatch({ type: "ADD", payload: itemss });
                    // so we here getting the data from the local storage if they are there, and adding them with the current context so it says
                    // up to date.
                    const addingToLocalStorage = JSON.parse(
                      localStorage.getItem("cartItems")
                    );
                    const mergedArray = [...addingToLocalStorage, itemss];
                    localStorage.setItem(
                      "cartItems",
                      JSON.stringify(mergedArray)
                    );

                    // dispatchoo({ type: "SET_TO_TRUE", payload: true });
                  }}
                >
                  Add To Cart
                </button>
              </div>
            );
          })}
      </div>
      <div className="button-instead-of-scrolling">
        <div>Page</div>
        <button
          onClick={() => {
            setValue((value) => value + 1);
            setItemsShowen((ItemsShowen0) => allItems.slice(0, 10));
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(10, 20));
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(20, 30));
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            setItemsShowen((ItemsShowen0) => allItems.slice(30, 40));
          }}
        >
          4
        </button>
      </div>
    </div>
  );
};

export default AllItemsOnMainPage;
