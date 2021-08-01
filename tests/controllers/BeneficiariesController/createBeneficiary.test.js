const BeneficiaryController = require('../../../src/controllers/BeneficiariesController')
const FakeBeneficiaryRepository = require('../../repositories/FakeBeneficiaryRepository')

const makeSut = () => {
  const fakeBeneficiaryRepository = new FakeBeneficiaryRepository()
  const beneficiaryController = new BeneficiaryController(fakeBeneficiaryRepository)

  return {
    beneficiaryController
  }
}

const httpRequest = {
  body: {
    name: 'John Doe',
    cpf: '00000000272',
    rg: 'xxxxxxxxx',
    date_of_birth: new Date(),
    type_of_plan: 'Basic',
    number_of_dependents: 0
  }
}

describe('Test create function in BeneficiaryController', () => {
  test('Should return status code 400 if name is not provided', async () => {
    const { beneficiaryController } = makeSut()
    httpRequest.body.name = null
    const httpResponse = await beneficiaryController.create(httpRequest.body)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return status code 400 if cpf is not provided', async () => {
    const { beneficiaryController } = makeSut()
    httpRequest.body.cpf = null
    const httpResponse = await beneficiaryController.create(httpRequest.body)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return status code 400 if rg is not provided', async () => {
    const { beneficiaryController } = makeSut()
    httpRequest.body.rg = null
    const httpResponse = await beneficiaryController.create(httpRequest.body)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return status code 400 if date_of_birth is not provided', async () => {
    const { beneficiaryController } = makeSut()
    httpRequest.body.date_of_birth = null
    const httpResponse = await beneficiaryController.create(httpRequest.body)
    expect(httpResponse.statusCode).toBe(400)
  })
})
