declare namespace Cypress {
    interface Chainable {
        login(): Cypress.Chainable<{
            name: string;
            email: string;
            username: string;
            user_id: string;
            social_id: string;
            profile_photo: {
                id: string;
                secure_url: string;
            };
            role: string;
            bio: string;
            portfolio_link: string;
            work: string;
            skills: string;
            education: string;
            location: string;
            githubUrl: string;
            twitterUrl: string;
            total_followers: number;
            total_following: number;
            following: [];
            followers: [];
            bookmarks: [];
            posts: [];
            tags: [];
            comments: [];
            createdAt: string;
            _id: string;
        }>;
    }
}

Cypress.Commands.add('login', () => {
    cy.request({
        url: `${Cypress.env('apiUrl')}${Cypress.env('loginUrlBackend')}`,
        method: 'POST',
        body: {
            email: Cypress.env('userEmail'),
            password: Cypress.env('userPassword'),
        },
    }).then((response) => ({
        ...response.body.user,
    }));
});
