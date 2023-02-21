const resultFindAllModel =
  [
    {
      id: 1,
      name: "Martelo de Thor"
    },
    {
      id: 2,
      name: "Traje de encolhimento"
    },
    {
      id: 3,
      name: "Escudo do Capitão América"
    }
  ]

const resultFindAllIdModel =
  [
    {
      id: 1,
      name: "Martelo de Thor"
    }
  ]

const resultFindAll =
  {
    type: null,
    message: resultFindAllModel
  }
  

  const resultFindAllId =
  {
    type: null,
    message: resultFindAllIdModel
  }

  const createProduct = 
  {
    type: null,
    message:4 
  }

  const resultUpdate = 
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  }

module.exports = { resultFindAll, resultFindAllId, createProduct, resultFindAllModel, resultFindAllIdModel, resultUpdate }