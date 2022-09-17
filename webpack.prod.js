const TerserPlugin = require('terser-webpack-plugin');//not generate -LICENSE files
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common({mode: 'production'}), {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './assets/[name].[contenthash].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                extractComments: false
            }),
        ]
    },
    module: {
        rules: [
             {
                test: /\.(woff|woff2)$/,
                exclude: /node_modules/,
                type: 'asset/resource',//as webpack 5 has already implemented url-loader, 
                //you only need this line in order to let assetModules procces this
                //asset resource
                generator: {
                    filename: 'assets/fonts/[hash][name][ext]'
                }
            },
        ]
    }
})