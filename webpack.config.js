/**
 * Webpack config
 * 4 core concepts -> entry point / output / loaders / plugins
 * Dev and production mode (production triggers all optimization)
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Export the config object so webpack can take it to work with it
module.exports = {
    entry: [
        'babel-polyfill',
        './src/js/index.js'
    ],
    output: {
        // where to place output
        // current directory -> dist
         path: path.resolve(__dirname, 'public'),
        // name of webpack
        filename: "js/bundle.js"
    },
    // server config
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        // creates the html on the fly
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // Starting HTMLfile
            template: './src/index.html'
        })
    ],
    // Loaders in webpack allows us to import or load files and process them
    // Convert sass to css or ESModern to ES5
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};