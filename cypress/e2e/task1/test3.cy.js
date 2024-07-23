describe('Cannot login with incorrect credentials', () => {
    it('Verify that the user cannot log in with incorrect credentials', () => {
      // Go to https://www.saucedemo.com/
      cy.visit('https://www.saucedemo.com/');
      
      // Assert that the landing page is correct
      cy.url().should('eq', 'https://www.saucedemo.com/'); // Verify that the URL is correct
      cy.get('[data-test="login-button"]').should('exist'); // Verify that the login button is present
  
      // Perform login with incorrect credentials
      cy.get('[data-test="username"]').clear().type('incorrect_username'); // Enter an incorrect username
      cy.get('[data-test="password"]').clear().type('incorrect_password'); // Enter an incorrect password
      cy.get('[data-test="login-button"]').click(); // Click the login button
  
      // Verify that the error message is displayed correctly
      cy.get('[data-test="error"]').should('be.visible') // Ensure the error element is visible
        .and('have.text', 'Epic sadface: Username and password do not match any user in this service'); // Verify the error message text
    });
  });
  