const httpHelper = require('../helpers/http-helper')

class BeneficiariesController {
  constructor (beneficiariesRepository) {
    this.beneficiariesRepository = beneficiariesRepository
  }

  async findAll () {
    try {
      const beneficiaries = await this.beneficiariesRepository.findAll()
      return httpHelper.httpResponse(200, beneficiaries)
    } catch (err) {
      return httpHelper.httpResponse(err)
    }
  }

  async findById (id) {
    try {
      const beneficiary = await this.beneficiariesRepository.findById(id)
      return httpHelper.httpResponse(200, beneficiary)
    } catch (err) {
      return httpHelper.httpResponse(400, err)
    }
  }
}

module.exports = BeneficiariesController
