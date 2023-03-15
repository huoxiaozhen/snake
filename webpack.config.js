const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    environment: {
      // 告诉webpack不使用箭头函数
      arrowFunction: false,
      const: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11"
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式"usage" 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      },
      // 设置less文件的处理
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions"
                    }
                  ]
                  
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {  //文件扩展名需要添加ts
    extensions: ['.ts', '.js'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    // 启动gzip压缩
    compress: true,
    // 模块热替换
    hot: true,
    // 如果希望服务器外部可访问,指定如下host
    // host: '0.0.0.0',
    // 自动打开浏览器
    open: true
  },
  optimization: {
    runtimeChunk: 'single',
  },
}