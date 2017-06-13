const path = require('path');
const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
    typescript: {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader/webpack', 'ts-loader'],
        exclude: [/\.(spec|e2e)\.tsx?$/, /node_modules/],
    },

    sass: {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader', // translates CSS into CommonJS
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: function() {
                        return [
                            require('autoprefixer')({
                                browsers: ['last 3 versions']
                            })
                        ];
                    }
                }
            }, {
                loader: 'sass-loader', // compiles Sass to CSS
                options: {
                    sourceMap: true
                }
            }]
        })
    },

    fonts: {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
    },

    images: {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
            'file-loader?name=assets/[name].[hash].[ext]',
            {
                loader: 'image-webpack-loader',
                query: {
                    progressive: true,
                    // optimizationLevel: 7,
                    // interlaced: false,
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    }
                }
            }
        ]
    }
};


//=========================================================
//  PLUGINS
//---------------------------------------------------------
const plugins = {
    progressBar: new ProgressBarPlugin(),

    vendorChunk: new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),

    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    manifestChunk: new webpack.optimize.CommonsChunkPlugin({
        filename: 'manifest.[hash].js',
        name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),

    hashedModuleIds: new webpack.HashedModuleIdsPlugin(),

    chunkHash: new WebpackChunkHash(),

    chunkManifest: new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest',
        inlineManifest: false
    }),

    htmlWebpack: new HtmlWebpackPlugin({
        template: './index.ejs'
    }),

    inlineManifest: new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
    }),

    // enable HMR globally
    webpackHMR: new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    webpackNMP: new webpack.NamedModulesPlugin(),

    // do not emit compiled assets that include errors
    noEmitOnErrors: new webpack.NoEmitOnErrorsPlugin()
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            path.resolve('./sass/critical.scss'),
            path.resolve('./sass/styles.scss'),
            path.resolve('./ts/index.tsx')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../build/'),
        publicPath: "/"
    },
    plugins: [
        plugins.progressBar,
        plugins.vendorChunk,
        plugins.manifestChunk,
        plugins.hashedModuleIds,
        plugins.chunkHash,
        plugins.chunkManifest,
        plugins.htmlWebpack,
        plugins.inlineManifest,
        plugins.webpackHMR,
        plugins.webpackNMP,
        plugins.noEmitOnErrors
    ],
    module: {
        rules: [
            rules.typescript,
            rules.sass,
            rules.fonts,
            rules.images,
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
