module.exports = {
  badRequest: (err) => {
    return {
      statusCode: 400,
      body: err
    }
  },

  serverError: (err) => {
    return {
      statusCode: 500,
      body: err
    }
  },

  success: (body) => {
    return {
      statusCode: 200,
      body
    }
  },

  create: () => {
    return {
      statusCode: 201
    }
  }
}
