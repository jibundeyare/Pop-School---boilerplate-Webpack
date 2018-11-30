const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].0[id].css'
    })
];
