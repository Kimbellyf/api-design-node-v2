
//// Carrega o modulo HTTP do Node
//Trivialmente você pode criar um simples servidor web para responder qualquer requisição 
//usando apenas o pacote HTTP padrão do Node, conforme mostrado abaixo. 
//Isto criará um servidor e escutará qualquer tipo de requisição HTTP na URL http://127.0.0.1:8000/; Quando um é recebido, enviará uma resposta
import http from 'http'
// import { execute, subscribe } from 'graphql'
import { createServer } from 'http'

import app from './server'
// import schema from './schema'

//definando a constante de comunicação servidor
const server = http.createServer(app)
let currentApp = app

//abrindo a porta de comunicação e uma escuta de requisições para a porta 3000 
server.listen(3000, () => {
	console.log('Server listening on port 3000')
})

//aqui é uma lista/pilha de requisições e chamadas de modulos? .....
if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
