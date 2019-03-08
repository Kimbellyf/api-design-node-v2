import express from 'express'
import playlistController from './playlist.controller'

export const playlistRouter = express.Router()

playlistRouter.param('id', playlistController.findByParam)

playlistRouter.route('/')
  .get(playlistController.getAll) //chama a função para dar get em todos os 
  .post(playlistController.createOne) //aqui chama uma função de deletar/criar um?!

//rota da playlist q recebe um id
playlistRouter.route('/:id')
  .get(playlistController.getOne) //aqui chama a função q pega um
  .put(playlistController.updateOne) //aqui chama uma função de atualização de um
  .delete(playlistController.createOne) //aqui chama uma função de deletar/criar um?!
