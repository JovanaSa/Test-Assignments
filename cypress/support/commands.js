Cypress.Commands.add('loginAndVerify', (username, password) => {
    cy.visit('https://www.saucedemo.com/');
    
    // Assert that the landing page is correct
    cy.url().should('eq', 'https://www.saucedemo.com/'); // Verify that the URL is correct
    cy.get('[data-test="login-button"]').should('exist'); // Verify that the login button is present
  
    // Perform login
    cy.get('[data-test="username"]').clear().type(username); // Clear and type the username
    cy.get('[data-test="password"]').clear().type(password); // Clear and type the password
    cy.get('[data-test="login-button"]').click(); // Click the login button
  
    // Assert that the user is redirected correctly after login
    cy.url().should('include', '/inventory.html'); // Verify that the URL includes '/inventory.html'
    cy.get('.title').should('have.text', 'Products'); // Verify that the page title is 'Products'
  });

Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
    // Assert that the page title is 'Checkout: Your Information'
    cy.get('.title').should('have.text', 'Checkout: Your Information');
    
    // Fill out the checkout form
    cy.get('[data-test="firstName"]').clear().type(firstName); // Clear and type the first name
    cy.get('[data-test="lastName"]').clear().type(lastName); // Clear and type the last name
    cy.get('[data-test="postalCode"]').clear().type(postalCode); // Clear and type the postal code
    
    // Click on the continue button
    cy.get('[data-test="continue"]').click(); // Click the continue button
    
    // Assert that the page title is 'Checkout: Overview'
    cy.get('.title').should('have.text', 'Checkout: Overview'); // Verify that the page title is 'Checkout: Overview'
    
    // Complete the order
    cy.get('[data-test="finish"]').click(); // Click the finish button to complete the order
  });