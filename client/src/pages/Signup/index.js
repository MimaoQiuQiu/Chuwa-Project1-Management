import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthForm from "../../components/AuthForm";
import { signUpAction } from "../../app/userSlice";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    
    {
      placeholder: "Email",
      name: "email",
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
      name: "password",
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
      Email: email,
      Username: username,
      Password: password,
      Category: category,
    } = data;
    dispatch(signUpAction({ email, username, password, category }));
  };
  return (
    <div>
      <AuthForm
        buttonText="Create account"
        onSubmit={onSubmit}
        title="Sign up an account"
        fields={fields}
      />
      
    </div>
    
  );
}
