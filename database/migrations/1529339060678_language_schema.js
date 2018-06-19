'use strict'

const Schema = use('Schema')

class LanguageSchema extends Schema {
  up () {
    this.create('languages', (table) => {
      table.increments()
      table.integer('book_id').unsigned().notNullable()
      table.string('language')
      table.timestamps()
    })
  }

  down () {
    this.drop('languages')
  }
}

module.exports = LanguageSchema
