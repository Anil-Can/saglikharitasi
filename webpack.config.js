const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        bundle: path.resolve(__dirname,"src/index.js"),
    },
    performance: {
        hints: false,
    },
    devServer: {
        static:{
            directory: path.resolve(__dirname, "./")
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
    },
    module : {
        rules : [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/inline',
            }
        ] 
    },
    resolve: {
        modules: [__dirname,"src","node_modules"],
        extensions: ["*", ".js", ".jsx"],
    },
    output : {
        path: path.resolve(__dirname, "./"),
        filename: '[name].js',
    },
    optimization: {
        minimize: true
    },
}