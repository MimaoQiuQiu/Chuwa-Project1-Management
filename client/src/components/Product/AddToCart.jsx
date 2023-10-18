import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, message, InputNumber } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './addToCart.css'
import {
  addProductToCartAction,
  getAllProductsInCartAction,
  editProductQuantityInCartAction,
} from '../../app/userSlice'

export default function AddToCartButton({ product, user }) {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const { cart } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const productIndex = cart.findIndex(
      (productInCart) => productInCart.id === product._id
    )
    if (productIndex !== -1) {
      setAmount(cart[productIndex].quantity)
    } else {
      setAmount(0)
    }
  }, [])

  useEffect(() => {
    const productIndex = cart.findIndex(
      (productInCart) => productInCart.id === product._id
    )
    if (productIndex !== -1) {
      setAmount(cart[productIndex].quantity)
    } else {
      setAmount(0)
    }
  }, [cart])

  const addProductToCart = () => {
    if (!product.stockNum) message.error('Out of Stock')
    else {
      dispatch(
        addProductToCartAction({
          id: user.id,
          product: { productId: product._id, quantity: 1 },
        })
      )
        .then(() => {
          message.success(`${product.name} has been added to cart!`)
          dispatch(getAllProductsInCartAction(user))
          setAmount(amount + 1)
        })
        .catch((error) => {
          // Handle any potential errors
          message.error(`Error in adding product to cart: ${error}`)
        })
    }
  }

  const handleQuantityChange = (value) => {
    setAmount(value)
    dispatch(
      editProductQuantityInCartAction({
        userId: user.id,
        productId: product._id,
        curQuantity: value,
      })
    ).then(() => {
      dispatch(getAllProductsInCartAction(user))
    })
  }

  const handleDecrement = () => {
    handleQuantityChange(amount - 1)
  }
  const handleIncrement = () => {
    handleQuantityChange(amount + 1)
  }

  return amount > 0 ? (
    <Button.Group>
      <Button icon={<MinusOutlined />} onClick={handleDecrement} />
      <InputNumber className="centered-input" value={amount} readOnly />
      <Button
        icon={<PlusOutlined />}
        onClick={handleIncrement}
        disabled={amount >= product.stockNum}
      />
    </Button.Group>
  ) : (
    <Button
      // style={{ width: "110px", height: "26px" }}
      className="addToCart"
      type="primary"
      onClick={() => {
        addProductToCart()
      }}
      loading={loading}
    >
      Add to Cart
    </Button>
  )
}
