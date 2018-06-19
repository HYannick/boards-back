'use strict'

class AuthRequired {
  async handle({request, auth, response}, next) {
    try {
      await auth.check()
    } catch(e) {
      console.log(e)
      response.redirect('/')
      return null
    }

    // call next to advance the request
    await next()
  }
}

module.exports = AuthRequired
