const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'client')

module.exports = {
    entry: {
        playground: './client/playground' ,
        controller: './client/controller'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                include: defaultInclude
            },
            {
                test: /\.jsx?$/,
                use: [{ loader: 'babel-loader' }],
                include: defaultInclude
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
                include: defaultInclude
            },
            {
                test: /\.mp3$/,
                use: [{ loader: 'file-loader?name=mp3/[name]__[hash:base64:5].[ext]' }],
                include: defaultInclude
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
                include: defaultInclude
            }
        ]
    },
    target: 'web',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/playground/index.html',
            inject: true,
            chunks: ['playground'],
            filename: 'playground/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/controller/index.html',
            inject: true,
            chunks: ['controller'],
            filename: 'controller/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'client/startup/index.html',
            inject: true,
            chunks: ['startup'],
            filename: 'startup/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
  //  devtool: 'cheap-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: {
            colors: true,
            chunks: false,
            children: false
        },
      proxy: {
        '/startup': 'http://localhost:3000/',
        '/login': 'http://localhost:3000/',
        '/qrcode.png': 'http://localhost:3000/qrcode.png',
        '/favicon.ico': 'http://localhost:3000/'
      }
    }
}