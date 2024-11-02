const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: './src/index.js', // Змініть вхідний файл на TypeScript/TSX файл, якщо це необхідно
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            publicPath: '/'
        },
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval-source-map',

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/, // Додаємо підтримку для .ts і .tsx файлів
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env', 
                                '@babel/preset-react',
                                '@babel/preset-typescript' // Додаємо preset для TypeScript
                            ]
                        }
                    }
                },
                {   
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: 'file-loader'
                },
            ],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({ template: './public/index.html' }),
            new CleanWebpackPlugin(),
        ],
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'], // Додаємо .ts і .tsx
        },
        devServer: {
            historyApiFallback: true,
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            open: true,
            hot: true,
            port: 8080,
        },
        optimization: {
            splitChunks: {
                chunks: 'all', 
            },
            minimize: true,
        }
    };
};
