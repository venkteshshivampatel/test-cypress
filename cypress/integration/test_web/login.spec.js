describe('Test login and registration functionality @ marksandspicy.com', function() {

  beforeEach(function () {
    cy.visit('/login')
  })


  // test to check validity of credentials
  it('Go to the login page, input email/password. Check if error is displayed', function(){

    cy.fixture('login.json').as('testUser')
    cy.get('@testUser').then(testUser => {
      cy.get('[id="email"]').should('be.empty').type(this.testUser.email)
      cy.get('[id="passwd"]').should('be.empty').type(this.testUser.password)
      cy.get('[id="SubmitLogin"]').click()
      cy.get('[id="center_column"]').find('[class="alert alert-danger"]')
        .should('be.visible')
        .should('contain', 'There is 1 error')
        .should('contain', 'Authentication failed.')
    })
  })


  // test to check validation on input field upon clicking Submit
  it('leave the fields blank and check if validation appears in inputbox on clicking submit', function(){

    cy.get('[id="email"]').should('be.empty').should('have.css', 'color', 'rgb(156, 155, 155)')
      .click()
    cy.get('[name="passwd"]').should('be.empty').should('have.css', 'color', 'rgb(156, 155, 155)')
      .click()
    cy.get('[id="SubmitLogin"]').click()
    cy.get('[id="email"]').should('have.css', 'color', 'rgb(241, 51, 64)')
    cy.get('[id="passwd"]').should('have.css', 'color', 'rgb(241, 51, 64)')
  })

  // test to check input field validation on clicking outside
  it('leave the fields blank and check if validation appears in inputbox on clicking outside', function(){

    cy.get('[id="email"]').should('be.empty').should('have.css', 'color', 'rgb(156, 155, 155)')
      .click()
    cy.get('[name="passwd"]').should('be.empty').should('have.css', 'color', 'rgb(156, 155, 155)')
      .click()
    cy.get('[class="page-heading"]').click()
    cy.get('[id="email"]').should('have.css', 'color', 'rgb(241, 51, 64)')
    cy.get('[id="passwd"]').should('have.css', 'color', 'rgb(241, 51, 64)')
  })


  // test to check autofill functionality
  it('check autofill City on pincode input', function(){
    cy.fixture('registration.json').as('testUser')
    cy.get('@testUser').then(testUser => {
      cy.get('[id="email_create"]').should('be.empty').type(this.testUser.email)
    })
    cy.get('[id="SubmitCreate"]').click()
    cy.get('[name="inscriptionForm"]').within($insForm =>{
      cy.get('@testUser').then(testUser => {
        cy.get('[id="codePostal"]').should('be.empty').type(this.testUser.pin)
        cy.get('[id="ville"]').should('not.be.empty')
      })
    })
  })


  // test to check registration
  it.only('Check if registration is success', function(){

    cy.fixture('registration.json').as('testUser')
    cy.get('@testUser').then(testUser => {
      cy.get('[id="email_create"]').should('be.empty').type(this.testUser.email)
    })
    cy.get('[id="SubmitCreate"]').click()
    cy.get('[name="inscriptionForm"]').within($insForm =>{
      cy.get('@testUser').then(testUser => {
        cy.get('[id="email"]').should('be.empty').type(this.testUser.email)
        cy.get('[id="password"]').should('be.empty').type(this.testUser.password)
        cy.get('[id="password2"]').should('be.empty').type(this.testUser.password)
        cy.get('label[for="CivMr"]').contains('Mr').click()
        cy.get('[id="nom"]').should('be.empty').type(this.testUser.lname)
        cy.get('[id="prenom"]').should('be.empty').type(this.testUser.fname)
        cy.get('[id="dateJour"]').should('be.empty').type(this.testUser.bdate)
        cy.get('[id="dateMois"]').should('be.empty').type(this.testUser.bmonth)
        cy.get('[id="dateAnnee"]').should('be.empty').type(this.testUser.byear)
        cy.get('[id="adresse"]').should('be.empty').type(this.testUser.road)
        cy.get('[id="adresseDetail"]').should('be.empty').type(this.testUser.apt)
        cy.get('[id="adresseDetail2"]').should('be.empty').type(this.testUser.bldg)
        cy.get('[id="codePostal"]').should('be.empty').type(this.testUser.pin)
        cy.get('[id="ville"]').should('not.be.empty')
        cy.get('[id="lieuDit"]').should('not.be.empty')
        cy.get('[id="telephonePortable"]').should('be.empty').type(this.testUser.mob)
        cy.get('[id="telephoneFixe"]').should('be.empty').type(this.testUser.ph)
        cy.get('[id="BtnCreationSubmit"]').should('have.attr', 'href')
          .and('contain', Cypress.config().baseUrl)
        cy.get('[id="BtnCreationSubmit"]').click().then(() => {
              cy.location('pathname').should('not.equal', '/create-account')
          })
      })
    })
  })


  // test to check tooltip
  it('Go to the login page, input username. Check if validation tooltip appears', function(){

    cy.get('[id="email"]').should('be.empty').type('test').trigger('mouseover', 'center').then(() => {
      cy.get('[id="email"]').should('contain', `Please include an '@' in the email address.'test' in missing an '@'.`)
    })
  })
})

