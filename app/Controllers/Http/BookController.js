'use strict'

const {validate} = use('Validator')
const Book = use('App/Models/Book')

class BookController {

  async create({request, response, auth}) {
    const book_data = request.except(['previews', 'ressources', 'languages'])
    const user = await auth.getUser()

    let book
    try {
      book = await user.books().create(book_data)
    } catch (e) {
      console.log(e.message)
      response.json({error: e.message})
    }


    const previewData = request.input('previews').map(preview => ({preview_url: preview}))
    const ressourceData = request.input('ressources').map(ressource => ({ressource_url: ressource}))

    await book.previews().createMany(previewData)
    await book.ressources().createMany(ressourceData)
    await book.save()


    response.json({book})
  }
}

module.exports = BookController
