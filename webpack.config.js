/**
 * Webpack config for the bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */

// First we fetch dependancies

// this is nodejs' path module. To handle directories
const path = require('path');
// This is webpack. Obviously, we need it :)
const webpack = require('webpack');
// Used to purge dist directory before generating new bundles so we don't get any legacy files
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Used to minify JS. It's called uglified because it was historically used to obfuscate…
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
// Used to minify CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Creates HTML pages from templates so we can have them in the dist directory
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Used to actually create files when in dev-server mode (else they're only in RAM)
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = env => {
    // set with npm run build or npm run dev
    // Have a look at the scripts section of package.json
    const isProd = env.NODE_ENV === 'production';
    return {
        mode: env.NODE_ENV,
        // our configuration is only for web
        // it's regular JS, nothing related to backend JS
        target: 'web',
        // source map helps debbuging with minified JS files
        // we add the sources maps within our scripts
        devtool: 'inline-source-maps',
        // entry point: this is the first file that webpack
        // will read. Everything will get build from this one
        entry: {
            app: path.resolve(__dirname, 'src/js/index.js')
        },
        // output: directory where generated JS will be saved
        output: {
            path: path.resolve(__dirname, 'dist/assets'),
            chunkFilename: '[name].js'
        },
        // configuration for dev environnement with live reload
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            hot: true
        },
        // all external modules, webpack only handle JS :)
        module: {
            rules: [
                // babel: we can code in ES6 and have backward compitibility
                // have a look at .babelrc file !
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                        }
                    }
                },
                // file-loader is to ensure the presence of an image that is used
                // in JS but is not present in HTML or CSS files
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: 'file-loader'
                },
                // SASS loader: to have SASS called automatically and CSS generated
                // Have a look at the entry point
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
                // Used to load straight CSS files
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
            // define an __ENV__ constant for every 
            new webpack.DefinePlugin({
                __ENV__: '"' + env.NODE_ENV + '"'
            }),
            // this plugin cleans dist files
            new CleanWebpackPlugin(['dist/assets/*']),
            // write files on the system rather than just having them in RAM
            new WriteFilePlugin(),
            // create an minified CSS file
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].0[id].css'
            }),
            // we need this one to run dev
            new webpack.HotModuleReplacementPlugin(),
            // create an HTML file from template
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/index.html'),
                inject: true,
                filename: '../index.html'
            })
        ],
        optimization: {
            minimizer: [
            // minimize JS on prod, not on dev
                isProd && new UglifyWebpackPlugin()
            ]
            // we filter because there is nothing on dev
            .filter(plugin => plugin !== false)
        }
    };
};
