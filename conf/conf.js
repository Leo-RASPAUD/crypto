const authentication = {
    jwtSecret: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlIjoiY3J5cHRvIiwiY3JlYXRvciI6Imxlb3Jhc3BhdWQiLCJqdGkiOiJjODc0YTUzYi0yNDMwLTRkNzQtYjE3ZC00NDhjZmZjYzZiODciLCJpYXQiOjE1MTU3NDk4ODUsImV4cCI6MTUxNTc1MzQ4NX0.QF5uyOEenBqVyi-vfCFPtzfYyx_wJMPDApcJCdJ6WBw',
    issuer: 'crypto',
    sessionSecret: 'QpoXwHS3kiCd549CxhWYtTKXMcpM88NP849nwcWD',
};

const exposeApiParams = (app, params) => {
    app.get('/getApiParams', (_, res) => {
        res.send(params);
    });
};


module.exports = {
    authentication,
    params: {
        mongoHost: process.env.MONGO_HOST || 'localhost',
        host: process.env.API_HOST || 'localhost',
        port: process.env.PORT || 8085,
        db_type: process.env.DB_TYPE || 'mongodb',
        db_port: process.env.DB_PORT || '54621',
        db_name: process.env.DB_NAME || 'crypto',
        debug_react: process.env.DEBUG_REACT || true,
        slackHook: process.env.SLACK_HOOK || 'null',
    },
    exposeApiParams,
};
