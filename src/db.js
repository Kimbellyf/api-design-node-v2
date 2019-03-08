//aqui está importando o banco noSQL mongo e usando o mongoose p isso
//Mongoose é uma biblioteca do Nodejs que proporciona uma solução baseada em esquemas 
//para modelar os dados da sua aplicação. 
//Ele possui sistema de conversão de tipos, validação, criação de consultas e hooks para lógica de negócios
import mongoose from 'mongoose'
import appConfig from './config'

//Promise
//Promise é um objeto usado para processamento assíncrono. 
//Um Promise (de "promessa") representa um valor que pode 
//estar disponível agora, no futuro ou nunca.
mongoose.Promise = global.Promise

//conexão com o banco
export const connect = (config = appConfig) => {
  return mongoose.connect(config.db.url, {
    useMongoClient: true
  })
}
