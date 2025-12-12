const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//const url  = `mongodb+srv://jaritapaniaaltonen_db_user:${password}@cluster0.efy2nbv.mongodb.net/?appName=Cluster0`
const url = `mongodb+srv://jaritapaniaaltonen_db_user:${password}@ccluster0.efy2nbv.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    let message = ''
    result.forEach(person => {
      message = `${person.name} ${person.number}`
      console.log(message)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })
  
  person.save().then(result => {
    const message = `added ${name} number ${number} to phonebook`
    console.log(message)
    mongoose.connection.close()
  })
}

