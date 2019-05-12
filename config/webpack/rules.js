module.exports = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
    },
    {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?prefix=font/&limit=5000'
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader']
    },
    {
        test: /\.module\.s(a|c)ss$/,
        loader: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    camelCase: true
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
    },
    {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
            'style-loader',
            'css-loader',
            {
                loader: 'sass-loader'
            }
        ]
    }
];
