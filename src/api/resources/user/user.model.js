//aqui embaixo exporta o mongo 
import mongoose from 'mongoose'

//abaixo é a criação do modelo de usuário
//arquivo como função de modelo do sistema, onde são declarados os Schemas 
//(que de certa forma se assemelham às tabelas dos bancos de dados relacionais), 
//os campos referentes ao Schema e os relacionamentos com outros modelos
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    required: true,
    type: String,
  }
}, {timestamps: true})

//abaixo os métodos do usuário
userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plainTextPword, this.password)
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error('Could not save user')
    }

    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(plaintTextPassword, salt)
  }
}

export const User = mongoose.model('user', userSchema)
