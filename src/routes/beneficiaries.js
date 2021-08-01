const errors = require('restify-errors')
const Beneficiary = require('../models/Beneficiary')
const beneficiariesRepository = require('../repositories/beneficiariesRepository')
const BeneficiariesController = require('../controllers/BeneficiariesController')

module.exports = server => {
  server.get('/beneficiaries', async (req, res, next) => {
    const controller = new BeneficiariesController(beneficiariesRepository)
    const { statusCode, body } = await controller.findAll()
    res.send(statusCode, body)
    next()
  })

  server.get('/beneficiaries/:id', async (req, res, next) => {
    const { id } = req.params
    const controller = new BeneficiariesController(beneficiariesRepository)
    const { statusCode, body } = await controller.findById(id)
    res.send(statusCode, body)
    next()
  })

  server.post('/beneficiaries', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"))
    }
    const { name, cpf, rg, date_of_birth, type_of_plan, number_of_dependents } = req.body
    const controller = new BeneficiariesController(beneficiariesRepository)
    const { statusCode, body } = await controller.create({
      name,
      cpf,
      rg,
      date_of_birth,
      type_of_plan,
      number_of_dependents
    })
    res.send(statusCode, body)
    next()
  })

  server.put('/beneficiaries/:id', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"))
    }
    const controller = new BeneficiariesController(beneficiariesRepository)
    const { statusCode, body } = await controller.update(req.params.id, req.body)
    res.send(statusCode, body)
    next()
  })

  server.del('/beneficiaries/:id', async (req, res, next) => {
    try {
      const controller = new BeneficiariesController(beneficiariesRepository)
      const { statusCode, body } = await controller.delete(req.params.id)
      res.send(statusCode, body)
      next()
    } catch (err) {
      return next(new errors.ResourceNotFoundError(`There is no beneficiary with the id of ${req.params.id}`))
    }
  })
}
