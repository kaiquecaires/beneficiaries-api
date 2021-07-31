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
}
