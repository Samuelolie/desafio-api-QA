import loginFixture from "../../fixtures/bodyLogin.json";
describe("Login", () => {
  let baseUrl;
  beforeEach(() => {
    baseUrl = Cypress.env("baseUrl");
  });

  it("Login com sucesso", () => {
    cy.loginRequest(baseUrl, null, loginFixture).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Login realizado com sucesso");
      expect(response.body.authorization).to.contain("Bearer");
    });
  });

  it("Login com email incorreto", () => {
    let bodyIncorreto = { ...loginFixture };
    bodyIncorreto.email = "fulanoqa.com";
    cy.loginRequest(baseUrl, null, bodyIncorreto).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.eq("email deve ser um email válido");
    });
  });

  it("Login com senha incorreta", () => {
    let bodyIncorreto = { ...loginFixture };
    bodyIncorreto.password = "";
    cy.loginRequest(baseUrl, null, bodyIncorreto).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.password).to.eq("password não pode ficar em branco");
    });
  });

  it("Login com credenciais inválidas", () => {
    let bodyIncorreto = { ...loginFixture };
    bodyIncorreto.password = "r";
    cy.loginRequest(baseUrl, null, bodyIncorreto).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq("Email e/ou senha inválidos");
    });
  });
});
