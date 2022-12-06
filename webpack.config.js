const path = require('path');

module.exports = (env) => {
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [ "style-loader", "css-loader", "sass-loader" ],

            }],
        },
        devtool: env.production ? 'source-map' : 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),

            },
            port: 8080,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,

        }

    }
};
