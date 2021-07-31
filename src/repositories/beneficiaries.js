const Beneficiary = require('../models/Beneficiary')

module.exports = {
  findAll: async () => {
    const beneficiaries = await Beneficiary.find({})
    return beneficiaries
  }
}
