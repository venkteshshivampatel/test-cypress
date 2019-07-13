Cypress.on('fail', (error, runnable) => {
  debugger
  throw error // throw error to have test still fail
})