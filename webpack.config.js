const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        // publicPath: 'public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]

        }],
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        
        static: {
            directory: path.resolve(__dirname, 'public'),
            
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,

    }

};