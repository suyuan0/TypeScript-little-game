// 引入一个包
const path = require('path')
// 引入html插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// webpack中的所以配置信息都应该写在module.exports中
module.exports = {
    mode: "production", // 入口文件
    entry: './src/index.ts', // 指定打包文件所在的目录
    output: {
        // 指定打包后的目录
        path: path.resolve(__dirname, 'dist'), // 打包后文件的名字
        filename: "bundle.js",
        // 告诉webpack不要使用箭头函数
        environment: {
            arrowFunction: false
        }
    }, // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [{
            // test指定规则生效的文件
            test: /\.ts$/, // 要使用的loader
            use: ['ts-loader'], // 要排除的文件夹
            exclude: /node_modules/
        },
            //
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }]
    }, // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        // 新建一个插件对象
        new htmlWebpackPlugin({
            // title: "这是哈哈哈",
            template: "./src/index.html"
        })],
    // 设置引用模块
    resolve: {
        // 设置可以直接引用的文件后缀
        extensions: ['.ts', '.js']
    },
}
