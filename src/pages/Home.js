import { useEffect, useState } from "react";
import { json, Link, NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";

// components

import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useItemsCartContext } from "../hooks/useItemsCartContext";

import Footer from "./footer/Footer";

import AllItemsOnMainPage from "../components/AllItemsOnMainPage";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { allItems, dispatcho } = useFetchItemsContext();
  const { items, dispatch } = useItemsCartContext();
  const { state, dispatchUser } = useAuthContext();
  const [slidingImagesOffer, setSlidingImagesOffer] = useState(1);
  const [slidingThirtyOfferItems, setSlidingThirtyOfferItems] = useState(1);

  const firstTen = allItems.slice(0, 10);

  let allItemsOnThirtyPercentOffer;

  if (slidingThirtyOfferItems === 1) {
    allItemsOnThirtyPercentOffer = allItems.slice(20, 25);
    console.log(allItemsOnThirtyPercentOffer);
  }
  if (slidingThirtyOfferItems === 2) {
    allItemsOnThirtyPercentOffer = allItems.slice(25, 30);
    console.log(allItemsOnThirtyPercentOffer);
  }

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://pharma-online-api-production.up.railway.app/api/items/"
      );

      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  function handleSlidingImagesOffer1() {
    setSlidingImagesOffer(1);
  }

  function handleSlidingImagesOffer2() {
    setSlidingImagesOffer(2);
  }
  function handleSlidingImagesOffer3() {
    setSlidingImagesOffer(3);
  }

  function handleSlidingThirtyOfferItems1() {
    setSlidingThirtyOfferItems(1);
  }
  function handleSlidingThirtyOfferItems2() {
    setSlidingThirtyOfferItems(2);
  }

  return (
    <div>
      <div className="body">
        <div className="offers">
          <div>
            <a href="http://localhost:3000/offers">
              <div className="first-offer">
                <img
                  src={require(`./../img/offers/our-app.webp`)}
                  alt="offer-one"
                />

                <img
                  src={require(`./../img/offers/offer-2.webp`)}
                  alt="offer-one"
                />
              </div>
            </a>
          </div>

          <div>
            <a href="http://localhost:3000/offers">
              <div className="second-offer">
                {slidingImagesOffer === 1 && (
                  <img
                    className="second-offer-img"
                    src={require(`./../img/offers/offer-1.webp`)}
                    alt="offer-one"
                  />
                )}

                {slidingImagesOffer === 2 && (
                  <img
                    className="second-offer-img"
                    src={require(`./../img/offers/offer-2.webp`)}
                    alt="offer-one"
                  />
                )}
                {slidingImagesOffer === 3 && (
                  <img
                    className="second-offer-img"
                    src={require(`./../img/offers/offer-3.webp`)}
                    alt="offer-one"
                  />
                )}

                {/* /* <img
              className=""
              src={require(`./../img/offers/offer-2.webp`)}
              alt="offer-one"
            />  */}
              </div>
            </a>
            <div className="sliding-offers-buttons">
              <button onClick={handleSlidingImagesOffer1}></button>
              <button onClick={handleSlidingImagesOffer2}></button>
              <button onClick={handleSlidingImagesOffer3}></button>
            </div>
          </div>
        </div>

        <div>
          <h3>Categories</h3>
        </div>

        <div className="grid-container-catogeries-img">
          <a href="http://localhost:3000/medications">
            <div className="img">
              <img
                src={require(`./../img/catogeries/category-1.webp`)}
                alt="category-one"
              />
              <p>Medications</p>
            </div>
          </a>
          <Link to="http://localhost:3000/skinCare">
            <div className="img">
              <img
                src={require(`./../img/catogeries/category-2.webp`)}
                alt="category-two"
              />
              <p>Skin Care</p>
            </div>
          </Link>
          <Link to={"http://localhost:3000/dailyEssentials"}>
            <div className="img">
              <img
                src={require(`./../img/catogeries/category-4.webp`)}
                alt="category-three"
              />
              <p>Daily Essentials</p>
            </div>
          </Link>
          <Link to={"http://localhost:3000/vitaminsAndSupplements"}>
            <div className="img">
              <img
                src={require(`./../img/catogeries/category-3.webp`)}
                alt="category-four"
              />
              <p>Vitamins & Supplements</p>
            </div>
          </Link>
        </div>

        <div>
          <h3>15% Offers</h3>
        </div>

        <div>
          <a
            href="http://localhost:3000/offers"
            className="grid-container-offers2"
          >
            <img
              src={require(`./../img/offers2/offers2-1.webp`)}
              alt="offer2-one"
            />
            <img
              src={require(`./../img/offers2/offers2-2.webp`)}
              alt="offer2-two"
            />
            <img
              src={require(`./../img/offers2/offers2-3.webp`)}
              alt="offer2-three"
            />
          </a>
        </div>

        <div>
          <h3>All Products</h3>
        </div>

        <AllItemsOnMainPage props={firstTen} />

        <div>
          <div className="offer-3rd">
            <h3>Items On 30% Discount</h3>
          </div>

          <div className="item-default-On-Main-Page-offer-3rd">
            {allItemsOnThirtyPercentOffer &&
              allItemsOnThirtyPercentOffer.map((item) => {
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
          <div className="sliding-offers-buttons">
            <button onClick={handleSlidingThirtyOfferItems1}></button>
            <button onClick={handleSlidingThirtyOfferItems2}></button>
          </div>
        </div>

        <div className="grid-container-comments-section">
          <h2>Comments From Our Customers</h2>

          <div className="Each-comment">
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis */}
            </div>

            <div className="user-comment-name">
              <div>Mohamed hassan</div>
              <div>15/10/2021 </div>
            </div>
          </div>

          <div className="Each-comment">
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </div>
            <div className="user-comment-name">
              <div>Mohamed hassan</div>
              <div>15/10/2021 </div>
            </div>
          </div>
          <div className="Each-comment">
            <div className="comment">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
            </div>
            <div className="user-comment-name">
              <div>Mohamed hassan</div>
              <div>15/10/2021 </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

// export const allItemLoader = async () => {
//   const res = await fetch("https://pharma-online-api-production.up.railway.app/api/items/");

//   return res.json();
// };
