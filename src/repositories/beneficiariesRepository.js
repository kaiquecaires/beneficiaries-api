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

  findCpfInDifferentId: async (id, cpf) => {
    const beneficiary = await Beneficiary.find({
      $and: [
        { cpf: cpf },
        {
          _id: {
            $nin: [id]
          }
        }
      ]
    })

    return beneficiary
  },

  findByCpf: async (cpf) => {
    const beneficiary = await Beneficiary.findOne({ cpf })
    return beneficiary
  },

  create: async (data) => {
    const beneficiary = new Beneficiary(data)
    await beneficiary.save()
  },

  update: async (id, data) => {
    await Beneficiary.findOneAndUpdate({ _id: id }, data)
  }
}
