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

describe('Test update function in BeneficiaryController', () => {
  test('Should return 400 if invalid cpf is provided', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    httpRequest.body.cpf = 'invalid_cpf'
    const httpReponse = await beneficiaryController.update(beneficiary._id, httpRequest.body)
    expect(httpReponse.statusCode).toBe(400)
  })

  test('Should return 400 if invalid date_of_birth is provided', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    httpRequest.body.date_of_birth = 'invalid_date_of_birth'
    const httpReponse = await beneficiaryController.update(beneficiary._id, httpRequest.body)
    expect(httpReponse.statusCode).toBe(400)
  })

  test('Should return 400 if invalid type_of_plan is provided', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    httpRequest.body.type_of_plan = 'invalid_type_of_plan'
    const httpReponse = await beneficiaryController.update(beneficiary._id, httpRequest.body)
    expect(httpReponse.statusCode).toBe(400)
  })

  test('Should return 500 if update repository throws', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    jest.spyOn(fakeBeneficiaryRepository, 'update').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    const httpReponse = await beneficiaryController.update(beneficiary._id, httpRequest.body)
    expect(httpReponse.statusCode).toBe(500)
  })

  test('Should be able update beneficiary', async () => {
    const { beneficiaryController, fakeBeneficiaryRepository } = makeSut()
    const httpRequest = makeHttpRequest()
    await beneficiaryController.create(httpRequest.body)
    const beneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    httpRequest.body.name = 'new John doe'
    await beneficiaryController.update(beneficiary._id, httpRequest.body)
    const newBeneficiary = await fakeBeneficiaryRepository.findByCpf(httpRequest.body.cpf)
    expect(newBeneficiary.name).toBe('new John doe')
  })
})
