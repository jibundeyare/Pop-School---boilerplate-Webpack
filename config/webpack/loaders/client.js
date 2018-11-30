const path = require('path');

module.exports =  env => {
    const isProd = env.NODE_ENV === 'production';

    return [
        {
            test: /\.sass$/,
            use: [
                !isProd && 'css-hot-loader',
                isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !isProd,
                    }
                },
                'sass-loader'
            ].filter(loader => loader !== false)
        },
        {
            test: /\.css$/,
            use: [
                isProd ? MiniCssExtractPlugin.loader : 'style-loader' ,
                'css-loader'
            ]
        },
    ];
}
