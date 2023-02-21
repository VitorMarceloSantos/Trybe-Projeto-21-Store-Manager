const resultFindAll =
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

  const resultFindAllId =
  [
    {
      id: 1,
      name: "Martelo de Thor"
    }
  ]
  
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
  
const resultSearch =
  [
    { id: 1, name: 'Martelo de Thor' }
  ]
  
module.exports = { resultFindAll, resultFindAllId, resultUpdate, resultSearch }