const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonWebpackConfig = require('./webpack.common');


module.exports = merge(commonWebpackConfig, {
    output: {
        filename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('base.css')
    ],
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: '3000',
        hot: true,
        historyApiFallback: true,
        inline: true,
        proxy: {
            "/api": "http://localhost:3001"
        }
    }
});
