export const verifyResponse = (response, statusCode, message) => {
  const res = JSON.parse(response.body)
  expect(res).to.have.property('responseCode', statusCode)
  if (message) {
    expect(res).to.have.property('message', message)
  }
}

export const getRandomProduct = (products) => {
  return products[Math.floor(Math.random() * products.length)]
}
