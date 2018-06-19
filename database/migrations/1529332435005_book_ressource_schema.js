'use strict'

const Schema = use('Schema')

class BookRessourceSchema extends Schema {
  up () {
    this.create('book_ressources', (table) => {
      table.increments()
      table.integer('book_id').unsigned().notNullable()
      table.string('ressource_url')
      table.timestamps()
    })
  }

  down () {
    this.drop('book_ressources')
  }
}

module.exports = BookRessourceSchema
