'use strict'

const {validate} = use('Validator')
const User = use('App/Models/User')
const randomString = require('random-string')
const Mail = use('Mail')

class RegisterController {
  async signup({request, response}) {
    const {username, email, password} = request.post()
    const user_validation = await validate(request.all(), {
      username: 'required|alpha_numeric',
      password: 'required|min:3',
      re_password: 'required|min:3|same:password',
      email: 'required|email'
    })

    if (user_validation.fails()) {
      response.json({error: 'Error in validation'}, 500)
    }

    const user = await User.create({
      username,
      email,
      password,
      confirmation_token: randomString({length: 40})
    })

    await Mail.send('mail-template', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('hello@boards.com')
        .subject('Welcome to Boards!')
    })

    response.json({success: 'User Created!'})
  }
  async logout({auth, response}) {
    await auth.logout()
    response.json({success: 'You are now logged out'})
  }
  async login({request, auth, response}) {
    const {email, password} = request.all()
    const login_validation = await validate(request.all(), {
      email: 'required|email',
      password: 'required|min:3',
    })

    if (login_validation.fails()) {
      return response.status(500).json({error: 'Error in validation'})
    }
    const authToken = await auth.attempt(email, password)
    response.json(authToken)
  }

  async confirmEmail({params, response}) {
    // Get user token
    const user = await User.findBy('confirmation_token', params.token)
    // Set confirmation to null and is_active to true
    user.confirmation_token = null
    user.is_verified = true
    // persist user to database
    await user.save()
    // display success message
    response.json({success: 'Email confirmed!'})
  }
}

module.exports = RegisterController
