module.exports = {
  httpResponse: (statusCode = 500, body) => {
    return {
      statusCode,
      body
    }
  }
}
