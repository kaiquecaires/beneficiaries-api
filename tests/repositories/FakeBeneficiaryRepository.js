class FakeBeneficiaryRepository {
  constructor () {
    this.beneficiaries = []
  }

  async create (data) {
    return new Promise(resolve => resolve(this.beneficiaries.push(data)))
  }

  async findByCpf (cpf) {
    return new Promise(resolve => resolve(this.beneficiaries.find(beneficiary => beneficiary.cpf === cpf)))
  }
}

module.exports = FakeBeneficiaryRepository
