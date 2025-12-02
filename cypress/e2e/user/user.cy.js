import userFixture from "../../fixtures/bodyUserRegister.json";
import { faker } from "@faker-js/faker";
describe("Usuários", () => {
  let baseUrl;
  let bodyRegister;
  beforeEach(() => {
    baseUrl = "https://serverest.dev/";
  });

  it("Busca usuários cadastrados", () => {
    cy.searchUserRequest(baseUrl, null, "").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.exist;
      expect(response.body.usuarios).to.exist;
      expect(response.body.usuarios).to.be.an("array");
      expect(response.body.usuarios.length).to.be.greaterThan(0);
    });
  });

  it("Filtra usuário cadastrado", () => {
    bodyRegister = { ...userFixture };
    bodyRegister.email = faker.internet.email();
    bodyRegister.nome = faker.person.firstName();
    cy.registerUserRequest(baseUrl, null, bodyRegister).then((register) => {
      expect(register.status).to.eq(201);
      expect(register.body.message).to.eq("Cadastro realizado com sucesso");
      cy.searchUserRequest(baseUrl, null, `nome=${bodyRegister.nome}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.quantidade).to.eq(1);
          expect(response.body.usuarios[0].email).to.eq(bodyRegister.email);
          expect(response.body.usuarios[0].password).to.eq(
            bodyRegister.password
          );
        }
      );
    });
  });

  it("Filtra usuário inválido", () => {
    cy.searchUserRequest(baseUrl, null, "nome=INVALIDO").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.eq(0);
    });
  });

  it("Deleta usuário cadastrado", () => {
    bodyRegister = { ...userFixture };
    let idRegister;
    bodyRegister.email = faker.internet.email();
    bodyRegister.nome = faker.person.firstName();
    cy.registerUserRequest(baseUrl, null, bodyRegister).then((register) => {
      idRegister = register.body._id;
      cy.deleteUserRequest(baseUrl, null, idRegister).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Registro excluído com sucesso");
      });
    });
  });
});
