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

  server.get('/beneficiaries/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const beneficiary = await Beneficiary.findById(id)
      res.send(beneficiary)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`))
    }
  })

  server.post('/beneficiaries', async (req, res, next) => {
    try {
      if (!req.is('application/json')) {
        return next(new errors.InvalidContentError("Expects 'application/json'"))
      }

      const { name, cpf, rg, date_of_birth, type_of_plan } = req.body

      const beneficiary = new Beneficiary({
        name,
        cpf,
        rg,
        date_of_birth,
        type_of_plan
      })

      await beneficiary.save()
      res.send(201)
      next()
    } catch (err) {
      return next(new errors.InternalError(err.message))
    }
  })
}
