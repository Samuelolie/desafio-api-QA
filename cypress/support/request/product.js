Cypress.Commands.add("searchProductRequest", (baseUrl, headers, query) => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}produtos`,
    qs: query,
    headers: headers,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("registerProductRequest", (baseUrl, headers, body) => {
  cy.request({
    method: "POST",
    url: `${baseUrl}produtos`,
    headers: headers,
    body: body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteProductRequest", (baseUrl, headers, param) => {
  cy.request({
    method: "DELETE",
    url: `${baseUrl}produtos/${param}`,
    headers: headers,
    failOnStatusCode: false,
  });
});
