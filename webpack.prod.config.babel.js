import path from 'path';
import webpack from 'webpack';
import webpackRules from './Webpack/webpackRules';

const config = {
    resolve: {
        alias: {
            components: path.resolve(__dirname, './src/public/main/components'),
            reducers: path.resolve(__dirname, './src/public/main/reducers'),
            services: path.resolve(__dirname, './src/public/main/services'),
            utils: path.resolve(__dirname, './src/public/main/utils'),
            assets: path.resolve(__dirname, './src/public/main/assets'),
            constants: path.resolve(__dirname, './src/public/main/constants'),
        },
        extensions: ['.js'],
        modules: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, './src/public/main')],
    },

    entry: path.resolve(__dirname, './src/public/main/main.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true,
            },
            compress: {
                screw_ie8: true,
            },
            comments: false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
    ],

    module: {
        rules: [webpackRules.babelLoaderRule, webpackRules.cssLoaderRule, webpackRules.fileLoaderRule],
    },
};

export default config;
