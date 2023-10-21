// import styles from "./style.module.css";

// import {
//   Button,
//   Card,
//   Image,
//   message,
//   Typography,
//   Select,
//   Pagination,
//   Row,
//   Col,
// } from "antd";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useMediaQuery } from "../../hooks/useMediaQuery";

// import {
//   getAllProductsAction,
//   getAProductAction,
// } from "../../app/productSlice";
// import { getAllProductsInCartAction } from "../../app/userSlice";
// import AddToCartButton from "../../components/Product/AddToCart";

// function Products() {
//   const isMobile = useMediaQuery("(max-width: 425px)");
//   const isTablet = useMediaQuery("(max-width: 768px) and (min-width: 426px)");

//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.products);
//   //console.log("products", products);
//   const { user } = useSelector((state) => state.user);
//   const [sortOrder, setSortOrder] = useState("lowHigh");
//   const navigate = useNavigate();
//   const location = useLocation();

//   //handle pagination
//   const [currentPage, setCurrentPage] = useState(1);

//   let itemsPerPage = 8;
//   let rowItemNumber = 4;

//   if (isMobile) {
//     itemsPerPage = 3;
//     rowItemNumber = 1;
//   } else if (isTablet) {
//     itemsPerPage = 9;
//     rowItemNumber = 3;
//   }

//   // fetching the data from the server
//   useEffect(() => {
//     dispatch(getAllProductsAction(user));
//     dispatch(getAllProductsInCartAction(user));
//   }, []);

//   const getSortedItems = () => {
//     const sortedItems = [...products];
//     sortedItems.sort((a, b) => {
//       if (sortOrder === "lowHigh") {
//         return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
//       } else if (sortOrder === "highLow") {
//         return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
//       } else if (sortOrder === "lastAdded") {
//         return b.createdAt - a.createdAt;
//       }
//     });
//     return sortedItems;
//   };

//   // layout for products of current page
//   const renderItemsForCurrentPage = ({ itemsPerPage, rowItemNumber }) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const sortedItems = getSortedItems();

//     // Check if startIndex is within the range of the sortedItems array
//     if (startIndex < sortedItems.length) {
//       // Slice the sortedItems array to get the items for the current page
//       let itemsForCurrentPage = 8;
//       if (endIndex < sortedItems.length) {
//         // more product for next page
//         itemsForCurrentPage = sortedItems.slice(startIndex, endIndex);
//       } else {
//         itemsForCurrentPage = sortedItems.slice(startIndex, sortedItems.length);
//       }

//       const rows = [];
//       let index = startIndex + 1;
//       for (let i = 0; i < itemsForCurrentPage.length; i += rowItemNumber) {
//         const rowItems = itemsForCurrentPage
//           .slice(i, i + rowItemNumber)
//           .map((product) => ({
//             ...product,
//             index: index++,
//           }));

//         rows.push(rowItems);
//       }

//       return (
//         <div>
//           {rows.map((row, rowIndex) => (
//             <Row gutter={8} key={rowIndex}>
//               {row.map((product, productIndex) => (
//                 <Col
//                   className={styles.col}
//                   key={productIndex}
//                   xs={24}
//                   sm={12}
//                   md={8}
//                   lg={6}
//                 >
//                   <Card
//                     className={styles.itemCard}
//                     cover={
//                       <div className={styles.image}>
//                         <img
//                           className={styles.product_image}
//                           src={product.imgUrl}
//                           alt={product.name}
//                           onClick={imageHandleClick(product)} // Corrected onClick syntax
//                         />
//                       </div>
//                     }
//                     actions={[
//                       <div className={styles.buttons_container}>
//                         <AddToCartButton product={product} user={user} />
//                         {user.category === "VENDOR" && (
//                           <Button
//                             className={styles.button}
//                             type="primary"
//                             onClick={editButtonClick(product)}
//                           >
//                             Edit
//                           </Button>
//                         )}
//                       </div>,
//                     ]}
//                   >
//                     <Card.Meta
//                       title={
//                         <Typography.Text className={styles.product_name}>
//                           {product.name}
//                         </Typography.Text>
//                       }
//                       description={
//                         <>
//                           <Typography.Text className={styles.product_price}>
//                             ${product.price.toFixed(2)}
//                           </Typography.Text>
//                         </>
//                       }
//                     />
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   // navigate to next page
//   // update the current page, and fetch the data for the new current page
//   const handlePaginationChange = (page) => {
//     setCurrentPage(page);
//     dispatch(getAllProductsInCartAction(user));
//   };

//   // navigate to product detail
//   const imageHandleClick = (product) => (e) => {
//     navigate(`/products/${product._id}`);
//   };

//   // navigate to Edit-Product page
//   const editButtonClick = (product) => (e) => {
//     if (user.category === "VENDOR" && product.createBy === user.id) {
//       dispatch(getAProductAction(product._id)).then(() => {
//         navigate(`/user/${user.id}/edit-product/${product._id}`, {
//           state: { from: location.pathname },
//         });
//       });
//     } else {
//       message.error(`Unauthorized`);
//     }
//   };

//   // Add product to user's cart
//   const addProductButtonClick = (e) => {
//     if (user.category === "VENDOR") {
//       navigate(`/new-product`);
//     } else {
//       message.error(`Unauthorized`);
//     }
//   };

//   return (
//     <div className={styles.productsContainer}>
//       <div className={styles.topContent}>
//         <div>
//           <Typography.Title>Products</Typography.Title>
//         </div>
//         <Row gutter={[16, 16]}>
//           <div>
//             <Select
//               onChange={(value) => {
//                 setSortOrder(value);
//               }}
//               defaultValue={"Price Low to High"}
//               options={[
//                 {
//                   label: "Price Low to High",
//                   value: "lowHigh",
//                 },
//                 {
//                   label: "Price High to Low",
//                   value: "highLow",
//                 },
//                 {
//                   label: "Last added",
//                   value: "lastAdded",
//                 },
//               ]}
//             ></Select>
//           </div>
//           <></>
//           <div>
//             {user.category === "VENDOR" && (
//               <Button type="primary" onClick={addProductButtonClick}>
//                 Add Product
//               </Button>
//             )}
//           </div>
//         </Row>
//       </div>
//       {renderItemsForCurrentPage({ itemsPerPage, rowItemNumber })}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-end",
//         }}
//       >
//         <Pagination
//           current={currentPage}
//           total={products.length}
//           pageSize={itemsPerPage} // Number of items to display per page
//           onChange={handlePaginationChange}
//           showTotal={(total, range) =>
//             `${range[0]}-${range[1]} of ${total} products`
//           }
//         />
//       </div>
//     </div>
//   );
// }

// export default Products;

import styles from "./style.module.css";

import {
  Button,
  Card,
  Image,
  message,
  Typography,
  Select,
  Pagination,
  Row,
  Col,
  Layout,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import {
  getAllProductsAction,
  getAProductAction,
} from "../../app/productSlice";
import { getAllProductsInCartAction } from "../../app/userSlice";
import AddToCartButton from "../../components/Product/AddToCart";

function Products() {
  const isMobile = useMediaQuery("(max-width: 425px)");
  const isTablet = useMediaQuery("(max-width: 768px) and (min-width: 426px)");
  const isBigTablet = useMediaQuery(
    "(max-width: 991px) and (min-width: 769px)"
  );

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  //console.log("products", products);
  const { user } = useSelector((state) => state.user);
  const [sortOrder, setSortOrder] = useState("lowHigh");
  const navigate = useNavigate();
  const location = useLocation();

  //handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  // total number of items to display on each page.
  let itemsPerPage = 10;
  // number of items in each row of the grid.
  let rowItemNumber = 5;

  if (isMobile) {
    itemsPerPage = 3;
    rowItemNumber = 1;
  } else if (isTablet) {
    itemsPerPage = 8;
    rowItemNumber = 4;
  } else if (isBigTablet) {
    itemsPerPage = 8;
    rowItemNumber = 4;
  }

  // fetching the data from the server
  useEffect(() => {
    dispatch(getAllProductsAction(user));
    dispatch(getAllProductsInCartAction(user));
  }, []);

  const getSortedItems = () => {
    const sortedItems = [...products];
    sortedItems.sort((a, b) => {
      if (sortOrder === "lowHigh") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "highLow") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "lastAdded") {
        return b.createdAt - a.createdAt;
      }
    });
    return sortedItems;
  };

  // layout for products of current page
  const renderItemsForCurrentPage = ({ itemsPerPage, rowItemNumber }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const sortedItems = getSortedItems();

    // Check if startIndex is within the range of the sortedItems array
    if (startIndex < sortedItems.length) {
      // Slice the sortedItems array to get the items for the current page

      // itemsForCurrentPage is an array of products, 8 is just a placeholder
      let itemsForCurrentPage = 8;

      // checks whether the endIndex (which represents the last item's index that we want to display on the current page) is less than the total number of sortedItems
      if (endIndex < sortedItems.length) {
        // not all items from the sortedItems array are being shown on the current page
        // more product for next page

        //extract a sub-array from sortedItems. This sub-array starts at startIndex and goes up to, but does not include, endIndex.
        //sliced array represents the items that will be displayed on the current page, and it gets assigned to itemsForCurrentPage.
        itemsForCurrentPage = sortedItems.slice(startIndex, endIndex);
      } else {
        //endIndex is not less than the total length of sortedItems
        // we're dealing with items for the last page.

        //extracts all remaining items from startIndex till the end of the sortedItems array. This is because, for the last page, the end index could be less than a full page's worth of items.
        itemsForCurrentPage = sortedItems.slice(startIndex, sortedItems.length);
      }

      // array to store the grouped items for each row
      const rows = [];

      // add a sequential number to each product, 1-based
      let index = startIndex + 1;

      // loop through the itemsForCurrentPage array, and group them into rows
      for (let i = 0; i < itemsForCurrentPage.length; i += rowItemNumber) {
        // slices a sub-array of items starting at the current loop index i and ending just before i + rowItemNumber. This sub-array represents the items for the current row.
        // iterate over each product in the current row. For each product, a new object is returned which contains all the properties of the original product (indicated by the ...product spread syntax) plus an additional index property.
        const rowItems = itemsForCurrentPage
          .slice(i, i + rowItemNumber)
          .map((product) => ({
            ...product,
            index: index++,
          }));

        rows.push(rowItems);
      }

      return (
        <Layout style={{ backgroundColor: "white" }}>
          {rows.map((row, rowIndex) => (
            <Row
              gutter={[12, 10]}
              style={{ maxWidth: "1600px", marginLeft: "0" }}
            >
              {row.map((product, productIndex) => (
                <Col
                  className={styles.col}
                  key={productIndex}
                  xs={24}
                  sm={12}
                  md={6}
                  lg={5}
                >
                  <Card
                    className={styles.itemCard}
                    cover={
                      <div className={styles.image}>
                        <img
                          className={styles.product_image}
                          src={product.imgUrl}
                          alt={product.name}
                          onClick={imageHandleClick(product)} // Corrected onClick syntax
                        />
                      </div>
                    }
                    actions={[
                      <div className={styles.buttons_container}>
                        <AddToCartButton product={product} user={user} />
                        {user.category === "VENDOR" && (
                          <Button
                            className={styles.button}
                            type="primary"
                            onClick={editButtonClick(product)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Typography.Text className={styles.product_name}>
                          {product.name}
                        </Typography.Text>
                      }
                      description={
                        <>
                          <Typography.Text className={styles.product_price}>
                            ${product.price.toFixed(2)}
                          </Typography.Text>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ))}
        </Layout>
      );
    }
    return null;
  };

  // navigate to next page
  // update the current page, and fetch the data for the new current page
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    dispatch(getAllProductsInCartAction(user));
  };

  // navigate to product detail
  const imageHandleClick = (product) => (e) => {
    navigate(`/products/${product._id}`);
  };

  // navigate to Edit-Product page
  const editButtonClick = (product) => (e) => {
    if (user.category === "VENDOR" && product.createBy === user.id) {
      dispatch(getAProductAction(product._id)).then(() => {
        navigate(`/user/${user.id}/edit-product/${product._id}`, {
          state: { from: location.pathname },
        });
      });
    } else {
      message.error(`Unauthorized`);
    }
  };

  // Add new product
  const addProductButtonClick = (e) => {
    if (user.category === "VENDOR") {
      navigate(`/new-product`);
    } else {
      message.error(`Unauthorized`);
    }
  };

  return (
    <div style={{ minWidth: "100%", minHeight: "100%", paddingTop: "12px" }}>
      <div className={styles.topContent}>
        <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: "28px" }}>
          {/* <Typography.Title>Products</Typography.Title> */}
          Products
        </div>
        <Row gutter={[6, 6]}>
          <div>
            <Select
              onChange={(value) => {
                setSortOrder(value);
              }}
              defaultValue={"Price Low to High"}
              options={[
                {
                  label: "Price Low to High",
                  value: "lowHigh",
                },
                {
                  label: "Price High to Low",
                  value: "highLow",
                },
                {
                  label: "Last added",
                  value: "lastAdded",
                },
              ]}
            ></Select>
          </div>
          <></>
          <div>
            {user.category === "VENDOR" && (
              <Button type="primary" onClick={addProductButtonClick}>
                Add Product
              </Button>
            )}
          </div>
        </Row>
      </div>
      {renderItemsForCurrentPage({ itemsPerPage, rowItemNumber })}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Pagination
          current={currentPage}
          total={products.length}
          pageSize={itemsPerPage} // Number of items to display per page
          onChange={handlePaginationChange}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} products`
          }
        />
      </div>
    </div>
  );
}

export default Products;
