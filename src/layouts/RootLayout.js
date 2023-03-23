import { useEffect, useState } from "react";
import { Outlet, NavLink, redirect, Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useItemsCartContext } from "../hooks/useItemsCartContext";

export default function RootLayout() {
  const { items, dispatch } = useItemsCartContext();
  const [title, setTitle] = useState("");
  const { allItems, dispatcho } = useFetchItemsContext();
  const { user, dispatchUser } = useAuthContext();
  const navTo = useNavigate();

  const LogoutFunctionHandler = async () => {
    // fetch request and if ok the cookie will be removed
    const datas = await axios.post(
      "https://pharma-online-api-production.up.railway.app/api/users/logout",
      {},
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );

    // then remove user from local storage and redirect , which will set the context to null automatically
    localStorage.removeItem("user");

    // dispatch to context just to re-renders
    dispatchUser({ type: "LOGOUT" });

    navTo("/");
  };

  // useEffect(() => {}, [value]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatchUser({ type: "LOGIN", payload: user });
    }
  }, []);

  const searchedNameobject = allItems.find(
    (item) => item.name.toLowerCase() === title.toLowerCase()
  );

  console.log();
  console.log();

  let id;
  if (searchedNameobject) {
    const { _id } = searchedNameobject;

    id = _id;
  }

  const localStorageCartAllItems = JSON.parse(
    localStorage.getItem("cartItems")
  );

  let numberOfItems = 0;

  if (localStorageCartAllItems) {
    numberOfItems = localStorageCartAllItems.length;
  }

  return (
    <div className="root-layout">
      <header>
        <nav className="nav1">
          <h1>Pharmacy Online</h1>
          <NavLink to="contact">Contact</NavLink>

          {!user && <NavLink to="login">Login</NavLink>}
          {user && <NavLink to="profile">Profile</NavLink>}

          {!user && <NavLink to="signup">Signup</NavLink>}
          {user && (
            <Link to="" onClick={LogoutFunctionHandler}>
              logout
            </Link>
          )}
        </nav>
        <nav className="nav2">
          <NavLink to="/">Home</NavLink>

          <NavLink to="medications">Medications</NavLink>
          <NavLink to="skinCare">Skin Care</NavLink>
          <NavLink to="dailyEssentials">Daily Essentials</NavLink>
          <NavLink to="vitaminsAndSupplements">Supplements</NavLink>
        </nav>

        <nav className="nav3">
          <input
            className="search-bar"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <NavLink
            className="search-button"
            to={searchedNameobject ? "http://localhost:3000/" + id : ""}
          >
            Search
          </NavLink>

          <NavLink className="end" to="cart">
            Cart {numberOfItems === 0 ? "" : numberOfItems}
            {/* {cartNumber === 0 ? "" : cartNumber} */}
          </NavLink>
        </nav>

        {/* <Breadcrumbs /> */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}