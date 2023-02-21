const findAllMockModel =
  [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2
    }
  ]

  const findAllIdMockModel =
  [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2
    }
  ]

const findAllMock = {
  type: null,
  message: findAllMockModel,
}

const findAllIdMock = {
  type: null,
  message: findAllIdMockModel,
}

const addSaleMock = {
  type: 201,
  message: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1
      },
      {
        productId: 2,
        quantity: 5
      }
    ]
  }
}

module.exports = { findAllMock, findAllIdMock, addSaleMock, findAllIdMockModel, findAllMockModel }