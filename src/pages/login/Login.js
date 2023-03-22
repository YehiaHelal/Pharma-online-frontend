import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Footer from "../footer/Footer";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";

export default function Login() {
  const data = useActionData();
  const { user, dispatchUser } = useAuthContext();
  const navTo = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (data) {
      dispatchUser({ type: "LOGIN", payload: data });

      localStorage.setItem("user", JSON.stringify(data));

      setShowPopup(true);

      setTimeout(() => {
        navTo("/");
      }, 1000);
    }
  }, [data]);

  return (
    <>
      <div className="article-main">
        <div className="component-default-login-signup">
          <h3>Please enter your information here</h3>
          <Form method="post" action="/login">
            <label>
              <span>Your email:</span>
              <input type="email" name="email" required />
            </label>
            <label>
              <span>Your password:</span>
              <input type="password" name="password" required />
            </label>

            <button>Login</button>
            {showPopup && (
              <p>Login was successful, Redirecting in 1 second...</p>
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

export const LoginAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const datas = await axios.post(
    "https://pharma-online-api-production.up.railway.app/api/users/login",
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

  // if (submission.message.length < 10) {
  //   return { error: "Message must be over 10 chars long." };
  // }

  // send your post request
  return datas.data;
  // return ;
};
// );

// const sendingRequest = async () => {
//   const response = await fetch("https://pharma-online-api-production.up.railway.app/api/users/");

//   const json = await response.json();

//   if (response.ok) {
//     console.log("sent");
//   }

//   return json;
// };

// if (submission.message.length < 10) {
//   return { error: "Message must be over 10 chars long." };
// }

// redirect the user
// return redirect("/")
