module.exports = env => [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: true,
                cacheDirectory: true
            }
        }
    },
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: 'file-loader'
    }
];
