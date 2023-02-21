const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

// const connection = require('../../../src/models/connection');
const saleController = require('../../../src/controllers/sales.controller');
const saleService = require('../../../src/services/sales.service');
const validation = require('../../../src/middlewares/controller/saleValidation');

const saleMockController = require('./mocks/sales.controller.mock');
const saleMockService = require('../services/mocks/sale.service.mock');
const saleMockModel = require('../models/mocks/sales.model.mock');

describe('Testes de unidade do controller - Sales', function () {
  it('Testando - Funcao listSale(Sucesso)', async function () {
    sinon.stub(saleService, 'findAll').resolves(saleMockService.findAllMock);

    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMockController.findAllMock);
  });
  it('Testando - Funcao listSale(Fracasso)', async function () {
    sinon.stub(saleService, 'findAll').resolves(false);

    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  })

    it('Testando - Funcao listSaleId(Sucesso)', async function () {
    sinon.stub(saleService, 'findAllId').resolves(saleMockService.findAllIdMock);

    const res = {};
    const req = { params: { id: 1 } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.listSalesId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMockController.findAllIdMock);
  });
  it('Testando - Funcao listSale(Fracasso)', async function () {
   sinon.stub(saleService, 'findAllId').resolves(false);

    const res = {};
    const req = { params: { id: 99 } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

   await saleController.listSalesId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testando - Funcao addSale(Sucesso)', async function () {
    sinon.stub(saleService, 'addSales').resolves(saleMockService.addSaleMock);

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

    const res = {};
    const req = { body: addSaleInput };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.addSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleMockController.addSaleMock);
  });
  it('Testando - Funcao addSale(Fracasso)', async function () {
    sinon.stub(saleService, 'addSales').resolves(false);
    
    const addSaleInput = [
      {
        productId: 1
        // faltando quantidade
      },
      {
        productId: 2,
        quantity: 5
      }
    ]

    const res = {};
    const req = { body: addSaleInput };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.addSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: "\"quantity\" is required"});
  });

  it('Testando - Funcao deleteSale(Sucesso)', async function () {
    sinon.stub(saleService, 'findAllId').resolves(true);
    sinon.stub(saleService, 'deleteSales').resolves(saleMockModel.resultDelete);
    
    const res = {};
    const req = { params: { id: 1 } };
    
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await saleController.deleteSales(req, res);

    expect(res.status).to.have.been.calledWith(204);
   
  });

  it('Testando - Funcao updateSale(Sucesso)', async function () {
    sinon.stub(saleService, 'findAllId').resolves(true);
    sinon.stub(validation, 'saleValidation').resolves(false);
    sinon.stub(validation, 'productIdVerification').resolves(true);
    sinon.stub(saleService, 'updateSales').resolves(saleMockController.resultUpdate);
    
    const sale =
      [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 50
        }
      ]

    const res = {};
    const req = { params: { id: 1 }, body: sale };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await saleController.updateSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleMockController.resultUpdate.message);
   
  });

  afterEach(sinon.restore)
})