const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/product.models');

const connection = require('../../../src/models/database/connection');
const { products, newProduct, id } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productModel.getAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productModel.getById(1);
    expect(result).to.be.deep.equal([products[0]]);
  });

  it('Faz o cadastro de um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves();

    const response = await productModel.insertProduct(newProduct);
    expect(response).to.be.equal(undefined);
  });

  it('Faz a atualização de um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();

    const response = await productModel.updateById(id, newProduct);
    expect(response).to.be.equal(undefined);
  });

  it('Faz a remoção de um produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const response = await productModel.remove(id);

    expect(response).to.be.equal(undefined);
  });

  
  
});


