'use strict'

class AdminOnly {
  async handle({request, auth, response}, next) {
    const user = await auth.getUser()
    if(!user.is_admin) {
      response.redirect('/')
      return null
    }

    await next()
  }
}

module.exports = AdminOnly
