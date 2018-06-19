'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
  showLoginForm({view}) {
    return view.render('auth.login')
  }

  async login({request, response, session, auth}) {
    // get form data
    const {email, password, remember} = request.all()
    // retrieve user
    const user = await User.query()
      .where('email', email)
      .where('is_active', true).first()
    // verify user password
    if (user) {
      const passwordVerified = await Hash.verify(password, user.password)
      // login the user
      if(passwordVerified) {
        await auth.remember(!!remember).login(user)
        return response.route('home')
      }
    }
    session.flash({
      notification: {
        type: 'danger',
        message: `We couldn't verify your credentials :(, make sure you've confirmed your email address.`
      }
    })

    return response.redirect('back')
  }
}

module.exports = LoginController
