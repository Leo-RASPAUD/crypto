import path from 'path';
import webpackRules from './Webpack/webpackRules';
import configServer from './conf/conf';

const config = {
    resolve: {
        alias: {
            components: path.resolve(__dirname, './src/public/main/components'),
            reducers: path.resolve(__dirname, './src/public/main/reducers'),
            services: path.resolve(__dirname, './src/public/main/services'),
            utils: path.resolve(__dirname, './src/public/main/utils'),
            constants: path.resolve(__dirname, './src/public/main/constants'),
        },
        extensions: ['.js'],
        modules: [
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, './src/public/main'),
        ],
    },

    entry: path.resolve(__dirname, './src/public/main/main.js'),

    output: {
        filename: 'index.js',
        publicPath: '/assets',
    },

    devServer: {
        inline: true,
        port: 8082,
        contentBase: path.resolve(__dirname, './src/public'),
        public: 'localhost:8082',
        before: (app) => {
            configServer.exposeApiParams(app, configServer.params);
        },
        historyApiFallback: true,
    },

    devtool: 'cheap-module-inline-source-map',

    module: {
        rules: [
            webpackRules.babelLoaderRule,
            webpackRules.eslintLoaderRule,
        ],
    },
};

export default config;
