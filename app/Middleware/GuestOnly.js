'use strict'

class GuestOnly {
  async handle({request, auth, response}, next) {
    try {
      await auth.check()
    } catch(e) {
      await next()
      return null
    }
    response.redirect('/')
  }
}

module.exports = GuestOnly
