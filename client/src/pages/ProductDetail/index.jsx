// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { Col, Row, Image, Typography, Button, message, Tag } from "antd";
// import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import { useMediaQuery } from "../../hooks/useMediaQuery";

// import { getAProductAction } from "../../app/productSlice";

// import AddToCartButton from "../../components/Product/AddToCart";
// import styles from "./style.module.css";

// function ProductDetail() {
//   const isMobile = useMediaQuery("(max-width: 425px)");

//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { oneProduct, products } = useSelector((state) => state.products);
//   const { user } = useSelector((state) => state.user);
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getAProductAction(productId));
//   }, [products]);

//   // navigate to Edit-Product page
//   const editButtonClick = (product) => (e) => {
//     if (user.category === "VENDOR" && product.createBy === user.id) {
//       dispatch(getAProductAction(product._id)).then(() => {
//         // navigate(`/user/${user.id}/edit-product/${product._id}`);
//         navigate(`/user/${user.id}/edit-product/${product._id}`, {
//           state: { from: location.pathname },
//         });
//       });
//     } else {
//       message.error(`Unauthorized`);
//     }
//   };

//   const handleCloseIconClick = () => {
//     navigate("/");
//   };

//   if (!oneProduct)
//     return (
//       <>
//         <p>Loading...</p>
//       </>
//     );

//   return (
//     <>
//       {!isMobile ? (
//         <div className={styles.product_detail}>
//           <div className={styles.title_box}>
//             <Typography.Title level={2} className={styles.title}>
//               Products Detail
//             </Typography.Title>
//             <CloseCircleOutlined
//               style={{ fontSize: "30px" }}
//               onClick={handleCloseIconClick}
//             />
//           </div>

//           <Row className={styles.container} gutter={6} justify="center">
//             <Col span={12} className={styles.col_left}>
//               <Image
//                 className={styles.itemCardBadge}
//                 width={"550px"}
//                 height={"550px"}
//                 src={oneProduct.imgUrl}
//                 alt={oneProduct.name}
//               />
//             </Col>
//             <Col span={12} className={styles.col_right}>
//               <Typography.Text className={styles.product_category}>
//                 {oneProduct.category}
//               </Typography.Text>
//               <Typography.Title level={2} className={styles.product_name}>
//                 {oneProduct.name}
//               </Typography.Title>
//               <div className={styles.product_price_tag}>
//                 <Typography.Title level={3} className={styles.product_price}>
//                   {`$${oneProduct.price}`}
//                 </Typography.Title>
//                 {oneProduct.stockNum === 0 ? (
//                   <Tag icon={<CloseCircleOutlined />} color="error">
//                     Out of Stock
//                   </Tag>
//                 ) : (
//                   <Tag icon={<CheckCircleOutlined />} color="success">
//                     Adequate inventory
//                   </Tag>
//                 )}
//               </div>
//               <Typography.Paragraph className={styles.product_description}>
//                 {oneProduct.description}
//               </Typography.Paragraph>
//               <div className={styles.buttons}>
//                 <AddToCartButton product={oneProduct} user={user} />
//                 {user.category === "VENDOR" && (
//                   <Button
//                     className={styles.edit_btn}
//                     type="primary"
//                     onClick={editButtonClick(oneProduct)}
//                   >
//                     Edit
//                   </Button>
//                 )}
//               </div>
//             </Col>
//           </Row>
//         </div>
//       ) : (
//         <div className={styles.product_detail}>
//           <div className={styles.title_box}>
//             <Typography.Title level={2} className={styles.title}>
//               Products Detail
//             </Typography.Title>
//             <CloseCircleOutlined
//               style={{ fontSize: "30px" }}
//               onClick={handleCloseIconClick}
//             />
//           </div>

//           <div className={styles.mobile_container}>
//             <Image
//               className={styles.itemCardBadge}
//               width={"308px"}
//               height={"276px"}
//               src={oneProduct.imgUrl}
//               alt={oneProduct.name}
//             />
//             <div className={styles.mobile_texts}>
//               <Typography.Text className={styles.product_category}>
//                 {oneProduct.category}
//               </Typography.Text>
//               <Typography.Title level={2} className={styles.product_name}>
//                 {oneProduct.name}
//               </Typography.Title>
//               <div className={styles.product_price_tag}>
//                 <Typography.Title level={3} className={styles.product_price}>
//                   {`$${oneProduct.price}`}
//                 </Typography.Title>
//                 {oneProduct.stockNum === 0 ? (
//                   <Tag icon={<CloseCircleOutlined />} color="error">
//                     Out of Stock
//                   </Tag>
//                 ) : (
//                   <Tag icon={<CheckCircleOutlined />} color="success">
//                     Adequate inventory
//                   </Tag>
//                 )}
//               </div>
//               <Typography.Paragraph className={styles.product_description}>
//                 {oneProduct.description}
//               </Typography.Paragraph>
//               <div className={styles.buttons}>
//                 <AddToCartButton product={oneProduct} user={user} />
//                 {user.category === "VENDOR" && (
//                   <Button
//                     className={styles.edit_btn}
//                     type="primary"
//                     onClick={editButtonClick(oneProduct)}
//                   >
//                     Edit
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ProductDetail;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Layout,
  Col,
  Row,
  Image,
  Typography,
  Button,
  message,
  Tag,
} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import { useMediaQuery } from '../../hooks/useMediaQuery'

import { getAProductAction } from "../../app/productSlice";

import AddToCartButton from "../../components/Product/AddToCart";
// import styles from './style.module.css'
import styles from "./product.css";
const { Header, Footer, Sider, Content, Descriptions } = Layout;

const headerStyle = {
  textAlign: "left",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  // color: '#fff',
  backgroundColor: "#fff",
  padding: "12px",
};

const pFirstStyle = {
  textAlign: "left",
  lineHeight: "normal",
  fontSize: "16",
  color: "#6B7280",
  // backgroundColor: '#3ba0e9',
};
const pNameStyle = {
  textAlign: "left",
  lineHeight: "normal",
  fontSize: "32",
  color: "#535353",
  // backgroundColor: '#3ba0e9',
};
const pPriceStyle = {
  textAlign: "left",
  lineHeight: "normal",
  // color: '#fff',
  // backgroundColor: '#3ba0e9',
};
const pDesStyle = {
  textAlign: "left",
  fontSize: "16",
  lineHeight: "normal",
  color: "#6B7280",
  // backgroundColor: '#3ba0e9',
};

function ProductDetail() {
  // const isMobile = useMediaQuery('(max-width: 425px)')

  const dispatch = useDispatch();
  const location = useLocation();
  const { oneProduct, products } = useSelector((state) => state.products);
  // const { product, products } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.user);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAProductAction(productId));
  }, [products]);

  // navigate to Edit-Product page
  const editButtonClick = (product) => (e) => {
    if (user.category === "VENDOR" && product.createBy === user.id) {
      dispatch(getAProductAction(product._id)).then(() => {
        // navigate(`/user/${user.id}/edit-product/${product._id}`);
        navigate(`/user/${user.id}/edit-product/${product._id}`, {
          state: { from: location.pathname },
        });
      });
    } else {
      message.error(`Unauthorized`);
    }
  };

  const handleCloseIconClick = () => {
    navigate("/");
  };

  if (!oneProduct)
    return (
      <>
        <p>Loading...</p>
      </>
    );

  return (
    <div style={{ minWidth: "100%", minHeight: "100%", paddingTop: "12px" }}>
      <Layout>
        <Header style={headerStyle}>
          <h1>Products Detail</h1>
        </Header>
        <Content style={contentStyle}>
          <Row style={{ flexWrap: "wrap" }}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <div>
                {oneProduct.imgUrl ? (
                  <img
                    // src={imageUrl}
                    src={oneProduct.imgUrl}
                    alt={oneProduct.name}
                    // style={{ width: '662px', height: '597px' }}
                    style={{
                      maxWidth: "40rem",
                      width: "100%",
                      maxHeight: "45rem",
                      height: "100%",
                      //padding: "12px 25px",
                      padding: "1rem 1rem",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <p style={pFirstStyle}>{oneProduct.category}</p>
                <h1 style={pNameStyle}>{oneProduct.name}</h1>
                <h1 style={pPriceStyle}>
                  ${oneProduct.price}
                  {oneProduct.stockNum === 0 ? (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Out of Stock
                    </Tag>
                  ) : (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Adequate inventory
                    </Tag>
                  )}
                </h1>
                <p style={pDesStyle}>{oneProduct.description}</p>
              </div>
              <div
                style={{ display: "flex", justifyContent: "left", gap: "1rem" }}
              >
                <AddToCartButton
                  product={oneProduct}
                  user={user}
                  style={{ marginRight: "10px" }}
                />
                {user.category === "VENDOR" && (
                  <Button
                    // className={styles.edit_btn}
                    className="edit"
                    type="primary"
                    onClick={editButtonClick(oneProduct)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default ProductDetail;
