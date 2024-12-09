const mongoose = require('mongoose')
const { Schema } = mongoose


const albumSchema = new mongoose.Schema({
  artist: { 
    type: String,
    required: true,
    minlength: [3, 'Input min 3 characters'],
    maxlength: [50, 'Input max 50 characters']
  },
  title: {
    type: String,
    required: true,
    minlength: [3, 'Input min 3 characters'],
    maxlength: [50, 'Input max 50 characters']
  },
  year: {
    type: Number,
    required: true,
    min: [1900, 'Cannot be under 1900'],
    max: [2024, 'Cannot be over 2024']
  },
  updatedAt: {
    type: Date
  },
})

albumSchema.pre('save', function(next) {
    this.updatedAt = new Date()
  next()
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album