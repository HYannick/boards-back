'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')
const Hash = use('Hash')

// const title = _.shuffle(['Black Panther', 'Les Naufragés d\'YthaQ', 'Lanfeust des Etoiles', 'La Geste des Chevaliers Dragons', 'Trolls de Troys', 'Thorgal', 'XIII', 'Narnia Stories', 'Gunz', 'Avatar: Le dernier Maître de l\'air', 'Kaamelot', 'Ekhö'])[0]
//
// const username = _.shuffle(['Nihu', 'Parka', 'Monz', 'Ayho', 'Fherna', 'Loggy', 'Karma', 'Shurly', 'Quante', 'Urgho', 'Haegis', 'Zenka'])
// const email = _.shuffle(['Nihu@gmail.com', 'Parka@gmail.com', 'Monz@gmail.com', 'Ayho@gmail.com', 'Fherna@gmail.com', 'Loggy@gmail.com', 'Karma@gmail.com', 'Shurly@gmail.com', 'Quante@gmail.com', 'Urgh@gmail.com', 'Haegis@gmail.com', 'Zenka@gmail.com'])
//
// const password = _.shuffle(['Nihu678', 'Parka1234', 'Monz4567', 'AyhoIEJDK', 'FhernaSBDYU', 'LoggyZAODPD', 'KarmaJNCHE', 'ShurlyZJONXX', 'QuanteEOJXCH', 'UrghoJXCUZH', 'HaegisCHEDXJ', 'ZenkaCHEIDH'])

Factory.blueprint('App/Models/Book', (faker) => {
  return {
    title : faker.word()
  }
})

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    password: await Hash.make(faker.password()),
    email: faker.email(),
    is_admin: false
  }
})

