import mongoose from 'mongoose'

//aqui abaixo os atributos e se são requeridos ou n
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Song must have a title']
  },

  url: {
    type: String,
    unique: true,
    required: [true, 'Song must have a url']
  },

  album: String,

  artist: String,

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
})

export const Song = mongoose.model('song', songSchema)
