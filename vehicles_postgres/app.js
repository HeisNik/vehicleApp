require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
require('express-async-errors')
const { PORT } = process.env

const sequelize = require('./db/postgres')

const vehicles = require('./routes/vehicles')
const users = require('./routes/users')
const { User, Vehicle } = require('./models')
const errorHandler = require('./middleware/errorhandler')
const { use } = require('express/lib/router')

// static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.use('/api/users', users)
app.use('/api/vehicles', vehicles)


app.use(errorHandler)

const eraseDatabaseOnSync = process.env.ERASE || false

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`) 
  })
})

