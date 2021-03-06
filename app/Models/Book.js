'use strict'

const Model = use('Model')

class Book extends Model {
  author () {
    return this.hasOne('App/Models/Author')
  }
  ressources () {
    return this.hasMany('App/Models/BookRessource')
  }
  previews () {
    return this.hasMany('App/Models/BookPreview')
  }
  languages() {
    return this.hasMany('App/Models/Language')
  }
}

module.exports = Book
