import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Layout, Col, Row, Image, Typography, Button, message, Tag } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
// import { useMediaQuery } from '../../hooks/useMediaQuery'

import { getAProductAction } from '../../app/productSlice'

import AddToCartButton from '../../components/Product/AddToCart'
// import styles from './style.module.css'
import styles from './product.css'
const { Header, Footer, Sider, Content, Descriptions } = Layout

const headerStyle = {
  textAlign: 'left',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white',
}
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  // color: '#fff',
  backgroundColor: '#fff',
  padding: '12px',
}

const pFirstStyle = {
  textAlign: 'left',
  lineHeight: 'normal',
  fontSize: '16',
  color: '#6B7280',
  // backgroundColor: '#3ba0e9',
}
const pNameStyle = {
  textAlign: 'left',
  lineHeight: 'normal',
  fontSize: '32',
  color: '#535353',
  // backgroundColor: '#3ba0e9',
}
const pPriceStyle = {
  textAlign: 'left',
  lineHeight: 'normal',
  // color: '#fff',
  // backgroundColor: '#3ba0e9',
}
const pDesStyle = {
  textAlign: 'left',
  fontSize: '16',
  lineHeight: 'normal',
  color: '#6B7280',
  // backgroundColor: '#3ba0e9',
}

function ProductDetail() {
  // const isMobile = useMediaQuery('(max-width: 425px)')

  const dispatch = useDispatch()
  const location = useLocation()
  const { oneProduct, products } = useSelector((state) => state.products)
  // const { product, products } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.user)
  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAProductAction(productId))
  }, [products])

  // navigate to Edit-Product page
  const editButtonClick = (product) => (e) => {
    if (user.category === 'VENDOR' && product.createBy === user.id) {
      dispatch(getAProductAction(product._id)).then(() => {
        // navigate(`/user/${user.id}/edit-product/${product._id}`);
        navigate(`/user/${user.id}/edit-product/${product._id}`, {
          state: { from: location.pathname },
        })
      })
    } else {
      message.error(`Unauthorized`)
    }
  }

  const handleCloseIconClick = () => {
    navigate('/')
  }

  if (!oneProduct)
    return (
      <>
        <p>Loading...</p>
      </>
    )

  // return (
  //   <>
  //     {!isMobile ? (
  //       <div className={styles.product_detail}>
  //         <div className={styles.title_box}>
  //           <Typography.Title level={2} className={styles.title}>
  //             Products Detail
  //           </Typography.Title>
  //           <CloseCircleOutlined
  //             style={{ fontSize: '30px' }}
  //             onClick={handleCloseIconClick}
  //           />
  //         </div>

  //         <Row className={styles.container} gutter={6} justify="center">
  //           <Col span={12} className={styles.col_left}>
  //             <Image
  //               className={styles.itemCardBadge}
  //               width={'550px'}
  //               height={'550px'}
  //               src={oneProduct.imgUrl}
  //               alt={oneProduct.name}
  //             />
  //           </Col>
  //           <Col span={12} className={styles.col_right}>
  //             <Typography.Text className={styles.product_category}>
  //               {oneProduct.category}
  //             </Typography.Text>
  //             <Typography.Title level={2} className={styles.product_name}>
  //               {oneProduct.name}
  //             </Typography.Title>
  //             <div className={styles.product_price_tag}>
  //               <Typography.Title level={3} className={styles.product_price}>
  //                 {`$${oneProduct.price}`}
  //               </Typography.Title>
  //               {oneProduct.stockNum === 0 ? (
  //                 <Tag icon={<CloseCircleOutlined />} color="error">
  //                   Out of Stock
  //                 </Tag>
  //               ) : (
  //                 <Tag icon={<CheckCircleOutlined />} color="success">
  //                   Adequate inventory
  //                 </Tag>
  //               )}
  //             </div>
  //             <Typography.Paragraph className={styles.product_description}>
  //               {oneProduct.description}
  //             </Typography.Paragraph>
  //             <div className={styles.buttons}>
  //               <AddToCartButton product={oneProduct} user={user} />
  //               {user.category === 'VENDOR' && (
  //                 <Button
  //                   className={styles.edit_btn}
  //                   type="primary"
  //                   onClick={editButtonClick(oneProduct)}
  //                 >
  //                   Edit
  //                 </Button>
  //               )}
  //             </div>
  //           </Col>
  //         </Row>
  //       </div>
  //     ) : (
  //       <div className={styles.product_detail}>
  //         <div className={styles.title_box}>
  //           <Typography.Title level={2} className={styles.title}>
  //             Products Detail
  //           </Typography.Title>
  //           <CloseCircleOutlined
  //             style={{ fontSize: '30px' }}
  //             onClick={handleCloseIconClick}
  //           />
  //         </div>

  //         <div className={styles.mobile_container}>
  //           <Image
  //             className={styles.itemCardBadge}
  //             width={'308px'}
  //             height={'276px'}
  //             src={oneProduct.imgUrl}
  //             alt={oneProduct.name}
  //           />
  //           <div className={styles.mobile_texts}>
  //             <Typography.Text className={styles.product_category}>
  //               {oneProduct.category}
  //             </Typography.Text>
  //             <Typography.Title level={2} className={styles.product_name}>
  //               {oneProduct.name}
  //             </Typography.Title>
  //             <div className={styles.product_price_tag}>
  //               <Typography.Title level={3} className={styles.product_price}>
  //                 {`$${oneProduct.price}`}
  //               </Typography.Title>
  //               {oneProduct.stockNum === 0 ? (
  //                 <Tag icon={<CloseCircleOutlined />} color="error">
  //                   Out of Stock
  //                 </Tag>
  //               ) : (
  //                 <Tag icon={<CheckCircleOutlined />} color="success">
  //                   Adequate inventory
  //                 </Tag>
  //               )}
  //             </div>
  //             <Typography.Paragraph className={styles.product_description}>
  //               {oneProduct.description}
  //             </Typography.Paragraph>
  // <div className={styles.buttons}>
  //   <AddToCartButton product={oneProduct} user={user} />
  //   {user.category === 'VENDOR' && (
  //     <Button
  //       className={styles.edit_btn}
  //       type="primary"
  //       onClick={editButtonClick(oneProduct)}
  //     >
  //       Edit
  //     </Button>
  //   )}
  // </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // )

  return (
    <div>
      <Layout>
        <Header style={headerStyle}>
          <h1>Products Detail</h1>
        </Header>
        <Content style={contentStyle}>
          <Row>
            <Col sm={24} lg={16}>
              <div>
                {oneProduct.imgUrl ? (
                  <img
                    // src={imageUrl}
                    src={oneProduct.imgUrl}
                    alt={oneProduct.name}
                    // style={{ width: '662px', height: '597px' }}
                    style={{ width: '100%', padding: '12px 25px' }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </Col>
            <Col sm={24} lg={8}>
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
              <div className={styles.buttons}>
                <AddToCartButton product={oneProduct} user={user} />
                {user.category === 'VENDOR' && (
                  <Button
                    // className={styles.edit_btn}
                    className="edit"
                    type="primary"
                    onClick={editButtonClick(oneProduct)}
                  >
                    Edit
                  </Button>
                )}

                {/* <button className="addToCart" onClick={atc}>
                  Add to Cart
                </button>
                <button className="edit" onClick={edit}>
                  {' '}
                  edit{' '}
                </button> */}
              </div>
            </Col>
          </Row>

          {/* <Flex justify="space-between" wrap="wrap">
            <div className={stylesJS.productImg} style={{}}>
              {imageUrl ? (
                <img
                  // src={imageUrl}
                  src={product.imgUrl}
                  alt={product.name}
                  style={{ width: '662px', height: '597px' }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <Flex
              vertical
              align="flex-start"
              justify="space-between"
              style={{ padding: 32 }}
            >
              <div>
                <p style={styles.productDesFirst}>{product.category}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.description}</p>
              </div>

              <div className={styles.buttons}>
                <button className="addToCart">add to cart</button>
                <button className="edit">edit</button>
              </div>
            </Flex>
          </Flex> */}
        </Content>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
      {/* <div className={stylesJS.container}>
        <div className={stylesJS.inner}>
          {product.imgUrl ? (
            <img src="https://picsum.photos/400/200" alt={product.name} />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div>
          <p>{product.category}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <div className={styles.buttons}>
            <button className="addToCart">add to cart</button>
            <button className="edit">edit</button>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ProductDetail
