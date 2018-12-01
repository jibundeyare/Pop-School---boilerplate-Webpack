/**
 * Webpack config for the bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = env => {
    const isProd = env.NODE_ENV === 'production';
    return {
        mode: env.NODE_ENV,
        target: 'web',
        devtool: 'inline-source-maps',
        entry: {
            app: path.resolve(__dirname, 'src/js/index.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist/assets'),
            chunkFilename: '[name].js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            hot: true
        },
        module: {
            rules: [
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
                },
                {
                    test: /\.sass$/,
                    use: [
                        !isProd && 'css-hot-loader',
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProd
                            }
                        },
                        'sass-loader'
                    ].filter(loader => loader !== false)
                },
                {
                    test: /\.css$/,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                // J'ai ajouté ce loader car webpack-dev-server ne watche pas les changements dans l'index.html...voir src/js/html_watcher.js
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                // .toString() ne marche pas ?????????
                __ENV__: '"' + env.NODE_ENV + '"'
            }),
            new CleanWebpackPlugin(['dist/*']),
            new WriteFilePlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].0[id].css'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/index.html'),
                inject: true,
                filename: '../index.html'
            })
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                isProd &&
                    new UglifyWebpackPlugin({
                        uglifyOptions: {
                            compress: {
                                collapse_vars: false
                            }
                        }
                    })
            ].filter(plugin => plugin !== false)
        }
    };
};
