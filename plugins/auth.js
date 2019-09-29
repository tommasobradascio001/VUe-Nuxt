// This file adds auth interceptors to axios
// https://axios.nuxtjs.org/extend.html
// The files works specifically with devise tokens

const deviseTokens = ['token-type', 'access-token', 'client', 'uid', 'expiry']

export default function(ctx) {
  const app = ctx.app
  const axios = ctx.$axios
  const redirect = ctx.$redirect
  const auth = app.$auth

  // OVERRIDES

  axios.onRequest(request => {
    // Attach the auth tokens to every request
    if (auth.getToken('local')) {
      const initialToken = auth
        .getToken('local')
        .toString()
        .split(' ')
      const savedToken = JSON.parse(initialToken[1])
      request.headers.common = Object.assign(request.headers.common, savedToken)
    }
  })

  axios.onResponse(response => {
    let receivedToken = {}

    deviseTokens.forEach(tokenName => {
      if (response.headers[tokenName]) {
        receivedToken[tokenName] = response.headers[tokenName]
      }
    })

    if (receivedToken) {
      receivedToken = JSON.stringify(receivedToken)
      if (response.data) {
        response.data.token = receivedToken
      } else {
        response.data = {
          token: receivedToken
        }
      }
    }
  })

  axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
