const assert = require('assert')
const sbanken = require('../../index.js')
const { clientid, secret, account_id } = require('../../sbanken.json')
const api = sbanken({ clientid, secret })

const it = {},
  x = {}

it['should create a token'] = async function () {
  const response = await api('token/create')
  assert.ok(typeof response.data.access_token == 'string')
}

it['should fetch accounts'] = async function () {
  const response = await api('account/find')
  assert.ok(response.data.availableItems)
  assert.ok(Array.isArray(response.data.items))
}

it['should fetch single account'] = async function () {
  const response = await api('account/get', { id: account_id })
  assert.equal(response.data.accountId, account_id)
}

it['should fetch transactions for account'] = async function () {
  const response = await api('transaction/find', { account_id })
  assert.ok(response.data.availableItems)
  assert.ok(Array.isArray(response.data.items))
}

it['should fetch transactions with query'] = async function () {
  const response = await api('transaction/find', { account_id, length: 1 })
  assert.ok(response.data.items.length == 1)
  assert.ok(Array.isArray(response.data.items))
}

module.exports = it
