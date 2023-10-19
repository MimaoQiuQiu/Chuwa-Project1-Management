import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { signUpUser } from '../../app/userSlice';
import ForgotForm from '../../components/ForgotForm';

export default function Forgot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const fields = [
  
    {
      placeholder: "Email",
      name: "email",
      type: "text",
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: "Please input your email!"
        }
      ]
    },
    
  ];

  const onSubmit = (data) => {
    navigate(location.state?.from || "/");
    alert("We have sent the update password link to your email, please check that!");
    console.log("place holder for sending a email to" + data);
    //dispatch(signUpUser(data)).then(() => navigate("/login"));
  };
  return (
    
    <div>
      <ForgotForm
        buttonText="Update password"
        onSubmit={onSubmit}
        title="Update your password"
        subTitle="Enter your email link, we will send you the recovery link"
        fields={fields}
      />
    </div>
  );
}
