var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server'
    ],
    output: {
        filename: 'index.js',
        path: path.join(__dirname, '/examples/public/'),
        publicPath: '/examples/public/'
    },
    resolve: {
        extensions: [
            '', '.js', '.json', '.jsx'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loaders: ['json']
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot', 'jsx-loader', 'babel-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot','jsx-loader', 'babel-loader'
                ]
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!cssnext')
            }, {
                test: /\.(ico|jpe?g|png|gif)$/,
                loaders: ['file?name=[path][name].[ext]&context=./src']
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loaders: ['file?name=[path][name].[ext]&context=./src']
            }, {
                test: /\.(html|txt)$/,
                loaders: ['file?name=[path][name].[ext]&context=./src']
            }
        ]
    },
    plugins: ([
        new webpack.HotModuleReplacementPlugin()
    ])
};
