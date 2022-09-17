const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const path = require('path');

module.exports = ({mode}) => {
    const isProduction = mode === 'production';

    return {

        resolve: {
            alias: {
                '@utils': path.resolve(__dirname, 'src/utils/'),
                '@styles': path.resolve(__dirname, 'src/styles/'),
                '@components': path.resolve(__dirname, 'src/comp/'),
            }
        },
        plugins: [
            new HtmlWebpackPlugin({template: './public/index.html'}),
            new Dotenv(),
        ],
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    //loaders are executed in reverse(lastOne to firstOne)
                    //So, order matters
                    use: [
                        isProduction 
                            ? MiniCssExtractPlugin.loader//3.creates separated files for css and then generates a single file 
                            : 'style-loader',//3. Injects styles into DOM
                        'css-loader',//2. Turns css into commonJs
                        'sass-loader',//1. Turns sass into css
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    } 
                },
                {
                    test: /\.(woff|woff2)$/,
                    exclude: /node_modules/,
                    type: 'asset/resource',//as webpack 5 has already implemented url-loader, 
                    //you only need this line in order to let assetModules procces this
                    //asset resource
                    generator: {
                        filename: 'assets/fonts/[name][ext]'
                    }
                },
            ]
        },
    }
}