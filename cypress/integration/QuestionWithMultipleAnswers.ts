import '@testing-library/cypress/add-commands';
const DEFAULT_QUESTION = Cypress.env("DEFAULT_QUESTION");
const DEFAULT_CORRECT_ANSWER = Cypress.env("DEFAULT_CORRECT_ANSWER");
const DEFAULT_INCORRECT_ANSWER = Cypress.env("DEFAULT_INCORRECT_ANSWER");

describe("Renders the homepage and", () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it('renders first time correctly', () => {
        cy.get(".container").should("exist");
        cy.get(".incorrect-all-answers-background").should("exist");
        cy.findByText(DEFAULT_CORRECT_ANSWER).should("exist");
        cy.findByText(DEFAULT_INCORRECT_ANSWER).should("exist");
        cy.findByText(DEFAULT_QUESTION).should("exist");
    })

    it('you should be able to press first answer and background changes', () => {
        cy.get(".container").should("exist");
        cy.get(".incorrect-all-answers-background").should("exist");
        cy.get('#container-toggle-1 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");
    })

    it("you should be able to press each answer", () => {
        cy.get(".answer").each(($button: any, index: number, list: any[]) => {
            expect(list).to.have.length(11);

            $button.click();
        })
    })

    it('you should be able to change your answer', () => {
        cy.get(".container").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(3)').click();
        cy.get(".incorrect-all-answers-background").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(4)').click();
        cy.get(".incorrect-all-answers-background").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(4)').click();
        cy.get(".incorrect-all-answers-background").should("exist");
    })

    it('component blocks buttons when all answers are correct', () => {
        cy.get(".container").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-2 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-3 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-4 > .buttons > :nth-child(2)').click();
        cy.get(".correct-answers-background").should("exist");
    })

    it('I should be able to change the button and see highlighted button', () => {
        cy.get(".container").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(3)').click();
        cy.get('.highlighted').should("exist");
    })

    it('it should render correctly for small device', () => {
        cy.viewport(320, 780);
        cy.get('.highlighted').should("not.exist");

        cy.get(".container").should("exist");
        cy.get("#container-toggle-1 > .buttons").should("have.css", "flex-direction", "column");
    })

    it('I should be able to press each button as expected', () => {
        cy.viewport(320, 780);
        cy.get('.highlighted').should("not.exist");

        cy.get(".container").should("exist");

        cy.get('#container-toggle-1 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-2 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-3 > .buttons > :nth-child(2)').click();
        cy.get(".incorrect-partial-answers-background").should("exist");

        cy.get('#container-toggle-4 > .buttons > :nth-child(2)').click();
        cy.get(".correct-answers-background").should("exist");
    })
})