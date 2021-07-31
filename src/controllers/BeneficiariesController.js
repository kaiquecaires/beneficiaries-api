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
      return new Error(err)
    }
  }
}

module.exports = BeneficiariesController
