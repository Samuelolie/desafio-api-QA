Cypress.Commands.add("searchUserRequest", (baseUrl, headers, param) => {
  cy.request({
    method: "GET",
    url: `${baseUrl}/usuarios/?${param}`,
    headers: headers,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("registerUserRequest", (baseUrl, headers, body) => {
  cy.request({
    method: "POST",
    url: `${baseUrl}/usuarios/`,
    headers: headers,
    body: body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteUserRequest", (baseUrl, headers, param) => {
  cy.request({
    method: "DELETE",
    url: `${baseUrl}/usuarios/${param}`,
    headers: headers,
    failOnStatusCode: false,
  });
});
