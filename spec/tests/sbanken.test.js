const assert = require('assert')
const sbanken = require('../../index.js')
const { clientid, secret, account_id } = require('../../sbanken.json')
const api = sbanken({ clientid, secret })

const it = {}, x = {}

it['should create a token'] = async function() {
  const result = await api('token/create')
  assert.ok(typeof result == 'string')
}

it['should fetch accounts'] = async function() {
  const result = await api('account/find')
  assert.ok(result.availableItems)
  assert.ok(Array.isArray(result.items))
}

it['should fetch single account'] = async function() {
  const result = await api('account/get', { id: account_id })
  assert.equal(result.accountId, account_id)
}

it['should fetch transactions for account'] = async function() {
  const result = await api('transaction/find', { account_id })
  assert.ok(result.availableItems)
  assert.ok(Array.isArray(result.items))
}

it['should fetch transactions with query'] = async function() {
  const result = await api('transaction/find', { account_id, length: 1 })
  assert.ok(result.items.length == 1)
  assert.ok(Array.isArray(result.items))
}

module.exports = it