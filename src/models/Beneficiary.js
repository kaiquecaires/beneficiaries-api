const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const BeneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cpf: {
    type: String,
    required: true,
    trim: true,
    length: 11
  },
  rg: {
    type: String,
    required: true,
    trim: true,
    length: 9
  },
  date_of_birth: {
    type: Date,
    required: true,
    trim: true
  }
})

// Create automatic created_atd and updated_at
BeneficiarySchema.plugin(timestamp)

const Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema)
module.exports = Beneficiary
