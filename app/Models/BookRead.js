'use strict'

const Model = use('Model')

class BookRead extends Model {
  book() {
    return this.belongsTo('App/Models/Book')
  }
}

module.exports = BookRead
