describe('Example ', function() {
  it('Loads correct Hello World', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Hello world!')
  })
})
