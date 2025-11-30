Cypress.Commands.add("loginRequest", (baseUrl, headers, body) => {
  cy.request({
    method: "POST",
    url: baseUrl + "login",
    headers: headers,
    body: body,
    failOnStatusCode: false,
  });
});
