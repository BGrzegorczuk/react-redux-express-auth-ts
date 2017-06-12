const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonWebpackConfig = require('./webpack.common');


module.exports = merge(commonWebpackConfig, {
    output: {
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('base.[contenthash].css')
    ]
});
