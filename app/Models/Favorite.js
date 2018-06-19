'use strict'

const Model = use('Model')

class Favorite extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  book() {
    return this.belongsTo('App/Models/Book')
  }
}

module.exports = Favorite
