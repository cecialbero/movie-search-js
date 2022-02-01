const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './js/scripts.js',
    output: {
        filename: 'js/scripts.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
    ]
}