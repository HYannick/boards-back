'use strict'

const Schema = use('Schema')

class BookPreviewSchema extends Schema {
  up () {
    this.create('book_previews', (table) => {
      table.increments()
      table.integer('book_id').unsigned().notNullable()
      table.string('preview_url')
      table.timestamps()
    })
  }

  down () {
    this.drop('book_previews')
  }
}

module.exports = BookPreviewSchema
