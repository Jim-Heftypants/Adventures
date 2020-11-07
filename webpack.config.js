const path = require('path');

module.exports = {
    context: __dirname,
    entry: './loadFiles/src/index.js',
    output: {
        path: path.resolve(__dirname, './loadFiles/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    }
};