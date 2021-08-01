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
      const requiredFields = ['name', 'cpf', 'rg', 'date_of_birth', 'type_of_plan']

      for (const field of requiredFields) {
        if (!data[field]) {
          return httpHelper.badRequest(new MissingParamError(field))
        }
      }

      const typesOfPlanAccepted = ['Basic', 'Standard', 'Premium']

      if (!typesOfPlanAccepted.includes(data.type_of_plan)) {
        return httpHelper.badRequest(new InvalidParamError('type_of_plan'))
      }

      if (!cpfValidator(data.cpf)) {
        return httpHelper.badRequest(new InvalidParamError('cpf'))
      }

      const cpfAlreadyExists = await this.beneficiariesRepository.findByCpf(data.cpf)

      if (cpfAlreadyExists) {
        return httpHelper.badRequest({ name: 'cpf already exists' })
      }

      if (!isoDateValidator(data.date_of_birth) || new Date(data.date_of_birth) > new Date()) {
        return httpHelper.badRequest(new InvalidParamError('date_of_birth'))
      }

      await this.beneficiariesRepository.create(data)

      return httpHelper.create()
    } catch (err) {
      return httpHelper.serverError(err)
    }
  }

  async update (id, data) {
    try {
      if (!id) {
        return httpHelper.badRequest(new MissingParamError('id'))
      }

      const beneficiary = await this.findById(id)

      if (!beneficiary.body) {
        return httpHelper.badRequest(new InvalidParamError('id'))
      }

      if (data.cpf) {
        if (!cpfValidator(data.cpf)) {
          return httpHelper.badRequest(new InvalidParamError('cpf'))
        }

        const cpfAlreadyExists = await this.beneficiariesRepository.findCpfInDifferentId(id, data.cpf)

        if (cpfAlreadyExists.length > 0) {
          return httpHelper.badRequest({ message: 'cpf already exists' })
        }
      }

      if (data.date_of_birth) {
        if (!isoDateValidator(data.date_of_birth) || new Date(data.date_of_birth) > new Date()) {
          return httpHelper.badRequest(new InvalidParamError('date_of_birth'))
        }
      }

      if (data.type_of_plan) {
        const typesOfPlanAccepted = ['Basic', 'Standard', 'Premium']

        if (!typesOfPlanAccepted.includes(data.type_of_plan)) {
          return httpHelper.badRequest(new InvalidParamError('type_of_plan'))
        }
      }

      await this.beneficiariesRepository.update(id, data)
      return httpHelper.success()
    } catch (err) {
      return httpHelper.serverError(err)
    }
  }

  async delete (id) {
    try {
      if (!id) {
        return httpHelper.badRequest(new MissingParamError('id'))
      }

      const response = await this.findById(id)

      if (!response.body) {
        return httpHelper.badRequest(new InvalidParamError('id'))
      }

      this.beneficiariesRepository.delete(id)
      return httpHelper.noContent()
    } catch (err) {
      return httpHelper.serverError(err)
    }
  }
}

module.exports = BeneficiariesController
