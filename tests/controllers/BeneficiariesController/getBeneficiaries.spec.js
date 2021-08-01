const BeneficiaryController = require('../../../src/controllers/BeneficiariesController')
const FakeBeneficiaryRepository = require('../../repositories/FakeBeneficiaryRepository')

const makeSut = () => {
  const fakeBeneficiaryRepository = new FakeBeneficiaryRepository()
  const beneficiaryController = new BeneficiaryController(fakeBeneficiaryRepository)

  return {
    beneficiaryController,
    fakeBeneficiaryRepository
  }
}

const makeHttpRequest = () => ({
  body: {
    name: 'John Doe',
    cpf: '00000000272',
    rg: 'xxxxxxxxx',
    date_of_birth: new Date().toISOString(),
    type_of_plan: 'Basic',
    number_of_dependents: 0
  }
})

describe('Test findById and findAll function in BeneficiaryController', () => {
  test('Should return status code 500 if beneficiary repository findById throws', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    jest.spyOn(fakeBeneficiaryRepository, 'findById').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const httpRequest2 = makeHttpRequest()
    httpRequest2.body.cpf = '70334208033'
    await beneficiaryController.create(httpRequest2.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest2.body.cpf)
    const httpResponse = await beneficiaryController.findById(beneficiary._id)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return status code 500 if beneficiary repository findAll throws', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    jest.spyOn(fakeBeneficiaryRepository, 'findAll').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const httpRequest2 = makeHttpRequest()
    httpRequest2.body.cpf = '70334208033'
    await beneficiaryController.create(httpRequest2.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest2.body.cpf)
    const httpResponse = await beneficiaryController.findAll(beneficiary._id)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return all beneficiaries', async () => {
    const { beneficiaryController } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const httpRequest2 = makeHttpRequest()
    httpRequest2.body.cpf = '70334208033'
    await beneficiaryController.create(httpRequest2.body)
    const httpResponse = await beneficiaryController.findAll()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.length).toBe(2)
  })

  test('Should return a specific beneficiary', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const httpRequest2 = makeHttpRequest()
    httpRequest2.body.cpf = '70334208033'
    await beneficiaryController.create(httpRequest2.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest2.body.cpf)
    const httpResponse = await beneficiaryController.findById(beneficiary._id)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(beneficiary)
  })
})
