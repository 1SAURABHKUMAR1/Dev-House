import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        video: false,
        screenshotOnRunFailure: false,
    },
    env: {
        apiUrl: 'http://localhost:4000/api/v1',
        userEmail: 'email@gmail.com',
        userPassword: 'Saurabh',
    },
});
