import "./styles.css";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Typography, Button, Popover, Space, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import Cart from "../Cart";
import CartTitle from "../Cart/CartTitle";
import { getAllProductsInCartAction, logOut } from "../../app/userSlice";

const { Search } = Input;
const { Title, Text } = Typography;
let title = "Management";
let companyName = "Chuwa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname: location } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery(
    "(min-width: 426px) and (max-width: 875px)"
  );

  const { isAuthenticated, user, cart, totalPrice } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) dispatch(getAllProductsInCartAction(user));
  }, [isAuthenticated]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Btns handlers
  const handleSearch = (value) => console.log(value);

  const handleSignBtnClick = (e) => {
    if (e.target.innerText === "Sign Out") dispatch(logOut());
    navigate("/signin");
  };

  const handleCartIconClick = () => {
    if (isAuthenticated) {
      setOpen(true);
      dispatch(getAllProductsInCartAction(user));
    } else {
      message.error("Please sign in first!");
    }
  };

  const closePopover = () => {
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="title">
        <Title
          level={3}
          style={{
            margin: 0,
            color: "#FFF",
            marginRight: "0.3rem",
          }}
        >
          {/* {title} */}
          {isSmallScreen ? "M" : title}
        </Title>
        <Text style={{ margin: 0, color: "#FFF", fontSize: "10px" }}>
          {companyName}
        </Text>
      </div>
      <Search
        className="searchBox"
        allowClear
        placeholder="Search"
        onSearch={handleSearch}
      />
      <div className="right-menu">
        <div className="menu">
          <Button onClick={handleSignBtnClick}>
            <Space
              style={{ color: "#FFF", fontFamily: "Inter", fontSize: "15px" }}
            >
              <UserOutlined style={{ fontSize: "20px" }} />
              {isAuthenticated ? `Sign Out` : `Sign In`}
            </Space>
          </Button>
        </div>
        <div className="menu">
          <Popover
            title={
              <CartTitle len={cart.length} handleCartClose={closePopover} />
            }
            placement="bottom"
            content={<Cart />}
            trigger="click"
            open={open}
            arrow={false}
          >
            <Button onClick={handleCartIconClick}>
              <Space
                style={{ color: "#FFF", fontFamily: "Inter", fontSize: "15px" }}
              >
                <ShoppingCartOutlined style={{ fontSize: "23px" }} />
                {`$ ${totalPrice.toFixed(2)}`}
              </Space>
            </Button>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
