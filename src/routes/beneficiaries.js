const errors = require('restify-errors')
const Beneficiary = require('../models/Beneficiary')
const beneficiariesRepository = require('../repositories/beneficiaries')
const BeneficiariesController = require('../controllers/BeneficiariesController')

module.exports = server => {
  server.get('/beneficiaries', async (req, res, next) => {
    const controller = new BeneficiariesController(beneficiariesRepository)
    const { statusCode, body } = await controller.findAll()
    res.send(statusCode, body)
    next()
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

  server.put('/beneficiaries/:id', async (req, res, next) => {
    try {
      if (!req.is('application/json')) {
        return next(new errors.InvalidContentError("Expects 'application/json'"))
      }

      await Beneficiary.findOneAndUpdate({ _id: req.params.id }, req.body)
      res.send(200)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`))
    }
  })

  server.del('/beneficiaries/:id', async (req, res, next) => {
    try {
      await Beneficiary.findOneAndRemove({ _id: req.params.id })
      res.send(204)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`))
    }
  })
}
