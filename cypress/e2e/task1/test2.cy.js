describe('Items can be sorted', () => {
  beforeEach(() => {
    // Command to login and verify the landing page
    cy.loginAndVerify('standard_user', 'secret_sauce');
  });

  it('Verify that the items are sorted by Name', () => {
    // Verifying that the dropdown exists
    cy.get('[data-test="product-sort-container"]').should('be.visible');
    
    // Verify that the sorting option 'Name (A to Z)' is selected by default
    cy.get('[data-test="product-sort-container"]').should('have.value', 'az');

    // Fetch all item names and verify they are sorted correctly
    cy.get('.inventory_item_name').then(items => {
      const names = [...items].map(item => item.innerText);
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });

    // Change the sorting to Name (Z TO A)
    cy.get('[data-test="product-sort-container"]').select('za');
    cy.get('[data-test="product-sort-container"]').should('have.value', 'za');

    // Fetch all item names and verify they are sorted correctly in reverse order
    cy.get('.inventory_item_name').then(items => {
      const names = [...items].map(item => item.innerText);
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
  });

  it('Verify that the items are sorted by Price (low to high)', () => {
    // Change the sorting to Price (low to high)
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('[data-test="product-sort-container"]').should('have.value', 'lohi');

    // Fetch all item prices and verify they are sorted correctly
    cy.get('.inventory_item_price').then(items => {
      const prices = [...items].map(item => parseFloat(item.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Verify that the items are sorted by Price (high to low)', () => {
    // Change the sorting to Price (high to low)
    cy.get('[data-test="product-sort-container"]').select('hilo');
    cy.get('[data-test="product-sort-container"]').should('have.value', 'hilo');

    // Fetch all item prices and verify they are sorted correctly
    cy.get('.inventory_item_price').then(items => {
      const prices = [...items].map(item => parseFloat(item.innerText.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });
});
