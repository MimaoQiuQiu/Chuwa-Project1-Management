import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'antd'


const { Meta } = Card
const productId = '6529065cb7395929b61e4a2f'

const ProductDetail = () => {
  const [product, setProduct] = useState({})

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

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt={product.name} src={product.imgUrl} />}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  )
}

export default ProductDetail
