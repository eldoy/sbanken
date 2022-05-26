const test = require('spekky')

async function run() {

  // Start timer
  console.time('Test run')

  await test('sbanken')

  // End timer
  console.timeEnd('Test run')
}
run()
