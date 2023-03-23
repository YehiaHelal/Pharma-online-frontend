import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import LeftSideBar from "../../components/LeftSideBar";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";
import AllItemsComponent from "./AllItems";

const Medications = () => {
  const { allItems, dispatcho } = useFetchItemsContext(); // for checking all the items fetched
  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart
  const [value, setValue] = useState(0); // integer state
  const [ItemsShowen0, setItemsShowen] = useState([]); // integer state
  const [dropDown, setDropDown] = useState(false);

  const item = useLoaderData();

  useEffect(() => {
    setItemsShowen((ItemsShowen0) => item.slice(0, 10));
  }, []);

  // ------------------------
  // sorting

  function handleSortPlh() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }
  function handleSortPhl() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }

  function handlerSetNormal() {
    const sortedData = [...item].slice(0, 10);

    setItemsShowen(sortedData);
  }

  function handleSortDhl() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }

  function handleDropDown() {
    setDropDown(true);
  }

  function handleDropDownReset() {
    setDropDown(false);
  }

  // console.log(list)

  // let itemsShowen = item.slice(0, 10);

  // console.log(value);
  // console.log(itemsShowen);
  // console.log(ItemsShowen0);

  // function MyComponent() {
  //     // call your hook here
  //     const forceUpdate = useForceUpdate();

  // const { showedItems } = useState([]);

  // useEffect(() => {}, [showedItems]);

  // useEffect(() => {
  //   console.log(showedItems);
  // }, [showedItems]);

  // console.log(showedItems);

  // when u write from 0 to 10 , the first index is at 0 and the 10 item is at 9 index , and starting from 0 index so total 10
  // const newData1 = allItems.slice(0, 10);
  // console.log(newData1);
  // const newData2 = allItems.slice(10, 20);
  // console.log(newData2);
  //create your forceUpdate hook

  return (
    <div>
      <div>
        <div className="sorting-main">
          {!dropDown && (
            <button onClick={handleDropDown}>Sorting & Filters</button>
          )}

          {dropDown && (
            <div className="sorting-icons">
              <button onClick={handleSortPhl}>
                Sort from high price to low price{" "}
              </button>
              <button onClick={handleSortPlh}>
                Sort from low price to high price
              </button>
              <button onClick={handleSortDhl}>
                Sort from newest to oldest
              </button>
              <button onClick={handlerSetNormal}>Sort back to normal</button>
              <button onClick={handleDropDownReset}>Click to hide</button>
            </div>
          )}
        </div>

        <div className="item-default-and-leftSide-bar">
          <LeftSideBar />
          <div className="item-default">
            {ItemsShowen0 &&
              ItemsShowen0.map((item) => {
                return (
                  <div className="box" key={item._id}>
                    <a
                      href={
                        "https://pharma-online-frontend-production.up.railway.app/" +
                        item._id
                      }
                    >
                      <img
                        src={require(`./../../img/products/${item.image}`)}
                        alt="imageos"
                      ></img>
                      <p className="name">{item.name}</p>
                      <p className="price">price: {item.price}</p>
                    </a>

                    <button
                      // data={item}
                      onClick={() => {
                        const itemss = item;
                        dispatch({ type: "ADD", payload: itemss });
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
        </div>
        <div className="button-instead-of-scrolling">
          <div>Page</div>
          <button
            onClick={() => {
              setValue((value) => value + 1);
              setItemsShowen((ItemsShowen0) => item.slice(0, 10));
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              setItemsShowen((ItemsShowen0) => item.slice(10, 20));
            }}
          >
            2
          </button>
          <button
            onClick={() => {
              setItemsShowen((ItemsShowen0) => item.slice(20, 30));
            }}
          >
            3
          </button>
          <button
            onClick={() => {
              setItemsShowen((ItemsShowen0) => item.slice(30, 40));
            }}
          >
            4
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Medications;

// data loader
export const MedicationsPageLoader = async ({ params }) => {
  const res = await fetch(
    "https://pharma-online-api-production.up.railway.app/api/items/"
  );

  if (!res.ok) {
    throw Error("Could not find that career.");
  }

  return res.json();
};
