import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from '../../components/AuthForm';
import { signInAction } from '../../app/userSlice';
import './style.css';
export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fields = [
    {
      placeholder: "Email",
      name: "Email",
      type: "text",
      prefix: <MailOutlined />
    },
    {
      placeholder: "Password",
      name: "Password",
      type: "password"
    }
  ];

  const onSubmit = (data) => {
    
    const { Email: email, Password: password } = data;
    console.log(data);
    dispatch(signInAction({ email, password })).then(() => {
      navigate(location.state?.from || "/");
    });
  };

  return (
    <div>
      <AuthForm
        buttonText="Sign in"
        onSubmit={onSubmit}
        title="Sign in to your account"
        fields={fields}
      />

    </div>
  );
}
