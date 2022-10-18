describe('Meetp', () => {
    it('Check UI Home Page', () => {
        cy.login().then((user) => {
            cy.visit(Cypress.env('meetpUrl'));
            cy.url().should(
                'eq',
                `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
            );
            cy.contains('All rooms').should('exist');
            cy.findByTestId('start-room-button').should('exist');
            cy.findByTestId('start-room-button').should(
                'contain',
                'Start room',
            );
            cy.findByTestId('join-room-button').should('exist');
            cy.findByTestId('join-room-button').should('contain', 'Join room');

            cy.rooms().then((body) => {
                cy.log(`${JSON.stringify(body.rooms)}`);
                if (body.rooms.length > 0) {
                    cy.findAllByTestId('single-room').should(
                        'have.length',
                        body.rooms.length,
                    );
                    cy.findAllByTestId('single-room')
                        .first()
                        .contains(body.rooms[0].name);
                    cy.findAllByTestId('single-room')
                        .first()
                        .contains(body.rooms[0].speakers[0].name);
                    cy.findAllByTestId('single-room')
                        .first()
                        .contains(body.rooms[0].speakers.length);
                }
            });
        });
    });

    it('Check UI Create Room Button', () => {
        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );

        //
        cy.findByTestId('start-room-button').click();
        cy.findByTestId('create-room-modal').should('exist');
        cy.findByTestId('create-room-modal').should(
            'contain',
            'Enter the topic to be discussed',
        );
        cy.findByTestId('create-room-modal-close').click();
        cy.findByTestId('create-room-modal').should('not.exist');

        cy.findByTestId('start-room-button').click();
        cy.findByTestId('create-room-modal').find('input').should('exist');
        cy.findByTestId('create-room-modal')
            .findByPlaceholderText(`Enter room name`)
            .should('exist');
        cy.findByTestId('create-room-modal').should('contain', `Room Type`);
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should('exist');
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should('exist');
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should('exist');
        cy.findByTestId('create-room-modal').find('button').contains('Lets Go');
        cy.findByTestId('create-room-modal').find('button').contains('Cancel');

        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should(
                'have.css',
                'box-shadow',
                'rgb(49, 130, 206) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .click();
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should(
                'have.css',
                'box-shadow',
                'rgb(49, 130, 206) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .click();

        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-open')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-social')
            .should(
                'have.css',
                'box-shadow',
                'rgba(0, 0, 0, 0) 0px 0px 0px 2px',
            );
        cy.findByTestId('create-room-modal')
            .findByTestId('create-room-private')
            .should(
                'have.css',
                'box-shadow',
                'rgb(49, 130, 206) 0px 0px 0px 2px',
            );

        cy.findByTestId('create-room-modal')
            .find('button')
            .contains('Cancel')
            .click();
        cy.findByTestId('create-room-modal').should('not.exist');
    });

    it('Check UI Join Room Button', () => {
        cy.login();
        cy.visit(Cypress.env('meetpUrl'));
        cy.url().should(
            'eq',
            `${Cypress.config().baseUrl}${Cypress.env('meetpUrl')}`,
        );

        cy.findByTestId('join-room-button').click();
        cy.findByTestId('join-room-modal').should('exist');

        cy.findByTestId('join-room-modal')
            .should('contain', 'Join Room')
            .should('exist');

        cy.findByTestId('join-room-modal')
            .findByTestId('join-room-modal-close')
            .click();
        cy.findByTestId('join-room-modal').should('not.exist');
        cy.findByTestId('join-room-button').click();
        cy.findByTestId('join-room-modal').should('exist');

        cy.findByTestId('join-room-modal')
            .should('contain', 'Room Id')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByPlaceholderText('Enter room id...')
            .should('exist');

        cy.findByTestId('join-room-modal')
            .should('contain', 'Confirm Password')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .findByPlaceholderText('Enter room password...')
            .should('exist');

        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Join Room')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Cancel')
            .should('exist');
        cy.findByTestId('join-room-modal')
            .find('button')
            .contains('Cancel')
            .click();
        cy.findByTestId('join-room-modal').should('not.exist');
    });
});
