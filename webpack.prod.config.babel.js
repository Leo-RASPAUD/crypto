import path from 'path';
import webpack from 'webpack';
import webpackRules from './Webpack/webpackRules';

const config = {
    entry: path.resolve(__dirname, './public/src/main/main.js'),

    output: {
        path: path.join(__dirname, './assets'),
        filename: 'index.js',
        publicPath: '/assets',
        sourceMapFilename: '[name].map',
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
        rules: [
            webpackRules.babelLoaderRule,
            webpackRules.cssLoaderRule,
            webpackRules.fontLoaderRule,
            webpackRules.eslintLoaderRule,
        ],
    },

};

export default config;
