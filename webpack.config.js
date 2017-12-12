const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.resolve(__dirname, 'src'),
        entry: {
        app: './js/index.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',                          // New
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),    // New
    },

    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env'] },
                }],
            },
            {
                test: /\.(sass|scss)$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer()]
                            }
                        },
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/styles.css',
        allChunks: true,
      }),
    ]


};