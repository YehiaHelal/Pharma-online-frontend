import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Footer from "../footer/Footer";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Signup() {
  const data = useActionData();
  const navTo = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopupfrontend, setErrorShowPopupfrontend] = useState(false);
  const [showBackendErrorPopup, setShowBackendErrorPopup] = useState(false);
  const [showBackendErrorMessage, setShowBackendErrorMessage] = useState();

  // if (data.status === 200) {
  //   setShowPopup(true);
  // }
  // if (data === 2) {
  //   console.log("wrong");
  //   setErrorShowPopup(true);
  // }
  //  console.log(data);

  // using useRef and useEffect and not to cause a render ..

  useEffect(() => {
    if (data === "password error") {
      // count.current = count.current + 1;
      // console.log(count);
      setErrorShowPopupfrontend(true);
      setShowBackendErrorPopup(false);
    }
    // if (data !== undefined && data !== "error") {
    //   setShowPopup(true);
    // }
    if (data === "there is an existing user") {
      setErrorShowPopupfrontend(false);
      setShowBackendErrorPopup(true);
      setShowBackendErrorMessage("there is an existing user");
      //  console.log(showBackendErrorMessage);
    }
    if (typeof data === "object") {
      setErrorShowPopupfrontend(false);
      setShowBackendErrorPopup(false);
      setShowPopup(true);

      setTimeout(() => {
        navTo("/login");
      }, 1000);
    }
  }, [data]);

  // if (data === "error") {
  //   useRef(true);
  // }

  // console.log(data);

  // if (data) {
  //   setTimeout(() => {
  //     navTo("/");
  //   }, 1000);
  // }

  // console.log(data);

  return (
    <>
      <div className="article-main">
        <div className="component-default-login-signup">
          <h3>Please enter your information here</h3>
          <Form method="post" action="/signup">
            <label>
              <span>Your name:</span>
              <input type="name" name="name" required />
            </label>
            <label>
              <span>Your email:</span>
              <input type="email" name="email" required />
            </label>
            <label>
              <span>Your password:</span>
              <input type="password" name="password" required />
            </label>
            <button>Signup</button>
            {showPopup && (
              <p>Signup was successful, Redirecting to login in 1 second...</p>
            )}
            {/* {count.current === 2 && (
              <p>Password must be at least 6 characters long</p>
            )} */}
            {showErrorPopupfrontend && (
              <div className="error">
                Password must be longer than 6 characters long
              </div>
            )}

            {showBackendErrorPopup && (
              <div className="error">{showBackendErrorMessage}</div>
            )}

            {/* {data && data.error && <p>{data.error}</p>} */}
          </Form>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </>
  );
}

export const SignupAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    password: data.get("password"),
    name: data.get("name"),
  };

  if (submission.password.length < 6) {
    // "password must be longer than 6 characters"
    //  console.log("password must be longer than 6 characters long");
    const errorSet = "password error";
    return errorSet;
  }

  // const dataaa = async () => {
  try {
    const datas = await axios.post(
      `https://pharmacyonline.onrender.com/api/users/signup/`,
      { submission },
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
    return datas;
  } catch (error) {
    // console.log(error.response.data[0]);
    return error.response.data.error;
  }

  return 1;
};
// },
