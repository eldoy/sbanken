# SBanken API Libary

Use this library to connect to the Norwegian Bank Sbanken's API's.

&raquo; [Swagger Documentation](https://publicapi.sbanken.no/openapi/apibeta/index.html?urls.primaryName=API%20Beta%20V2)

### Install

```sh
npm i sbanken
```

### Usage

Add a file called 'sbanken.json' in your application's root directory:
```json
{
  "clientid": "APP_CLIENT_ID",
  "secret": "APP_SECRET"
}
```

The following usage has been implemented:

```js
// Require lib
const api = require('sbanken')

// Get an access token
const { access_token } = await api.getAccessToken()

// Get accounts
const accounts = await api.getAccountDetails(access_token)

// Get account info
// 'id' is the account id, not the actual account number
const account = await api.getAccountNumberDetails(id, access_token)

// Get transactions
const transactions = await api.getAccountTransactions(id, access_token)
```

MIT Licensed. Enjoy!
