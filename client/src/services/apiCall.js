// const BASE_URL = 'http://localhost:3050'

// export default async function makeApiCall({
//   url: apiUrl,
//   method,
//   data,
//   headers,
// }) {
//   // combine the base url with the api url if it is a relative path, or use the api url if it is an absolute path
//   // eg. api/auth/login, http://localhost:8080
//   // http://localhost:8080/api/auth/login
//   // .href: retrive the full URL object in string format
//   const url = new URL(apiUrl, BASE_URL).href

//   const defaultHeaders = {
//     'Content-Type': 'application/json',
//   }

//   /**
//    * check if there is a token in the local storage
//    * if there is, add the token to the header
//    * used for authentication purpose
//    */
//   if (localStorage.getItem('token')) {
//     defaultHeaders['Authorization'] = `Bearer ${localStorage.getItem('token')}`
//   }

//   // make the api call
//   const res = await fetch(url, {
//     method,
//     headers: {
//       ...defaultHeaders,
//       ...headers,
//     },
//     body: JSON.stringify(data),
//   })

//   // if the response is not ok, throw an error
//   if (!res.ok) {
//     const { error } = await res.json()
//     console.log(error)
//     throw new Error(error.message)
//   }
//   // if the response is ok, return the result
//   const result = await res.json()
//   return result
// }
