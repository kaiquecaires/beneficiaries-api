const errors = require('restify-errors')
const restErrors = require('restify-errors/lib/restErrors')

module.exports = server => {
  server.get('/beneficiaries', (req, res, next) => {
    res.send({ msg: 'test' })
    next()
  })
}
