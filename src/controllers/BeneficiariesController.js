const httpHelper = require('../helpers/httpHelper')
const MissingParamError = require('../errors/MissingParamError')
const InvalidParamError = require('../errors/InvalidParamError')
const cpfValidator = require('../validators/cpfValidator')
const isoDateValidator = require('../validators/isoDateValidator')

class BeneficiariesController {
  constructor (beneficiariesRepository) {
    this.beneficiariesRepository = beneficiariesRepository
  }

  async findAll () {
    try {
      const beneficiaries = await this.beneficiariesRepository.findAll()
      return httpHelper.success(beneficiaries)
    } catch (err) {
      return httpHelper.serverError(err)
    }
  }

  async findById (id) {
    try {
      const beneficiary = await this.beneficiariesRepository.findById(id)
      return httpHelper.success(beneficiary)
    } catch (err) {
      return httpHelper.serverError(err)
    }
  }

  async create (data) {
    try {
      const requiredFields = ['name', 'cpf', 'rg', 'date_of_birth']

      for (const field of requiredFields) {
        if (!data[field]) {
          return httpHelper.badRequest(new MissingParamError(field))
        }
      }

      if (!cpfValidator(data.cpf)) {
        return httpHelper.badRequest(new InvalidParamError('cpf'))
      }

      if (!isoDateValidator(data.date_of_birth)) {
        return httpHelper.badRequest(new InvalidParamError('date_of_birth'))
      }

      await this.beneficiariesRepository.create(data)

      return httpHelper.create()
    } catch (err) {
      return httpHelper.serverError(err)
    }
  }
}

module.exports = BeneficiariesController
