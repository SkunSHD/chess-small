const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = function (env, argv) {
    return {
        mode: env.production ? 'production' : 'development',
        entry: {
            build: './src/index.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            port: 3000,
            contentBase: path.join(__dirname, 'src/js')
        },
        devtool: env.production ? 'source-maps' : 'eval',
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/', // for actual copying file
                            publicPath: 'img/' // for reference paths in html
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
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
                filename: "[name].css"
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ]
    };
};