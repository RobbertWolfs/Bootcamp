var webpack = require('webpack');
var path = require('path');

module.exports =  {
    devtool : 'eval',
    entry : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/app.jsx'
    ],
    output :  {
        path : __dirname,
        filename : 'bundle.js',
        publicPath : '/public/'
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin()
    ],
    module : {
        loaders : [{ test: /\.(jsx|js)$/, exclude: /node_modules/, loader: "babel-loader"}]
    }
};