describe('An order can be completed', () => {
  beforeEach(() => {
    // Command to login and verify the landing page
    cy.loginAndVerify('standard_user', 'secret_sauce');
  });

  it('Completing the order', () => {
    // Add an item from the list to the cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('exist').click();
    
    // Verify that the cart badge is updated correctly
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Open another item’s details page 
    cy.get('[data-test="item-0-title-link"] > [data-test="inventory-item-name"]').click(); 

    // Verify that the URL and item name match "Sauce Labs Bike Light"
    cy.url().should('include', '/inventory-item.html?id=0');
    cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Bike Light'); 

    // Add the item to the cart
    cy.get('[data-test="add-to-cart"]').should('exist').click();
  
    // Open the cart
    cy.get('[data-test="shopping-cart-link"]').should('exist').click();

    // Assert that the page title is 'Your Cart'
    cy.get('.title').should('have.text', 'Your Cart');

    // Verify that the correct items are present (2 different items)
    cy.get('.cart_item').should('have.length', 2); // Ensure there are 2 items in the cart
    cy.get('.shopping_cart_badge').should('have.text', '2'); // Verify the cart badge shows 2 items
    cy.get('.cart_item').contains('Sauce Labs Backpack').should('exist'); // Verify "Sauce Labs Backpack" is in the cart
    cy.get('.cart_item').contains('Sauce Labs Bike Light').should('exist'); // Verify "Sauce Labs Bike Light" is in the cart

    // Remove the first item from the cart
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('exist').click();

    // Verify that the correct item is present (only 1 item left)
    cy.get('.cart_item').should('have.length', 1); // Ensure there is only 1 item in the cart
    cy.get('.shopping_cart_badge').should('have.text', '1'); // Verify the cart badge shows 1 item
    cy.get('.cart_item').contains('Sauce Labs Bike Light').should('exist'); // Verify "Sauce Labs Bike Light" is still in the cart

    // Continue to the Checkout page
    cy.get('[data-test="checkout"]').should('exist').click();

    // Use the custom checkout command
    cy.checkout('John', 'Doe', '1233'); // Replace with actual first name, last name, and postal code

    // Verify that the order is completed successfully with the displayed message
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.get('[data-test="complete-text"]').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  });
});