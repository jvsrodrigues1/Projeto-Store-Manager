const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { saleMock, newSaleMock } = require('./mocks/sales.controller.mock');


describe('Teste de unidade do saleController', function () {
  it('Listando as vendas', async function () {
    const res = {};
    const req = {};
    const saleList = [newSaleMock];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSales')
      .resolves({ type: null, message: saleList });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleList);
  });

  it('Buscando uma venda', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSalesById')
      .resolves({ type: null, message: newSaleMock });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newSaleMock);
  });


})
