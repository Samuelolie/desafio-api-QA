import productFixture from "../../fixtures/bodyProductRegister.json";
import loginFixture from "../../fixtures/bodyLogin.json";
import { faker } from "@faker-js/faker";
describe("Produtos", () => {
  let baseUrl;
  let bodyRegister;
  let token;
  let header;
  beforeEach(() => {
    baseUrl = "https://serverest.dev/";
  });

  it("Busca produto cadastrados", () => {
    cy.searchProductRequest(baseUrl, null, "").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.exist;
      expect(response.body.produtos).to.exist;
      expect(response.body.produtos).to.be.an("array");
      expect(response.body.produtos.length).to.be.greaterThan(0);
    });
  });

  it("Filtra produto cadastrado", () => {
    bodyRegister = { ...productFixture };
    bodyRegister.preco = faker.number.int({ min: 1, max: 500 });
    bodyRegister.quantidade = faker.number.int({ min: 1, max: 100 });
    bodyRegister.nome = faker.person.firstName();
    bodyRegister.descricao = faker.lorem.word(5);
    cy.loginRequest(baseUrl, null, loginFixture).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");
      expect(response.body.authorization).to.contain("Bearer");
      token = response.body.authorization;
      header = {
        authorization: token,
      };
      cy.registerProductRequest(baseUrl, header, bodyRegister).then(
        (register) => {
          expect(register.status).to.eq(201);
          expect(register.body.message).to.eq("Cadastro realizado com sucesso");
          cy.searchProductRequest(baseUrl, null, {
            _id: register.body._id,
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.produtos[0].quantidade).to.eq(
              bodyRegister.quantidade
            );
            expect(response.body.produtos[0].descricao).to.eq(
              bodyRegister.descricao
            );
            expect(response.body.produtos[0].preco).to.eq(bodyRegister.preco);
            expect(response.body.produtos[0].nome).to.eq(bodyRegister.nome);
          });
        }
      );
    });
  });

  it("Filtra produto inválido", () => {
    cy.searchProductRequest(baseUrl, null, { nome: "INVALIDO" }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.quantidade).to.eq(0);
      }
    );
  });

  it("Deleta produto cadastrado", () => {
    bodyRegister = { ...productFixture };
    bodyRegister.preco = faker.number.int({ min: 1, max: 500 });
    bodyRegister.quantidade = faker.number.int({ min: 1, max: 100 });
    bodyRegister.nome = faker.person.firstName();
    bodyRegister.descricao = faker.lorem.word(5);
    cy.loginRequest(baseUrl, null, loginFixture).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");
      expect(response.body.authorization).to.contain("Bearer");
      token = response.body.authorization;
      header = {
        authorization: token,
      };
      cy.registerProductRequest(baseUrl, header, bodyRegister).then(
        (register) => {
          expect(register.status).to.eq(201);
          expect(register.body.message).to.eq("Cadastro realizado com sucesso");
          cy.searchProductRequest(baseUrl, null, {
            _id: register.body._id,
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.produtos[0].quantidade).to.eq(
              bodyRegister.quantidade
            );
            expect(response.body.produtos[0].descricao).to.eq(
              bodyRegister.descricao
            );
            expect(response.body.produtos[0].preco).to.eq(bodyRegister.preco);
            expect(response.body.produtos[0].nome).to.eq(bodyRegister.nome);
            cy.deleteProductRequest(baseUrl, header, register.body._id).then(
              (response) => {
                expect(response.body.message).to.eq(
                  "Registro excluído com sucesso"
                );
              }
            );
          });
        }
      );
    });
  });
});
