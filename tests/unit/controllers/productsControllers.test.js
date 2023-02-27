const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/product.services');
const productController = require('../../../src/controllers/product.controller');
const { productMock, newProductMock, newProduct, products, id } = require('./mocks/product.controller.mock');


describe('Teste de unidade do productController', function () {
  afterEach(sinon.restore);
  
  it('Listando os produtos', async function () {
    const res = {};
    const req = {};
    const productList = [newProductMock];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getProducts')
      .resolves({ type: null, message: productList });

    await productController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  });

  it('Buscando um produto id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getProductsById')
      .resolves({ type: null, message: newProductMock });

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it('Faz a inserção de um produto', async function () {
    const req = { body: newProduct };
    const res = {};
    const result = [...products, { id: 4, ...newProduct }];
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'insertProduct').resolves({ type: null, message: result });

    await productController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    //expect(res.json).to.have.been.calledWith(result);
  });

  describe('Testa a camada controller para a função "updateById"', function () {
    it('Faz a atualização de um produto pelo id', async function () {
      const req = { params: { id: 2, name: 'testeee' } };
      const res = {name: 'testeee'};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(productService, 'updateById').resolves({ type: null, message: 2 });
    });

    it('Testa fazer a atualização de um produto pelo id sem sucesso', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'updateById').resolves({ type: 404, message: 'Product not found' });

      await productController.updateById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Testa a camada controller para a função "remove"', function () {
    it('Faz a remoção de um produto através do id', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'remove').resolves({ type: null, message: 'Operação realizada com sucesso!' });

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith({ message: 'Operação realizada com sucesso!' });
    });

    it('Tenta a remoção de um produto através de um id que nao existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'remove').resolves({ type: 404, message: 'Product not found' });

      await productController.remove(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });



})


