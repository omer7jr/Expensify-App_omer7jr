const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {

    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            // publicPath: 'public',
            filename: 'bundle.js'
        },
        // plugins: [new MiniCssExtractPlugin()],
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],

            }],
        },
        devtool: env.production ? 'source-map' : 'eval-cheap-module-source-map',
        devServer: {

            static: {
                directory: path.resolve(__dirname, 'public'),
                publicPath: '/dist',

            },
            port: 8080,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
            
        }

    }
};
