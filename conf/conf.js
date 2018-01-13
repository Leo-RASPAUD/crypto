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
        host: process.env.API_HOST || 'localhost:8085',
        port: process.env.PORT || 8082,
    },
    exposeApiParams,
};
