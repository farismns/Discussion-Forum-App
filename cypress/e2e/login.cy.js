/**
 * E2E Test — Login Flow
 *
 * Skenario:
 * - should login successfully
 *
 * Flow:
 * 1. Buka halaman login
 * 2. Isi email
 * 3. Isi password
 * 4. Klik login
 * 5. Redirect ke homepage
 * 6. Tampil thread list
 */

describe('Login Flow', () => {
  it('should login successfully', () => {
    // 1. Buka halaman login
    cy.visit('/login');

    // 2. Isi email
    cy.get('input[type="email"]').type('realuserabc@xyz.com');

    // 3. Isi password
    cy.get('input[type="password"]').type('Test1234!');

    // 4. Klik login
    cy.get('button[type="submit"]').click();

    // 5. Redirect ke homepage — verify URL
    cy.url().should('eq', Cypress.config('baseUrl') + '/');

    // 6. Tampil thread list
    cy.contains('Threads').should('be.visible');
  });
});
