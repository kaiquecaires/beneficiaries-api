class BeneficiariesController {
  constructor (beneficiariesRepository) {
    this.beneficiariesRepository = beneficiariesRepository
  }

  async findAll () {
    try {
      const beneficiaries = await this.beneficiariesRepository.findAll()
      return {
        statusCode: 200,
        body: beneficiaries
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: err
      }
    }
  }

  async findById (id) {
    try {
      const beneficiary = await this.beneficiariesRepository.findById(id)
      return {
        statusCode: 200,
        body: beneficiary
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: err
      }
    }
  }
}

module.exports = BeneficiariesController
