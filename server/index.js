require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const db = require('./models')
const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const { isLogin, isUser } = require('./middleware/auth')

app.use(express.json())
app.use(cors())

// api for signup, signin, password reset
app.use('/api/auth', authRoutes)
// app.use('/api/users/:id', isLogin, isUser, userRoutes)
app.use('/api/users/:id', userRoutes)

// api for getting products
app.get('/api/products', isLogin, isUser, async function (req, res, next) {
  try {
    const products = await db.Product.find()
      .sort({ createDate: 'desc' })
      .populate('createBy', {
        username: true,
        imgUrl: true,
      })
    return res.status(200).json(products)
  } catch (err) {
    return next(err)
  }
})

// api for getting a product
app.get('/api/products/:productId', isLogin, async function (req, res, next) {
  try {
    const product = await db.Product.findById(req.params?.productId)
    return res.status(200).json(product)
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    })
  }
})

// invalid url
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
