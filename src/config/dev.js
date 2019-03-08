//exports ou module.exports fica um {} obj vazio padrão, prontos para receberem valores/chaves ou se tornar um objeto q pode ser exportado p outro modulo utilizando require
// do arq e dps pode ser chamado a função
//coisas que n tem module.exports ou exports ficam de modo local e n poderiam ser chamados por outro arquivo/modulo

export const config = {
  expireTime: '30d',
  secrets: {
    JWT_SECRET: 'yeezy350boost'
  }
}
