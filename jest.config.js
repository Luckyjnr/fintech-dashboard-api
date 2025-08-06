module.exports = {
       testEnvironment: 'node',
       setupFilesAfterEnv: ['./jest.setup.js'],
       testTimeout: 20000,
       testMatch: ['**/__tests__/**/*.test.js', '**/tests/**/*.test.js'],
     };