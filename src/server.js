import express from 'express'
import setupMiddware from './middleware'
import { restRouter, graphQLRouter } from './api'
import { graphiqlExpress } from 'apollo-server-express'
import { connect } from './db'
import { signin, protect } from './api/modules/auth'

//Declarando na constante app que é um app com express
const app = express()

//config o middware com o express
setupMiddware(app)
connect()

//config basica de indices de rotas
app.use('/signin', signin)
app.use('/api', protect, restRouter)
app.use('/graphql', graphQLRouter)
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }))

// catch all
app.all('*', (req, res) => {
  res.json({ok: true})
})

//export default é usado para exportar uma única classe, função ou primitiva de um arquivo de script.

export default app
