import "./styles.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Form, Col, Row, Input, message } from "antd";

import ProductCard from "./ProductCard";
import { checkoutAction } from "../../app/userSlice";
import { getAllProductsAction } from "../../app/productSlice";

const { Title, Paragraph } = Typography;

export default function Cart() {
  const dispatch = useDispatch();
  const { user, cart, totalPrice } = useSelector((state) => state.user);
  const { message: error } = useSelector((state) => state.error);

  // local state
  const [subTotal, setSubTotal] = useState(totalPrice);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(subTotal * 0.05);

  useEffect(() => {
    setSubTotal(totalPrice);
  }, [totalPrice]);

  useEffect(() => {
    setTax(subTotal * 0.05);
  }, [subTotal]);

  // update discount number
  const handleDiscountClick = (data) => {
    const { discount } = data;
    setDiscount(+discount);
  };

  const checkout = () => {
    dispatch(
      checkoutAction({
        id: user.id,
        charge: (subTotal + tax - discount).toFixed(2),
      })
    ).then(() => {
      if (error) message.error(error);
      else {
        dispatch(getAllProductsAction(user));
        message.success("Thank you for your shopping!");
      }
    });
  };

  if (!cart.length) {
    return (
      <div>
        <Paragraph className="EmptyDrawerHint">
          Your cart is empty. Go shopping!
        </Paragraph>
      </div>
    );
  }

  return (
    <>
      <div className="products">
        {cart.map((product) => (
          <ProductCard
            className="product"
            key={product.id}
            user={user}
            product={product}
          />
        ))}
      </div>
      <div className="coupon">
        <Form onFinish={handleDiscountClick} layout="vertical">
          <Row gutter={8} style={{ alignItems: "center" }}>
            <Col span={20}>
              <Form.Item name="discount" label="Apply Discount Code">
                <Input placeholder={`${discount} DOLLAR OFF`} size="large" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button className="btn" htmlType="submit" size="large">
                Apply
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="checkout">
        <span>
          <Title level={4}>Subtotal:</Title>
          <Title level={4} style={{ textAlign: "right" }}>
            {`$${subTotal.toFixed(2)}`}
          </Title>
        </span>

        <span>
          <Title level={4}>Tax:</Title>
          <Title level={4} style={{ textAlign: "right" }}>
            {`$${tax.toFixed(2)}`}
          </Title>
        </span>
        <span>
          <Title level={4}>Discount:</Title>
          <Title level={4} style={{ textAlign: "right" }}>
            {`-$${discount.toFixed(2)}`}
          </Title>
        </span>
        <span>
          <Title level={4}>Estimated Total:</Title>
          <Title level={4} style={{ textAlign: "right" }}>
            {`$${(subTotal + tax - discount).toFixed(2)}`}
          </Title>
        </span>

        <Button type="primary" className="btn" size="large" onClick={checkout}>
          Continue to check out
        </Button>
      </div>
    </>
  );
}
