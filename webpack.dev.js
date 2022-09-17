const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common({mode: 'development'}), {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
    ],
    devServer: {
        open: true,
        port: 3000,
    },
})