'use strict'

const User = use('App/Models/User')
const Book = use('App/Models/Book')
const Favorite = use('App/Models/Favorite')

class FavoriteController {
  async getFav({response, params}) {
    const user = await User.findBy('username', params.username)
    const userBooks = await Favorite.query()
      .with('book')
      .where('user_id', user.id)
      .fetch()
    response.json({favouriteBooks: userBooks})
  }

  async unFavorite({params, auth, response}) {
    const user = await auth.getUser()
    // fetch favorite
    await Favorite.query()
      .where('user_id', user.id)
      .where('book_id', params.id)
      .delete()

    return response.json({
      status: 'success',
      data: null
    })
  }

  async favorite({request, auth, response}) {
    const user = await auth.getUser()
    const {book_id} = request.all()
    const favorite = await Favorite.findOrCreate(
      {user_id: user.id, book_id: parseInt(book_id)},
      {user_id: user.id, book_id: parseInt(book_id)},
    )

    response.status(201).json({
      message: 'success.',
      data: favorite
    })
  }
}

module.exports = FavoriteController
