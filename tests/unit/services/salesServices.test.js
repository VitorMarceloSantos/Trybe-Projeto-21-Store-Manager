const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const saleService = require('../../../src/services/sales.service');
const saleModel = require('../../../src/models/sales.model');

const salesMock = require('./mocks/sale.service.mock');
const salesMockModel = require('../models/mocks/sales.model.mock');
const verifyQuantity = require('../../../src/middlewares/services/verifyQuantity');

describe('Testes de unidade do service - Sales', function () {
  it('Testando - Funcao FindAll(Sucesso)', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesMock.findAllMockModel);

    const result = await saleService.findAll();

    expect(result).to.be.deep.equal(salesMock.findAllMock)
  });
  it('Testando - Funcao FindAll(Fracasso)', async function () {
    sinon.stub(saleModel, 'findAll').resolves(false);

    const result = await saleService.findAll();

    expect(result).to.be.deep.equal(false)
  })

  it('Testando - Funcao FindAllId(Sucesso)', async function () {
    sinon.stub(saleModel, 'findAllId').resolves(salesMock.findAllIdMockModel);

    const result = await saleService.findAllId(1);

    expect(result).to.be.deep.equal(salesMock.findAllIdMock)
  });
  it('Testando - Funcao FindAllId(Fracasso)', async function () {
    sinon.stub(saleModel, 'findAll').resolves(false);

    const result = await saleService.findAllId(99);

    expect(result).to.be.deep.equal(false)
  });

  it('Testando - Funcao addSales(Sucesso)', async function () {

    const addSaleInput = [
      {
        productId: 1,
        quantity: 1
      },
      {
        productId: 2,
        quantity: 5
      }
    ]
    sinon.stub(verifyQuantity, 'verifyQuantity').resolves(true);
    sinon.stub(saleModel, 'insertSale').resolves(3);
    sinon.stub(saleModel, 'addSales').resolves(3);
   
    // const callback = sinon.stub();
    //     callback.onCall(0).returns(1);
    //     callback.onCall(1).returns(2);

    const result = await saleService.addSales(addSaleInput);

    expect(result).to.be.deep.equal(salesMock.addSaleMock)
  });
  it('Testando - Funcao addSales(Fracasso)', async function () {
    sinon.stub(saleService, 'addSales').resolves(true);

    const result = await saleService.addSales([{ productId: 99, quantity: 5 }]);

    expect(result).to.be.deep.equal(true)
  });

  it('Testando - Funcao deleteSales(Sucesso)', async function () {
    sinon.stub(saleModel, 'deleteSales').resolves(salesMockModel.resultDelete);

    const result = await saleService.deleteSales(1);

    expect(result).to.be.deep.equal(salesMockModel.resultDelete)
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
    const id = 1;

    sinon.stub(saleModel, 'updateSales').resolves(saleModel.updateSales);

    const result = await saleService.updateSales(id, updateArray);

    expect(result).to.be.deep.equal({ type: null, message: { saleId: id, itemsUpdated: updateArray }})
  });


  afterEach(sinon.restore)

});