import React, { useState, useEffect } from 'react'
import { Select, Layout, Button, Card, Col, Row } from 'antd' // Import Button from Ant Design
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './productCard'

import { getAllProductsAction, getAProductAction } from '../api/productSlice'
// import ProductDetail from './ProductDetail'
const { Header, Content } = Layout
const { Option } = Select

const headerStyle = {
  textAlign: 'left',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between', // Align items horizontally with space-between
  alignItems: 'center',
}

const selectStyle = {
  width: 160,
  marginRight: 16,
  verticalAlign: 'middle',
}

const atcStyle = {
  backgroundColor: '#5048e5',
  color: 'white',
  border: 'none',
  width: '100px',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  textAlign: 'center',
  lineHeight: 'normal',
}

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [sortOption, setSortOption] = useState('lastAdded')
  const navigate = useNavigate

  // navigate to product detail
  const imageHandleClick = (product) => (e) => {
    navigate(`/products/${product._id}`)
  }

  //   const dispatch = useDispatch()
  //   const { Products } = useSelector((state) => state.products)
  //   console.log('products', Products)
  //   const { user } = useSelector((state) => state.user)

  //   useEffect(() => {
  //     dispatch(getAllProductsAction(user))
  //     // dispatch(getAllProductsInCartAction(user))
  //   }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3050/api/users/1/products'
        )
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const sortProducts = () => {
    const sortedProducts = [...products]

    switch (sortOption) {
      case 'lastAdded':
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        break
      case 'lowToHigh':
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case 'highToLow':
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setProducts(sortedProducts)
  }

  useEffect(() => {
    sortProducts()
  }, [sortOption])

  return (
    <div>
      <Layout>
        <Header style={headerStyle}>
          <h1>Products Detail</h1>
          <div>
            <Select
              style={selectStyle}
              defaultValue="lastAdded"
              onChange={(value) => setSortOption(value)}
            >
              <Option value="lastAdded">Last added</Option>
              <Option value="lowToHigh">Price: low to high</Option>
              <Option value="highToLow">Price: high to low</Option>
            </Select>
            <Button style={atcStyle}>Add to Cart</Button>
          </div>
        </Header>

        <Content>
          <div>
            {/* <ProductCard products={products} onClick="./productDetail.jsx" /> */}
            <ul>
              {products.map((product, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card>
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      onClick={imageHandleClick(product)}
                      style={{ width: '100%', padding: '12px 25px' }}
                    ></img>

                    <div>{product.name}</div>
                    <div>${product.price}</div>
                    {sortOption === 'lastAdded'}
                  </Card>
                </Col>
              ))}
            </ul>
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default ProductList
