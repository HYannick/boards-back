'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('profile_img').notNullable().defaultTo('uploads/default.jpg')
      table.string('background_img').notNullable().defaultTo('uploads/default.jpg')
      table.text('bio')
      table.integer('book_id').unsigned()
      table.boolean('is_admin').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)
      table.string('confirmation_token')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
