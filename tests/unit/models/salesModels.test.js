const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const salesMock = require('./mocks/sales.model.mock');

describe('Testes de unidade do model - Sales', function () {
  afterEach(sinon.restore)

  it('Testando - Funcao FindAll(Sucesso)', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.findAllMock]);

    const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(salesMock.findAllMock)
  });
  it('Testando - Funcao FindAll(Fracasso)', async function () {
    sinon.stub(connection, 'execute').resolves([false]);

    const result = await  salesModel.findAll();

    expect(result).to.be.deep.equal(false)
  })

  it('Testando - Funcao FindAllId(Sucesso)', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.findAllIdMock]);

    const result = await salesModel.findAllId(1);

    expect(result).to.be.deep.equal(salesMock.findAllIdMock)
  });
  it('Testando - Funcao FindAllId(Fracasso)', async function () {
    sinon.stub(connection, 'execute').resolves([{message: "Product not found"}]);

    const result = await salesModel.findAllId(99);

    expect(result).to.be.deep.equal({message: "Product not found"})
  });

  it('Testando - Funcao IsertSale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await salesModel.insertSale();

    expect(result).to.be.equal(3)
  });

  
  it('Testando - Funcao addSales(Sucesso)', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5}]);
    
    const result = await salesModel.addSales({productId: 3, quantity: 2})

    expect(result).to.be.deep.equal(5)
  });

  it('Testando - Funcao deleteSales(Sucesso)', async function () {
    // sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    const callback = sinon.stub(connection, 'execute');
    callback.onCall(0).returns();
    callback.onCall(1).returns([salesMock.resultDelete]);
  
  const result = await salesModel.deleteSales(1)

  expect(result).to.be.deep.equal(salesMock.resultDelete)
  });
  
  it('Testando - Funcao updateSales(Sucesso)', async function () {
     
    const updateArray =
      [
        {
          "productId": 2,
          "quantity": 10
        },
        {
          "productId": 1,
          "quantity": 50
        }
      ]
    
    sinon.stub(connection, 'execute').resolves([salesMock.resultUpdate]);
    
    const { productId, quantity } = updateArray[0];
    const result = await salesModel.updateSales(productId, quantity);

    expect(result).to.be.deep.equal(salesMock.resultUpdate)
  });

  afterEach(sinon.restore)
})