const babelLoaderRule = {
    test: /\.js?$/,
    exclude: [/node_modules/],
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ['env', 'react'],
            plugins: ['babel-plugin-transform-object-rest-spread'],
        },
    }],
};

const eslintLoaderRule = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
};

export default {
    babelLoaderRule,
    eslintLoaderRule,
};
