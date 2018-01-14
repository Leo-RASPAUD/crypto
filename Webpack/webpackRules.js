const babelLoaderRule = {
    test: /\.js?$/,
    exclude: [/node_modules/],
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ['env', 'react', 'stage-0'],
            plugins: [
                'babel-plugin-transform-object-rest-spread',
                'transform-decorators-legacy',
                [
                    'transform-runtime', {
                        regenerator: true,
                    },
                ],
            ],
        },
    }],
};

const cssLoaderRule = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
};


const eslintLoaderRule = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
};

export default {
    babelLoaderRule,
    eslintLoaderRule,
    cssLoaderRule,
};
