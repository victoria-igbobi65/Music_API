module.exports = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',

    DEVELOPMENT: 'development',
    PRODUCTION: 'production',

    ACCOUNT_TYPES: {
        USER: 'user',
        ADMIN: 'admin',
    },

    ACCOUNT_STATUS: {
        APPROVED: 'approved',
        PENDING: 'pending',
        DISSAPPROVED: 'disapproved',
    },

    MESSAGE: {
        ERROR: {
            LOGIN: 'invalid credentials',
            VALIDATION: {
                NO_SCHEMA: 'no schema available for validation',
            },
            ALREADY_EXISTS: 'user with this email already exists',
        },
    },
    APP_ENV: {
        TEST: 'test',
        LOCAL: 'local',
        DEVELOPMENT: 'development',
        PRODUCTION: 'production',
    },
    TOKEN_TYPE: {
        PASSWORD_RESET: 'password_reset',
        EMAIL_VERIFICATION: 'email_verification',
    },
    LINKS: {
        RESETPASSWORD: 'http://localhost:5000/auth/resetPassword/',
        SPOTIFYACCESSTOKENBASEURL: 'https://accounts.spotify.com/api/token',
        SPOTIFYREQUESTBASEURL: 'https://api.spotify.com/v1/',
    },
    TOKEN: {
        NAME: 'jwt_token',
    },
    GRANTTYPE: {
        CLIENTCREDENTIALS: 'client_credentials',
    },
}
