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
const { data } = await api('token/create')
{
  access_token: 'TOKEN'
}

// Get accounts
const { data } = await api('account/find')

// Example response
{
  availableItems: 1,
  items: [
    {
      accountId: 'AAABBBCCC111222333',
      accountNumber: '97101778369',
      ownerCustomerId: '16118855566',
      name: 'LØNNSKONTO',
      accountType: 'Standard account',
      available: 132379.9,
      balance: 136864.9,
      creditLimit: 0
    }
  ]
}

// Get account info
// 'id' is the accountId from account/find, not the actual account number
const { data } = await api('account/get', { id })

// Get transactions
/* account_id: string
Required. The accountId from account/find
*/

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

const { data } = await api('transaction/find', {
  account_id: '93454A0332...',
  startDate: '-30',
  endDate: new Date(),
  index: 0,
  length: 100
})

// Example response
{
  availableItems: 8,
  items: [
    {
      accountingDate: '2022-05-25T00:00:00',
      interestDate: '2022-05-24T00:00:00',
      otherAccountNumberSpecified: false,
      amount: -12000,
      text: 'Description',
      transactionType: 'NETTGIRO',
      transactionTypeCode: 203,
      transactionTypeText: 'NETTGIRO',
      isReservation: false,
      reservationType: null,
      source: 'Archive',
      cardDetailsSpecified: false,
      transactionDetailSpecified: false
    }
  ]
}
```

The `transaction/find` availableItems is the total possible matches, the items adhere to the `length` parameter.

MIT Licensed. Enjoy!
