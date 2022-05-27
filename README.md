# SBanken API Libary

Use this library to connect to the Norwegian Bank Sbanken's API's.

&raquo; [Swagger Documentation](https://publicapi.sbanken.no/openapi/apibeta/index.html?urls.primaryName=API%20Beta%20V2)

### Install

```sh
npm i sbanken
```

### Usage

```js
// Require lib
const api = require('sbanken')({
  clientid: 'APP_CLIENT_ID',
  secret: 'APP_SECRET'
})

// Get access token
const token = await api('token/create')

// Get accounts
const accounts = await api('account/find')

// Get account info
// 'id' is the account id from account/find, not the actual account number
const account = await api('account/get', { id })

// Get transactions
/* startDate: string
Optional. The start of the query time span. Must be less than or equal to endDate, and less than or equal to the current date + 1 day. Default value is endDate -30 days. Minimum value is 2000-01-01
*/

/* endDate: string
Optional. The end of the query time span. Must be greater than or equal to startDate, and less than or equal to the current date +1 day. Query cannot span more than 366 days. Default value is the current date.
*/

/* index: int
Optional. The index of the first item to be retrieved. Minimum value is 0, which is the first item within the query time span. Default value is 0.
*/

/* length: int
Optional. Return a number of items items up to this value. Minimum value is 1, maximum value is 1000. The default value is 100.
*/

const transactions = await api('transaction/find', {
  startDate: '-30',
  endDate: new Date(),
  index: 0,
  length: 100
})
```

MIT Licensed. Enjoy!
