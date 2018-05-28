const theme = require("./theme.js")
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack")
const path = require('path')

module.exports = {
    entry: {
        app: ['whatwg-fetch', './src/app.jsx'],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'public'),
        //这里是内存中的js，位置相对于html，这里怎么写，html怎么引入
        publicPath: ""
    },
    devServer: {
        //设置基本目录结构，就是html所在的目录
        contentBase: "public",
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        inline: true,
        hot: true,
        //服务端压缩是否开启
        compress: true,
        // //配置服务端口号
        port: 9999
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    presets: ['env', "stage-0", "react"],
                    plugins: [
                        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }] // `style: true` 会加载 less 文件
                    ]
                },

                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: { loader: "css-loader", options: { minimize: true } }
                })
            },

            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader",
                    options: {
                        "modifyVars":theme
                    }
                }]
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf)?$/,
                loader: ['url-loader?limit=8192']
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.css")
    ],


};
