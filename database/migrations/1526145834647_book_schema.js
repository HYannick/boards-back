'use strict'

const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('title', 255).notNullable()
      table.string('img_title', 255)
      table.string('tome_title', 255).notNullable()
      table.string('short_description', 255).notNullable()
      table.text('description').notNullable()
      table.string('cover', 255).notNullable().defaultTo('/uploads/preview.jpg')
      table.string('background_cover', 255).defaultTo('/uploads/preview.jpg')
      table.boolean('is_published').notNullable().defaultTo(false)
      table.boolean('is_featured').notNullable().defaultTo(false)
      table.boolean('is_coming_soon').notNullable().defaultTo(false)
      table.boolean('is_released').notNullable().defaultTo(false)
      table.float('min_price').notNullable().defaultTo(0.00)
      table.float('max_price').notNullable().defaultTo(0.00)
      table.integer('rating').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
