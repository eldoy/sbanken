const assert = require('assert')
const sbanken = require('../../index.js')
const { clientid, secret, accountid } = require('../../sbanken.json')
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
  const result = await api('account/get', { id: accountid })
  assert.equal(result.accountId, accountid)
}

it['should fetch transactions for account'] = async function() {
  const result = await api('transaction/find', { id: accountid })
  assert.ok(result.availableItems)
  assert.ok(Array.isArray(result.items))
}

module.exports = it