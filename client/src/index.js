import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App';
// import productCard from './productListing'
// import ProductDetail from './productDetail'
import ProductListing from './productListing'
import reportWebVitals from './reportWebVitals'

// Use ReactDOM.render instead of createRoot
ReactDOM.render(
  <React.StrictMode>
    <ProductListing />
  </React.StrictMode>,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
