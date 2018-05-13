const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        polyfills: ["./src/polyfills"],
        vendor: ["./src/vendor"],
        app: ["./src/main"]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [{
                        loader: "awesome-typescript-loader"
                    },
                    {
                        loader: "angular2-template-loader"
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "to-string-loader"
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: [{
                    loader: "file-loader"
                }]
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /@angular(\\|\/)core(\\|\/)esm5/,
            path.resolve(__dirname, "../src")
        ),
        new CleanWebpackPlugin(
            ["dist"], 
            path.resolve(__dirname, "../")
        ),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ]
}