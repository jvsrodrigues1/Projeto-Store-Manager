const productMock = { "id": 1, "name": "Martelo de Thor" }

const newProductMock = { id: 1, ...productMock };

const products = [
  { "id": 1, "name": "Martelo de Thor" },
  { "id": 2, "name": "Traje de encolhimento" },
  { "id": 3, "name": "Escudo do Capitão América" },
]

const newProduct = {
  "name": "ProdutoX"
}

const id = 1;

module.exports = {
  productMock,
  newProductMock,
  products,
  newProduct,
  id,
};