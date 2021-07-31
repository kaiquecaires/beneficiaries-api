const Beneficiary = require('../models/Beneficiary')

module.exports = {
  findAll: async () => {
    const beneficiaries = await Beneficiary.find({})
    return beneficiaries
  },

  findById: async (id) => {
    const beneficiary = await Beneficiary.findById(id)
    return beneficiary
  },

  create: async (data) => {
    const beneficiary = new Beneficiary(data)
    await beneficiary.save()
  }
}
