const errors = require('restify-errors')
const Beneficiary = require('../models/Beneficiary')

module.exports = server => {
  server.get('/beneficiaries', async (req, res, next) => {
    try {
      const beneficiaries = await Beneficiary.find({})
      res.send(beneficiaries)
      next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.post('/beneficiaries', async (req, res, next) => {
    try {
      if (!req.is('application/json')) {
        return next(new errors.InvalidContentError("Expects 'application/json'"))
      }

      const { name, cpf, rg, date_of_birth } = req.body

      const beneficiary = new Beneficiary({
        name,
        cpf,
        rg,
        date_of_birth
      })

      await beneficiary.save()
      res.send(201)
      next()
    } catch (err) {
      return next(new errors.InternalError(err.message))
    }
  })
}
