class FakeBeneficiaryRepository {
  constructor () {
    this.beneficiaries = []
  }

  async create (data) {
    return new Promise(resolve => this.beneficiaries.push(data))
  }
}

module.exports = FakeBeneficiaryRepository
