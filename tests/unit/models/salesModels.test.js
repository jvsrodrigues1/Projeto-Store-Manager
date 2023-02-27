const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');

const connection = require('../../../src/models/db/connection');
const { sales } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de vendas', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.getAll();
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[sales[0]]]);
    const result = await salesModel.getById(1);
    expect(result).to.be.deep.equal([sales[0]]);
  });

  it('Faz a atualização de uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();

    const response = await salesModel.updateById(); //linha incompleta, falta implementar funcao
    // expect(response).to.be.equal(undefined); 
  });

  it('Faz a remoção de uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);

    const response = await salesModel.remove(); //linha incompleta, falta implementar funcao

    // expect(response).to.be.equal(undefined);
  });
});
