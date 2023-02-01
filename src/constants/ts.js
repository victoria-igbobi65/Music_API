module.exports = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',

    ACCOUNT_TYPES: {
        USER: 'user',
        ADMIN: 'admin',
    },

    WALLET_TYPE: {
        BUSINESS: 'business',
        USER: 'user',
    },

    ROLE_TYPE: {
        CONTROL: 'control',
        SUPPORT: 'support',
        NONE: 'none',
    },

    DEVELOPMENT: 'development',
    PRODUCTION: 'production',

    ACCOUNT_TYPES: {
        USER: 'user',
        ADMIN: 'admin',
    },

    ROLE_TYPE: {
        CONTROL: 'control',
        SUPPORT: 'support',
        NONE: 'none',
    },
    EVENT_TYPE: {
        ORDER: 'order_event',
    },
    PRODUCT_STATUS: {
        APPROVED: 'approved',
        PENDING: 'pending',
        DISSAPPROVED: 'disapproved',
    },
    ACCOUNT_STATUS: {
        APPROVED: 'approved',
        PENDING: 'pending',
        DISSAPPROVED: 'disapproved',
    },
    ORDER_STATUS: {
        SHIPPED: 'shipped',
        PENDING: 'pending',
        COMPLETED: 'completed',
        INCOMPLETED: 'incompleted',
        CANCELLED: 'cancelled',
        CONFIRMED: 'confirmed',
    },
    TRANSACTION_STATUS: {
        SUCCESS: 'success',
        PENDING: 'pending',
        COMPLETED: 'completed',
        FAILED: 'failed',
    },
    TOKEN_FLAG: {
        AUTH: 'auth',
        EMAIL_VERIFY: 'email_verification',
        RESET: 'password_reset',
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
        ORIGIN: 'http://localhost:3032',
    },
    TOKEN: {
        NAME: 'jwt_token',
    },
}
