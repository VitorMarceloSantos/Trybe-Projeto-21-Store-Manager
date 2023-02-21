const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

// const connection = require('../../../src/models/connection');
const productController = require('../../../src/controllers/product.controller');
const productService = require('../../../src/services/product.service');
// const nameValidation = require('../middlewares/controller/nameValidation');

const productMockController = require('./mocks/products.controller.mock');
const productMockService = require('../services/mocks/products.service.mock');

describe('Testes de unidade do controller - Products', function () {
  it('Testando - Funcao listProduct(Sucesso)', async function () {
    sinon.stub(productService, 'findAll').resolves(productMockService.resultFindAll);

    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMockController.resultFindAll);
  });
  it('Testando - Funcao listProduct(Fracasso)', async function () {
    sinon.stub(productService, 'findAll').resolves(false);

    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  })

    it('Testando - Funcao listProductId(Sucesso)', async function () {
    sinon.stub(productService, 'findAllId').resolves(productMockService.resultFindAllId);

    const res = {};
    const req = { params: { id: 1 } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.listProductsId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productMockController.resultFindAllId);
  });
  it('Testando - Funcao listProduct(Fracasso)', async function () {
   sinon.stub(productService, 'findAllId').resolves(false);

    const res = {};
    const req = { params: { id: 99 } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.listProductsId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testando - Funcao addProducts(Sucesso)', async function () {
    sinon.stub(productService, 'addProducts').resolves({type: null, message: 4});

    const res = {};
    const req = { body: {name: "ProdutoX"}};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.addProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMockController.addProducts);
  });
  it('Testando - Funcao addProducts(Fracasso)', async function () {
   sinon.stub(productService, 'addProducts').resolves(false);

    const res = {};
    const req = {body: {name: "ProdutoX"}};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.addProducts(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Product not created' });
  });
  it('Testando - Funcao addProducts(Validacao do Nome)', async function () {
    const nameValidation = require('../../../src/middlewares/controller/nameValidation');
    const objName = {nameValidation} // transformando em objeto

    sinon.stub(objName, 'nameValidation').resolves(true);

    const res = {};
    const req = { body: {name: ""}};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.addProducts(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith( {message: '"name" is required'});
  });

  it('Testando - Funcao updateProduts(Sucesso)', async function () {
    sinon.stub(productService, 'updateProduct').resolves(productMockService.resultUpdate);
    // sinon.stub(nameValidation, 'nameValidation').resolves(false);
    sinon.stub(productService, 'findAllId').resolves(true);

    const update = {
      id: 1,
      name: "Martelo de Thor"
    }

    const res = {};
    const req = { params: { id: update.id }, body: { name: update.name } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(update);
  });

   it('Testando - Funcao deleteProduts(Sucesso)', async function () {
    sinon.stub(productService, 'deleteProduct').resolves(productMockService.resultUpdate);
    // sinon.stub(nameValidation, 'nameValidation').resolves(false);
    sinon.stub(productService, 'findAllId').resolves(true);

    const objDelete = {
      id: 1
    }

    const res = {};
    const req = { params: { id: objDelete.id } };
    
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);

  });

  afterEach(sinon.restore)
})