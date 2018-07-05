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
            hot: true
        },
        module: {
            rules: [
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
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),

            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css",
            }),
            new HtmlWebpackPlugin({
                title: 'Hot Module Replacement'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
    };
};