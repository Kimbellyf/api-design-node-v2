//esse arquivo(completo) é a parte da autentificação
import { User } from '../resources/user/user.model' 
// jwt são credenciais, que podem conceder acesso a recursos.
//O JWT é um padrão (RFC-7519) de mercado que define como transmitir e armazenar objetos JSON 
//de forma compacta e segura entre diferentes aplicações. 
//Os dados nele contidos podem ser validados a qualquer momento pois o token é assinado digitalmente.
//Ele é formado por três seções: Header, Payload e Signature.
import jwt from 'jsonwebtoken'
import config from '../../config'
import expressJwt from 'express-jwt'

const checkToken = expressJwt({ secret: config.secrets.JWT_SECRET })

export const signin = (req, res, next) => {
  // req.user estará lá a partir do middleware
  // verifica o usuário. Depois criamos um token
  // e enviamos de volta para o cliente consumir 
  const token = signToken(req.user.id)
  res.json({token: token})
}

export const decodeToken = () => (req, res, next) => {
  if (config.disableAuth) {
    return next()
  }
  
  // torna opcional colocar token na string de consulta
  // se for, coloque nos cabeçalhos onde deveria estar
  // então checkToken pode ver isso. Veja abaixo o formato 'Bearer 034930493'
  // então checkToken pode ver e decodificá-lo
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token
  }
  // isso chamará next se o token for válido
  // e enviar erro se não for. 
  //Será anexado o token decodificado para req.user

  checkToken(req, res, next)
}

export const getFreshUser = () => (req, res, next) => {
  return User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        // se o usuário não foi encontrado
        // era um JWT válido, mas não decodificou
        // para um usuário real em nosso banco de dados. O usuário foi excluído
        // desde que o cliente obteve o JWT ou
        // era um JWT de alguma outra fonte
        res.status(401).send('Unauthorized')
      } else {
        // atualiza o req.user com o novo usuário de
        // dados de token obsoletos
        req.user = user
        next()
      }
    })
    .catch(error => next(error))
}

export const verifyUser = () => (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // if no username or password then send
  if (!username || !password) {
    res.status(400).send('You need a username and password')
    return
  }

 
// procurar usuário no banco de dados para que possamos verificar
  // se as senhas corresponderem ao nome de usuário
  User.findOne({username: username})
    .then(function(user) {
      if (!user) {
        res.status(401).send('No user with the given username')
      } else {
        // checking the passowords here
        if (!user.authenticate(password)) {
          res.status(401).send('Wrong password')
        } else {
          // se tudo estiver bem,
          // então anexar ao req.user
          // e ligue em seguida para o controlador
          // pode assinar um token do req.user._id
          req.user = user;
          next()
        }
      }
    })
    .catch(error => next(err))
}

export const signToken = (id) => jwt.sign(
  {id},
  config.secrets.JWT_SECRET,
  {expiresIn: config.expireTime}
)

export const protect = [decodeToken(), getFreshUser()]
