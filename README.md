# Sobre o Projeto
API Rest de listagem de beneficiários,
com alguns dados básicos:
 * Nome;
 * CPF;
 * RG;
 * Data de Nascimento;
 * Tipo de Plano (Basic, Standard ou Premium);
 *  Número de dependentes (este campo pode ser vazio ou não);

# Como rodar?
  ### Para rodar sem o docker (Necessita do mongodb rodando na porta 27017) execute o comando: </br></br>
  <blockquote>
    <code>npm run start</code>
    </br> ou </br>
    <code>yarn start</code>
  </blockquote>
  </br>

  ### Para rodar a API através do Docker: </br></br>
  <blockquote>
    <code>npm run up</code> (para iniciar o servidor)
    </br> ou </br>
    <code>yarn up</code> (para iniciar o servidor) </br>
  </blockquote>
  </br>

  ### Para pausar a API através do docker: </br></br>
  <blockquote>
    <code>npm run down</code> (para pausar o servidor)
    </br> ou </br>
    <code>yarn down</code> (para pausar o servidor) </br>
  </blockquote>
  </br>

# Rotas
## Criar beneficiário </br></br>

<blockquote>
  <strong>Método:</strong> POST </br>
  <strong>URL:</strong> http://localhost:3000/beneficiaries </br>
  <strong>Body (JSON):</strong> </br> </br>

  ```yaml
    {
      "name": "John Doe",
      "cpf": "00000000272",
      "rg": "559297026",
      "date_of_birth": "2001-04-05T20:08:41.580Z",
      "type_of_plan": "Basic",
      "number_of_dependents": 3
    }
  ```
</blockquote>
</br>

## Listar todos beneficiários: </br></br>

<blockquote>
  <strong>Método:</strong> GET </br>
  <strong>URL:</strong> http://localhost:3000/beneficiaries </br>

  <strong>Resposta (JSON):</strong> </br></br>

  ```yaml
    [
      {
        "number_of_dependents": 3,
        "_id": "6106b2534a96943194bba8d5",
        "name": "John Doe",
        "cpf": "00000000272",
        "rg": "559297026",
        "date_of_birth": "2001-04-05T20:08:41.580Z",
        "type_of_plan": "Basic",
        "updatedAt": "2021-08-01T14:40:19.193Z",
        "createdAt": "2021-08-01T14:40:19.193Z",
        "__v": 0
      }
    ]
  ```
</blockquote>
</br>

## Listar um único beneficiário: </br></br>

<blockquote>
  <strong>Método:</strong> GET </br>
  <strong>URL:</strong> http://localhost:3000/beneficiaries/:id </br>
  <strong>Resposta (JSON):</strong> </br></br>

  ```yaml
    {
        "number_of_dependents": 3,
        "_id": "6106b2534a96943194bba8d5",
        "name": "John Doe",
        "cpf": "00000000272",
        "rg": "559297026",
        "date_of_birth": "2001-04-05T20:08:41.580Z",
        "type_of_plan": "Basic",
        "updatedAt": "2021-08-01T14:40:19.193Z",
        "createdAt": "2021-08-01T14:40:19.193Z",
        "__v": 0
    }
  ```
</blockquote>
</br>

## Alterar um beneficiário: </br></br>

<blockquote>
  <strong>Método:</strong> PUT </br>
  <strong>URL:</strong> http://localhost:3000/beneficiaries/:id </br>
  <strong>Body (JSON):</strong> </br> </br>

  ```yaml
    {
      "name": "John Doe 2"
    }
  ```
</blockquote>
</br>

## Deletar um beneficiário </br></br>

<blockquote>
 <strong>Método:</strong> DELETE </br>
  <strong>URL:</strong> http://localhost:3000/beneficiaries/:id
</blockquote>
</br>

# Testes

### Para rodar os testes do projeto, execute o comando: </br> </br>
<blockquote>
  <code>npm run test</code>
  </br> ou </br>
  <code>yarn test</code>
</blockquote>
