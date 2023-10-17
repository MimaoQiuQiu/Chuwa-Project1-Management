// ProductDetail.jsx

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './product.css' // Import styles from your existing CSS file
import stylesJS from './styles' // Import styles from your JavaScript object
import { Layout, Space, Col, Row, Flex, Image } from 'antd'

const { Header, Footer, Sider, Content, Descriptions } = Layout

const UNSPLASH_API_KEY = 'ZfM8MTMiKGZ0HcvMfs2yvNCXApAG75Q94yk8zlGnBZU'

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
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
}

const productId = '6529065cb7395929b61e4a2f'

const edit = () => {
  window.alert('edit')
}

const atc = () => {
  window.alert('Add to cart')
}

const ProductDetail = () => {
  const [product, setProduct] = useState({})
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3050/api/users/1/products/${productId}`
        )
        setProduct(response.data)
        console.log(response.data)
        console.log(response.data.category)
      } catch (error) {
        console.error('Error fetching product detail', error)
      }
    }

    fetchProduct()
  }, [productId])

  //fetch img from imgUrl
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random', // Corrected: Use a string for the URL
          {
            params: {
              query: 'vr glasses',
              orientation: 'landscape',
              client_id: UNSPLASH_API_KEY,
            },
          }
        )
        console.log('imgUrl', response.data.urls.regular)
        setImageUrl(response.data.urls.regular)
      } catch (error) {
        console.error('Error fetching image from Unsplash', error)
      }
    }

    fetchImage()
  }, [product.imgUrl])

  return (
    <div>
      <Layout>
        <Header style={headerStyle}>
          <h1>Products Detail</h1>
        </Header>
        <Content style={contentStyle}>
          <Row>
            <Col sm={24} lg={16}>
              <div className={stylesJS.productImg}>
                {imageUrl ? (
                  <img
                    // src={imageUrl}
                    src={product.imgUrl}
                    alt={product.name}
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
                <p style={pFirstStyle}>{product.category}</p>
                <h1 style={pNameStyle}>{product.name}</h1>
                <h1 style={pPriceStyle}>${product.price}</h1>
                <p style={pDesStyle}>{product.description}</p>
              </div>
              <div className={styles.buttons} style={{ textAlign: 'left' }}>
                <button className="addToCart" onClick={atc}>
                  Add to Cart
                </button>
                <button className="edit" onClick={edit}>
                  {' '}
                  edit{' '}
                </button>
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
