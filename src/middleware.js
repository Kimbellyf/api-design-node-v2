//O middlware são funções que tem acesso ao obj de solicitação (req) 
//e ao objeto de resposta (res)
//tbm tem função do ciclo de solicitação - resposta

//Funções de middleware podem executar as seguintes tarefas: 
//-Executar qualquer código. -Fazer mudanças nos objetos de solicitação e resposta. 
//-Encerrar o ciclo de solicitação-resposta. -Chamar o próximo middleware na pilha. (com next


import bodyParser from 'body-parser'

const setGlobalMiddleware = (app) => {
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
}

export default setGlobalMiddleware
