Cypress.Commands.add("searchCartRequest", (baseUrl, headers, query) => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/carrinhos`,
    qs: query,
    headers: headers,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("registerCartRequest", (baseUrl, headers, body) => {
  cy.request({
    method: "POST",
    url: `${baseUrl}/carrinhos`,
    headers: headers,
    body: body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteCartRequest", (baseUrl, headers) => {
  cy.request({
    method: "DELETE",
    url: `${baseUrl}/carrinhos/concluir-compra`,
    headers: headers,
    failOnStatusCode: false,
  });
});
