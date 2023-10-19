import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
          message: "invalid email!"
        }
      ]
    },
    {
      placeholder: "Password",
      name: "Password",
      type: "password",
      rules: [
        {
          required: true,
          message: "invalid password!"
        }
      ]
    }
  ];

  const onSubmit = (data) => {
    //setSubmitted(true);
    // Convert to lowercase to match database's property
    const {
      Email: username,
      Email: email,
      Password: password,
      Category: category
    } = data;
    console.log({
      Email: username,
      Email: email,
      Password: password,
      Category: category
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
