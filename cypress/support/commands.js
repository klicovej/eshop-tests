// Environment variables
const appUrl = Cypress.env("appUrl");

Cypress.Commands.add("loginByApi", (user) => {
  // Getting user credentials
  const username = user.username;
  const password = user.password;
  // Here would be implementation of getting [token] and setting it to the [localStorage/cookies] for user
  // ...
  // ...

  // After [token] is set, it'll [baseUrl]
  cy.visit(appUrl);
});

Cypress.Commands.add("manualLogin", (username, password) => {
  cy.visit(`${appUrl}/login`);

  cy.get("[data-cy=userNameInput").should("be.visible").type(username);
  cy.get("[data-cy=passwordInput]").should("be.visible").type(password);

  cy.get("[data-cy=loginButton").should("be.visible").click();
});
