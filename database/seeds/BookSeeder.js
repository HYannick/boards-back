'use strict'

/*
|--------------------------------------------------------------------------
| BookSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class BookSeeder {
  async run () {
    await Factory
      .model('App/Models/Book')
      .createMany(10)
  }
}

module.exports = BookSeeder
