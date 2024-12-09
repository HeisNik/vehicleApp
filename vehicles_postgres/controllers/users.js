const User = require('../models/User')
const Vehicle = require('../models/Vehicle')
const { StatusCodes } = require('http-status-codes')

const getUsers = async (req, res) => {
    const users = await User.findAll({
      attributes: {exclude : ['username']},
      include: {
        model: Vehicle,
        attributes: {exclude: ['userId']}
      }
    })
    res.status(StatusCodes.OK).json({ success: true, data: users })
  }
  
  const createUser = async (req, res) => {
    console.log('req', req)
    const { name, username } = req.body
    const user = await User.create({name, username})
    return res.status(StatusCodes.CREATED).send({ success: true, data: user })  
  }

module.exports = {getUsers, createUser}