const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.services');
const salesModel = require('../../../src/models/sales.models');
const { allSales } = require('./mocks/sales.service.mock');

describe('Verificando service de vendas', function () {
  describe('listagem de vendas', function () {
    it('retorna a lista completa de vendas', async function () {
      sinon.stub(salesModel, 'getAll').resolves(allSales);

      const result = await salesService.getSales();

      expect(result.message).to.deep.equal(allSales);
    });
  });

  describe('busca de uma venda por id', function () {
    it('retorna um erro caso a venda não exista', async function () {
      sinon.stub(salesModel, 'getById').resolves([]);

      const result = await salesService.getSalesById(1);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('retorna a venda caso ID existente', async function () {
      sinon.stub(salesModel, 'getById').resolves([allSales[0]]);

      const result = await salesService.getSalesById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([allSales[0]]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
})

