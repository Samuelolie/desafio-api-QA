import productFixture from "../../fixtures/bodyProductRegister.json";
import loginFixture from "../../fixtures/bodyLogin.json";
import cartFixture from "../../fixtures/bodyCart.json";
import { faker } from "@faker-js/faker";
describe("Produtos", () => {
  let baseUrl;
  let bodyRegisterProduct;
  let bodyRegisterCart;
  let idProduct;
  let token;
  let header;
  beforeEach(() => {
    baseUrl = Cypress.env("baseUrl");
    cy.loginRequest(baseUrl, null, loginFixture).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");
      expect(response.body.authorization).to.contain("Bearer");
      token = response.body.authorization;
      header = {
        authorization: token,
      };
      cy.deleteCartRequest(baseUrl, header);
    });
  });
  it("Filtra carrinho cadastrado", () => {
    bodyRegisterProduct = { ...productFixture };
    bodyRegisterProduct.preco = faker.number.int({ min: 1, max: 500 });
    bodyRegisterProduct.quantidade = faker.number.int({ min: 1, max: 100 });
    bodyRegisterProduct.nome = faker.person.firstName();
    bodyRegisterProduct.descricao = faker.lorem.word(5);
    cy.registerProductRequest(baseUrl, header, bodyRegisterProduct).then(
      (register) => {
        expect(register.status).to.eq(201);
        expect(register.body.message).to.eq("Cadastro realizado com sucesso");
        idProduct = register.body._id;
        bodyRegisterCart = { ...cartFixture };
        bodyRegisterCart.produtos[0].idProduto = idProduct;
        cy.registerCartRequest(baseUrl, header, bodyRegisterCart).then(
          (response) => {
            expect(response.status).to.eq(201);
            expect(register.body.message).to.eq(
              "Cadastro realizado com sucesso"
            );
          }
        );
      }
    );
  });

  it("Filtra carrinho inválido", () => {
    cy.searchCartRequest(baseUrl, null, { _id: "INVALIDO" }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.quantidade).to.eq(0);
      }
    );
  });
});
