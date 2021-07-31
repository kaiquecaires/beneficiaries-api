const Beneficiary = require('../models/Beneficiary')

class BeneficiariesController {
  async getAll (req, res, next) {
    try {
      const beneficiaries = await Beneficiary.find({})
      res.send(beneficiaries)
      next()
    } catch (err) {
      return new Error(err)
    }
  }
}

module.exports = new BeneficiariesController()
