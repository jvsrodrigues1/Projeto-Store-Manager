const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services/product.services');
const productModel = require('../../../src/models/product.models');
const { allProducts, newProduct, id } = require('./mocks/product.service.mock');

describe('Verificando service de produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'getAll').resolves(allProducts);

      const result = await productService.getProducts();

      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('busca de uma pessoa passageira', function () {
    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productModel, 'getById').resolves([undefined]);

      const result = await productService.getProductsById(1);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productModel, 'getById').resolves([allProducts[0]]);

      const result = await productService.getProductsById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

  it('Faz a inserção de um produto', async function () {
    const result = { type: null, message: allProducts }

    sinon.stub(productModel, 'insertProduct').resolves(undefined);
    sinon.stub(productModel, 'getAll').resolves(allProducts);

    const response = await productService.insertProduct([newProduct]);

    expect(response).to.be.deep.equal(result);
  });

  describe('Testa a camada service para a função "updateById"', async function () {
    it('Faz a atualização de um produto pelo id', async function () {
      const result = { type: null, message: id };

      sinon.stub(productModel, 'getById').resolves([newProduct]);
      sinon.stub(productModel, 'updateById').resolves(undefined);

      const responde = await productService.updateById(id, newProduct);

      expect(responde).to.be.deep.equal(result);
    });

    it('Tenta realizar a atualização de um produto com um id que não existe', async function () {
      const result = { type: 404, message: 'Product not found' };

      sinon.stub(productModel, 'getById').resolves([]);

      const responde = await productService.updateById(id, newProduct);

      expect(responde).to.be.deep.equal(result);
    });
  });

  describe('Testa a camada service para a função "remove"', function () {
    it('Faz a remoção de um produto pelo id', async function () {
      const result = { type: null, message: 'Operação realizada com sucesso!' };

      sinon.stub(productModel, 'getById').resolves([newProduct]);
      sinon.stub(productModel, 'remove').resolves(undefined);

      const response = await productService.remove(id);

      expect(response).to.be.deep.equal(result);
    });

    it('Tenta fazer a remoção de um produto com um id que não existe', async function () {
      const result = { type: 404, message: 'Product not found' };

      sinon.stub(productModel, 'getById').resolves([]);

      const response = await productService.remove(999);

      expect(response).to.be.deep.equal(result);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
})



