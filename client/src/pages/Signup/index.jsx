// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import AuthForm from "../../components/AuthForm";
// import { signUpAction } from "../../app/userSlice";
// import { removeError } from "../../app/errorSlice";
// import { Typography, message } from "antd";

// export default function SignUp() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { status } = useSelector((state) => state.user);
//   const { message: error } = useSelector((state) => state.error);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     dispatch(removeError());
//   }, []);

//   // Redirect to signin page
//   useEffect(() => {
//     if (submitted && status === "succeeded") {
//       message.success("Signup successfully");
//       navigate("/signin");
//     }
//   }, [status, submitted]);

//   const fields = [
//     {
//       name: "Email",
//       type: "text",
//       rules: [
//         {
//           required: true,
//           message: "Email Cannot be Empty",
//         },
//         {
//           type: "email",
//           message: "Invalid Email Format",
//         },
//       ],
//     },
//     {
//       name: "Username",
//       type: "text",
//       rules: [
//         {
//           required: true,
//           message: "Username Cannot be Empty",
//         },
//       ],
//     },
//     {
//       name: "Password",
//       type: "password",
//       rules: [
//         {
//           required: true,
//           message: "Invalid Password Input",
//         },
//       ],
//     },
//     {
//       name: "Category",
//       type: "text",
//       rules: [
//         {
//           required: true,
//           message: "Enter Your Role",
//         },
//       ],
//     },
//   ];

//   const onSubmit = (data) => {
//     setSubmitted(true);
//     // Convert to lowercase to match database's property
//     const {
//       Email: email,
//       Username: username,
//       Password: password,
//       Category: category,
//     } = data;
//     dispatch(signUpAction({ email, username, password, category }));
//   };

//   return (
//     <div>
//       <AuthForm
//         buttonText="Create account"
//         onSubmit={onSubmit}
//         title="Sign up an account"
//         fields={fields}
//         errors={error}
//         buttomText={
//           <>
//             <Typography>
//               Already have an account? <Link to={"/signin"}>Sign in</Link>
//             </Typography>
//           </>
//         }
//       ></AuthForm>
//     </div>
//   );
// }

import React from "react";
import { MailOutlined, UserOutlined, LinkOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import AuthForm from "../../components/AuthForm";
import { signUpAction } from "../../app/userSlice";
import { removeError } from "../../app/errorSlice";
export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { message: error } = useSelector((state) => state.error);

  const fields = [
    {
      placeholder: "Email",
      name: "Email",
      type: "text",
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: "invalid email!",
        },
      ],
    },
    {
      name: "Username",
      placeholder: "Username",
      type: "text",
      rules: [
        {
          required: true,
          message: "Username Cannot be Empty",
        },
      ],
    },
    {
      placeholder: "Password",
      name: "Password",
      type: "password",
      rules: [
        {
          required: true,
          message: "invalid password!",
        },
      ],
    },
  ];

  const onSubmit = (data) => {
    //setSubmitted(true);
    // Convert to lowercase to match database's property
    const {
      Username: username,
      Email: email,
      Password: password,
      Category: category,
    } = data;
    console.log({
      Username: username,
      Email: email,
      Password: password,
      Category: category,
    });
    dispatch(signUpAction({ email, username, password, category }));
    navigate(location.state?.from || "/");
  };
  return (
    <div>
      <AuthForm
        buttonText="Create account"
        onSubmit={onSubmit}
        title="Sign up an account"
        fields={fields}
        errors={error}
      />
    </div>
  );
}
