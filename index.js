const superagent = require('superagent')
var btoa = require('btoa')

function request(url, options = {}) {
  const { method = 'get', params = '', auth } = options
  return new Promise(function(resolve, reject) {
    superagent[method](url)
    .send(params)
    .query({})
    .set('Authorization', auth)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err || !res.ok) {
        console.log(err)
        reject(err)
      } else {
        resolve(res.body)
      }
    })
  })
}

function getConfig(config) {
  if (!config) {
    try {
      config = require(process.cwd() + '/sbanken.json')
    } catch(e) {
      config = {}
    }
  }
  const { clientid, secret } = config
  if (!clientid) {
    throw new Error('clientid missing')
  }
  if (!secret) {
    throw new Error('secret missing')
  }
  return config
}

function getAccessToken(config) {
  const { clientid, secret } = getConfig(config)

  var url = 'https://auth.sbanken.no/identityserver/connect/token'

  var auth = btoa(encodeURIComponent(clientid) + ':' + encodeURIComponent(secret))

  return request(url, {
    method: 'post',
    params: 'grant_type=client_credentials',
    auth: 'Basic ' + auth
  })
}

function getAccountDetails(token) {
  var url = 'https://publicapi.sbanken.no/apibeta/api/v2/accounts/'

  return request(url, { auth: 'Bearer ' + token })
}

function getAccountNumberDetails(accountNumber, token) {
  var url = 'https://publicapi.sbanken.no/apibeta/api/v2/accounts/' + accountNumber

  return request(url, { auth: 'Bearer ' + token })
}

function getAccountTransactions(accountNumber, token) {
  var url = 'https://publicapi.sbanken.no/apibeta/api/v2/transactions/' + accountNumber

  return request(url, { auth: 'Bearer ' + token })
}

module.exports = {
  getAccessToken,
  getAccountDetails,
  getAccountNumberDetails,
  getAccountTransactions
}
