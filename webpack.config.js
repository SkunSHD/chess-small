const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = function(env, argv) {
    return {
        mode: env.production ? 'production' : 'development',
        entry: {
            app: './src/index.js'
        },
        devtool: env.production ? 'source-maps' : 'eval',
        devServer: {
            contentBase: './dist',
            hot: true,
            port: 4000
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        // creates style nodes from JS strings
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        "css-loader", // translates CSS into CommonJS
                        {
                            loader: "sass-loader", // compiles Sass to CSS
                            options: {
                                sourceMap: !env.production
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new MiniCssExtractPlugin({
                filename: "[name].[hash].css"
            }),
            new HtmlWebpackPlugin(  {
                inject: 'body',
                template: './src/index.html',
                filename: 'index.html',
                hash: true
            }),
            new webpack.HotModuleReplacementPlugin(),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env.production ? 'production' : 'development')
            })
        ],
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist')
        }
    };
};