import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import Footer from "../footer/Footer";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const data = useActionData();
  const navTo = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  if (data) {
    setTimeout(() => {
      navTo("/");
    }, 1000);
  }

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
            {data && <p>Signup was successful, Redirecting in 1 second...</p>}

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

  const datas = axios.post(
    `https://pharma-online-api-production.up.railway.app/api/users/signup/`,
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

  // return 1;
  // if (res.status.ok) {

  return datas;
  // } else {
  //   throw Error("error happened");
  // }
};

// const response = await axios({
//   url: "https://pharma-online-api-production.up.railway.app/api/users/signup/",
//   method: "POST",
//   body: { submission },
// headers: {
//   "Content-Type": "application/json", //saying to the backend that this data is in json format
// },
// });

// const response = await fetch("https://pharma-online-api-production.up.railway.app/api/users/signup/", {
//   method: "POST",
//   body: JSON.stringify(submission),
//   headers: {
//     "Content-Type": "application/json", //saying to the backend that this data is in json format
//   },
// });
// const json = await response.json();

// if (response.ok) {
//   console.log("done");
//   console.log(
//     "because we recieved the token issued to the local-storage logged in user"
//   );
//   // console.log(json);
// }
// console.log(json);
// if (submission.message.length < 10) {
//   return { error: "Message must be over 10 chars long." };
// }

// send your post request

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
