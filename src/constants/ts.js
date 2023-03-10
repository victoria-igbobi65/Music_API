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
        SUSPENDED: true,
        NOTSUSPENDED: false
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
        APPBASEURL: 'http://localhost:5000/',
    },
    TOKEN: {
        NAME: 'jwt_token',
    },
    GRANTTYPE: {
        CLIENTCREDENTIALS: 'client_credentials',
    },
}
