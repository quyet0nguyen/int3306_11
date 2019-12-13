const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 5555
    },
    db: {
        username: process.env.DEV_DB_USERNAME ||'postgres',
        password: process.env.DEV_DB_PASSWORD || '2804',
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 5432,
        name: process.env.DEV_DB_NAME || 'ManagementSystem'
    }
};

const test = {
};

const production = {
};

const config = {
    dev,
    test,
    production
};

export default config.dev