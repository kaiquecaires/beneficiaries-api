class FakeBeneficiaryRepository {
  constructor () {
    this.beneficiaries = []
  }

  async create (data) {
    const newData = Object.assign(data, {
      _id: `${parseInt(new Date().getTime() * (Math.random() * 10))}`
    })
    this.beneficiaries.push(newData)
    return new Promise(resolve => resolve(true))
  }

  async findByCpf (cpf) {
    return new Promise(resolve => resolve(this.beneficiaries.find(beneficiary => beneficiary.cpf === cpf)))
  }

  async findCpfInDifferentId (id, cpf) {
    return new Promise(resolve => {
      const findCpfInDifferentId = this.beneficiaries.find(beneficiary => beneficiary.cpf === cpf && beneficiary._id !== id)
      console.log(findCpfInDifferentId)
      findCpfInDifferentId ? resolve(findCpfInDifferentId) : resolve([])
    })
  }

  async update (id, data) {
    const index = this.beneficiaries.findIndex(beneficiary => beneficiary._id === id)
    const beneficiary = this.beneficiaries[index]
    if (beneficiary) {
      for (const field in data) {
        this.beneficiaries[index][field] = data[field]
      }
    }
  }

  async findAll () {
    return new Promise(resolve => resolve(this.beneficiaries))
  }
}

module.exports = FakeBeneficiaryRepository
