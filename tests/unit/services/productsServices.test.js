const { expect } = require('chai');
const sinon = require('sinon');

// const connection = require('../../../src/models/connection');
const productService = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');

const productMock = require('./mocks/products.service.mock');

describe('Testes de unidade do service - Products', function () {
  it('Testando - Funcao FindAll(Sucesso)', async function () {
    sinon.stub(productModel, 'findAll').resolves(productMock.resultFindAllModel);

    const result = await productService.findAll();

    expect(result).to.be.deep.equal(productMock.resultFindAll)
  });
  it('Testando - Funcao FindAll(Fracasso)', async function () {
    sinon.stub(productModel, 'findAll').resolves(false);

    const result = await productService.findAll();

    expect(result).to.be.deep.equal(false)
  })

  it('Testando - Funcao FindAllId(Sucesso)', async function () {
    sinon.stub(productModel, 'findAllId').resolves(productMock.resultFindAllIdModel);

    const result = await productService.findAllId(1);

    expect(result).to.be.deep.equal(productMock.resultFindAllId)
  });
  it('Testando - Funcao FindAllId(Fracasso)', async function () {
    sinon.stub(productModel, 'findAllId').resolves(false);

    const result = await productService.findAllId(99);

    expect(result).to.be.deep.equal(false)
  });

  it('Testando - Funcao addProducts(Sucesso)', async function () {
    sinon.stub(productModel, 'addProducts').resolves(4);

    const result = await productService.addProducts({name: "ProdutoX"});

    expect(result).to.be.deep.equal(productMock.createProduct)
  });
  it('Testando - Funcao addProducts(Fracasso)', async function () {
    sinon.stub(productModel, 'addProducts').resolves(false);

    const result = await productService.addProducts();

    expect(result).to.be.deep.equal(false)
  })

  it('Testando - Funcao updateProduct(Sucesso)', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(productMock.resultUpdate);

    const update = {
      id: 1,
      name: "Martelo de Thor"
    }

    const result = await productService.updateProduct(update);

    expect(result).to.be.deep.equal(productMock.resultUpdate)
  });

  it('Testando - Funcao deleteProduct(Sucesso)', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(productMock.resultUpdate);

    const objDelete = {
      id: 1,
    }

    const result = await productService.deleteProduct(objDelete.id);

    expect(result).to.be.deep.equal(productMock.resultUpdate)
  });

  afterEach(sinon.restore)
})