const validator = require('cpf-cnpj-validator')

module.exports = (cpf) => {
  return validator.cpf.isValid(cpf)
}
