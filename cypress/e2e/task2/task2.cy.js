describe('User API Tests', () => {
  const baseUrl = 'https://gorest.co.in/public/v2/users';
  const token = '426dfec5b850c77d1de1628f7a5444a3f98d5823978fbd09153ce1246178e59d';
  
  let userId; // Variable to store the user ID for update and delete tests
  
  it('Create a new user', () => {
    // Generate a unique email for the new user
    const uniqueEmail = `user${Date.now()}@example.com`;

    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        name: 'John Doe',
        gender: 'male',
        email: uniqueEmail,
        status: 'active'
      }
    }).then((response) => {
      // Assert that the response status is 201 Created
      expect(response.status).to.eq(201);

      // Assert that the response body contains the correct details
      expect(response.body).to.have.property('name', 'John Doe');
      expect(response.body).to.have.property('email', uniqueEmail);
      expect(response.body).to.have.property('gender', 'male');
      expect(response.body).to.have.property('status', 'active');

      // Store the user ID for use in update and delete tests
      userId = response.body.id;
    });
  });

  it('Update user details', () => {
    // Ensure the userId is set from the previous test
    expect(userId).to.not.be.undefined;

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/${userId}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        name: 'John Smith',
        gender: 'male',
        email: `updated${Date.now()}@example.com`,
        status: 'inactive'
      }
    }).then((response) => {
      // Assert that the response status is 200 OK
      expect(response.status).to.eq(200);

      // Assert that the response body contains the updated details
      expect(response.body).to.have.property('name', 'John Smith');
      expect(response.body).to.have.property('status', 'inactive');
    });
  });

  it('Delete user', () => {
    // Ensure the userId is set from the create test
    expect(userId).to.not.be.undefined;

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/${userId}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      // Assert that the response status is 204 No Content
      expect(response.status).to.eq(204);

      // Verify that the user is deleted by trying to fetch the user and expecting a 404 status
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${userId}`,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404);
      });
    });
  });
});
