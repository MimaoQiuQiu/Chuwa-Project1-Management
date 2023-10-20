// // signin and signup form

// import "./styles.css";
// import style from "./style.module.css";
// import React from "react";
// import { useSelector } from "react-redux";
// import { Button, Form, Input, Typography } from "antd";

// export default function AuthForm({
//   buttonText,
//   onSubmit,
//   title,
//   fields,
//   errors,
//   buttomText,
// }) {
//   const { status } = useSelector((state) => state.user);

//   return (
//     <div className={style.FormBox}>
//       <Typography.Title level={2} className={style.title}>
//         {title}
//       </Typography.Title>
//       {errors ? (
//         <Typography className={style.error}>{errors}</Typography>
//       ) : null}
//       <Form onFinish={onSubmit} autoComplete="off" layout="vertical">
//         {fields.map((field) => (
//           <Form.Item
//             key={field.name}
//             name={field.name}
//             label={field.name}
//             rules={field.rules}
//             labelCol={{ span: 24 }}
//             wrapperCol={{ span: 24 }}
//           >
//             {field.type !== "password" ? (
//               <Input size="large" />
//             ) : (
//               <Input.Password size="large" />
//             )}
//           </Form.Item>
//         ))}
//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className={style.btn}
//             size="large"
//             loading={status === "loading"}
//           >
//             {buttonText}
//           </Button>
//         </Form.Item>
//       </Form>
//       <div className={style.buttomText}>{buttomText}</div>
//     </div>
//   );
// }

import React from "react";
import { Radio, Button, Form, Input, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export default function AuthForm({
  buttonText,
  onSubmit,
  title,
  fields,
  errors,
}) {
  const { status } = useSelector((state) => state.user);

  return (
    <div className={styles.box}>
      <Typography className={styles.title}>{title}</Typography>

      <Form onFinish={onSubmit} autoComplete="off">
        {fields.map((field) => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.type === "password" ? (
              <Input.Password
                placeholder={field.placeholder}
                prefix={<LockOutlined />}
                size="large"
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                prefix={field.prefix}
                size="large"
              />
            )}
          </Form.Item>
        ))}
        {title !== "Sign up an account" ? null : (
          <Form.Item
            name="Category"
            rules={[
              {
                required: true,
                message: "Must have a Category!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={"VENDOR"}>Vendor</Radio>
              <Radio value={"USER"}>User</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        {errors ? (
          <Typography className={styles.error}>{errors}</Typography>
        ) : null}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.btn}
            size="large"
            loading={status === "loading"}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
      {title === "Sign in to your account" ? (
        <p>
          Don't have an account? <Link to="/Signup">sign up</Link>
          <span style={{ float: "right" }}>
            <Link to="/updatePassword">Forgot password?</Link>
          </span>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link to="/forgot">...</Link>
          </span>
        </p>
      ) : (
        <p>
          Already have and account? <Link to="/">sign in</Link>
        </p>
      )}
    </div>
  );
}
