import Footer from "../footer/Footer";
import axios from "axios";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const userData = useLoaderData();
  const [orderbackData, SetOrderBackData] = useState([]);
  const [showOrderback, SetShowOrderback] = useState(false);
  const [showEdityourInformationTap, SetShowEdityourInformationTap] =
    useState(false);

  const data = useActionData();
  console.log(data);

  console.log(userData.data.user);
  console.log(userData.data.user.email);

  async function handlegetpastorders() {
    const res = await axios.post(
      "https://pharma-online-api-production.up.railway.app/api/orders/getuserorders",
      { message: "hello" },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      console.log("order back successfully");
      SetOrderBackData(res);
      SetShowEdityourInformationTap(false);
      SetShowOrderback(true);
    }
  }
  function handleEditYourInformation() {
    SetShowOrderback(false);
    SetShowEdityourInformationTap(true);
  }

  // console.log(orderbackData.data.orders);
  // const orderShowenList = orderbackData.data.orders;

  return (
    <div>
      <div className="article-main">
        <div className="profile-page-main-component">
          <div className="user-profile-page">
            <h3>Profile Page:</h3>

            <p></p>

            <div>Email : {userData.data.user.email}</div>
            <div>Name : {userData.data.user.name}</div>
            <div>Address : {userData.data.user.address}</div>

            <p></p>

            <button onClick={handlegetpastorders}>View your past orders</button>
            <p></p>
            <button onClick={handleEditYourInformation}>
              Edit your information
            </button>
          </div>
          <div className="user-profile-page-right">
            {showOrderback &&
              // console.log(orderbackData.data.orders) &&
              orderbackData.data.orders.map((item, index) => {
                return (
                  <div key={item._id}>
                    <p>Order number: {index + 1} </p>
                    <p>Orders Products: {item.orderProducts.toString()}</p>
                    <p>Orders Total Price: ${item.orderTotalValue}</p>
                    ------
                  </div>
                );
              })}
            {showEdityourInformationTap && (
              <div className="component-default-edit-your-information">
                <h3>Edit your information tab:</h3>
                <Form method="post" action="/profile">
                  <label>
                    <span>Name:</span>
                    <input type="name" name="name" required />
                  </label>
                  <label>
                    <span>Address:</span>
                    <input type="address" name="address" required />
                  </label>

                  <button>Submit</button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
}

export const ProfileLoader = async ({}) => {
  const res = await axios.post(
    "https://pharma-online-api-production.up.railway.app/api/users/profile",
    { message: "hello" },
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );

  console.log(res);

  return res;
};

export const ProfileAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    name: data.get("name"),
    address: data.get("address"),
  };

  const datas = await axios.post(
    "https://pharma-online-api-production.up.railway.app/api/users/updateinfo",
    {
      submission,
    },
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );

  return datas;
};