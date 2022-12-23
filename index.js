const request = require('sadope')
const btoa = require('btoa')

const APIBASE = 'https://publicapi.sbanken.no/apibeta/api/v2/'
const TOKENURL = 'https://auth.sbanken.no/identityserver/connect/token'

function format(date) {
  return date.toISOString().split('T')[0]
}

function getToken({ clientid, secret }) {
  return request(TOKENURL, {
    method: 'post',
    params: 'grant_type=client_credentials',
    auth:
      'Basic ' +
      btoa(encodeURIComponent(clientid) + ':' + encodeURIComponent(secret))
  })
}

module.exports = function ({ clientid, secret } = {}) {
  if (!clientid) {
    throw new Error('clientid missing')
  }
  if (!secret) {
    throw new Error('secret missing')
  }

  return async function (action, params = {}) {
    if (action == 'token/create') {
      return getToken({ clientid, secret })
    }

    let token = params.token
    delete params.token
    if (!token) {
      const { data } = await getToken({ clientid, secret })
      token = data.access_token
    }

    if (!token) {
      throw new Error('access token not found')
    }

    const auth = 'Bearer ' + token

    // Find all accounts
    if (action == 'account/find') {
      return request(APIBASE + 'accounts', { auth })
    }

    // Get single account
    if (action == 'account/get') {
      const { id } = params
      if (!id) {
        throw new Error("required parameter 'id' missing")
      }
      return request(APIBASE + 'accounts/' + id, { auth })
    }

    // Get transactions for account
    if (action == 'transaction/find') {
      const { account_id, ...query } = params
      if (!account_id) {
        throw new Error("required parameter 'account_id' missing")
      }
      if (typeof query.startDate == 'object') {
        query.startDate = format(query.startDate)
      }
      if (typeof query.endDate == 'object') {
        query.endDate = format(query.endDate)
      }
      return request(APIBASE + 'transactions/' + account_id, {
        auth,
        query
      })
    }
  }
}
