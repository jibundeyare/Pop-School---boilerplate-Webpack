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
// Used to create one CSS file
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Used to minify CSS file
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
            //chunkFilename: '[name].js'
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
                                sourceMap: true
                            }
                        },
                        'sass-loader'
                    ].filter(loader => loader !== false)
                },
                // Used to load straight CSS files
                {
                    test: /\.css$/,
                    use: [
                        !isProd && 'css-hot-loader',
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                   ].filter(loader => loader !== false)

                },
                {
                    test: /\.(html|php|woff|woff2|eot|ttf|png|jpg|jpeg|gif|svg)$/,
                    loader: 'file-loader' 
                }
            ]
        },
        plugins: [
            // this plugin cleans dist files
            new CleanWebpackPlugin(['dist/assets/*']),
            // write files on the system rather than just having them in RAM
            new WriteFilePlugin(),
            // create an minified CSS file
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            // we need this one to run dev
            new webpack.HotModuleReplacementPlugin(),
        ],
        optimization: {
            minimizer: [
                // minimize JS on prod, not on dev
                isProd && new UglifyWebpackPlugin({ sourceMap: true }),
                // minimize CSS on prod. We need sophisticated options to keep the sourcemap :/
                isProd && new OptimizeCssAssetsPlugin({ cssProcessorOptions: { map: { inline: true } } })
            ]
            // we filter because there is nothing on dev
            .filter(plugin => plugin !== false)
        }
    };
};
