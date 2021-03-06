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

describe('Test delete function in BeneficiaryController', () => {
  test('Should return status code 400 if id is not provided', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    const httpResponse = await beneficiaryController.delete(null)
    await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return status code 500 if delete function in beneficiary repository throws', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    jest.spyOn(fakeBeneficiaryRepository, 'delete').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    const httpResponse = await beneficiaryController.delete(beneficiary._id)
    await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return status code 204 if beneficiary was deleted', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    const httpResponse = await beneficiaryController.delete(beneficiary._id)
    await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    expect(httpResponse.statusCode).toBe(204)
  })
})
