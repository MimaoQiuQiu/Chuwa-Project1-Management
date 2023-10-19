import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function ForgotForm({
  buttonText,
  onSubmit,
  title,
  subTitle,
  fields,
  errors
}) {
  const { status } = useSelector((state) => state.user);

  return (
    <div className={styles.box}>
      <Typography className={styles.title}>{title}</Typography>
      <Typography className={styles.subtitle}>{subTitle}</Typography>
      <Form onFinish={onSubmit} autoComplete="off">
        {fields.map((field) => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
           
              <Input
                placeholder={field.placeholder}
                prefix={field.prefix}
                size="large"
              />
           
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.btn}
            size="large"
            loading={status === "pending"}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
}
