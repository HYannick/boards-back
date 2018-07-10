'use strict'

const Redis = use('Redis')
const User = use('App/Models/User')
const Book = use('App/Models/Book')
const Favorite = use('App/Models/Favorite')

class UserController {
  async getAuthUser({response, auth}) {
    // const cachedUser = await Redis.get('currentUser')
    // if(cachedUser) {
    //   return JSON.parse(cachedUser)
    // }
    const user = await auth.getUser()
    // await Redis.set('currentUser', JSON.stringify(user))
    response.json(user)
  }

  async getUser({response, params}) {
    const user = await User.findBy('id', params.id)
    const fetchedUser = user.toJSON()
    delete fetchedUser.password
    response.json(fetchedUser)
  }

  async updateUser({request, response, auth}) {
    const {username, email, bio} = request.all()

    const user = await auth.getUser()
    const currentUser = await User.findBy('id', user.id)
    Object.assign(currentUser, request.all())
    await currentUser.save()
  }

  async getBooks({response, auth, params}) {
    const user = await auth.getUser()
    const book = await Book.query()
      .where('user_id', user.id)
      .with('previews')
      .with('ressources')
      .fetch()

    response.json({book})
  }
}

module.exports = UserController
