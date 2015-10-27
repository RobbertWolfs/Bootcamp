var webpack = require('webpack');

module.exports = {
    entry: './app/app.jsx',
    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
        }]
    }
};
