const path = require("path"); //兼容不同系统的路径
const htmlWebpackPlugin = require("html-webpack-plugin"); //自动引入js到html中
const miniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css样式到单独文件
const cleanWebpackPlugin = require("clean-webpack-plugin"); //打包前删除之前的打包文件
const PurifyCssWebpack = require("purifycss-webpack"); //消除多余的css代码
const glob = require("glob"); //消除多余的css代码
const webpack = require("webpack");
const fs = require("fs");
let [entry, myHtmlPlugins] = [{}, []];
let htmlFiles = fs.readdirSync(path.resolve(__dirname, "../src/html"));
let jsFiles = fs.readdirSync(path.resolve(__dirname, "../src/js"));
jsFiles.map((i) => {
  if (/\.js$/.test(i)) {
    entry[i.replace(/\.js$/, "")] = path.resolve(__dirname, "../src/js/" + i);
  }
});
htmlFiles.map((i) => {
  if (/\.html$/.test(i)) {
    myHtmlPlugins.push(
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "../src/html/" + i),
        filename: i,
        chunks: ["common", i.replace(/\.html$/, "")],
      })
    );
  }
});
console.log(entry, "========================================================");
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  entry: entry,
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].bunld.js",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
        //postcss-loader autoprefixer   css自动加前缀
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
      //html里的图片打包
      {
        test: /\.html$/,
        use: ["html-withimg-loader"],
      },
      // 样式里的图片打包路径  url-loader  file-loader
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              // name: 'img/[name].[ext]'
              name: "img/[hash:8].[ext]",
            },
          },
        ],
      },
      //webpack4  ES6自动ES5  babel-loader  @babel/core @babel/preset-env
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    port: 3001,
    open: true,
    hot: true,
    proxy: {
      //反向代理
      "/api/*": {
        //匹配到/api/字符串就代理
        target: "http://47.101.191.160:9002/", //代理路径
        changeOrigin: true, // target是域名的话，需要这个参数，
        secure: false, // 设置支持https协议的代理
        pathRewrite: { "^/api": "" }, //api替换为字符串
      },
    },
  },

  plugins: [
    new cleanWebpackPlugin(), //打包前删除dist文件
    new miniCssExtractPlugin({
      //分离css
      filename: "css/[name].css",
    }),

    //没有元素时，打包css代码会消失，封装插件时不能用此功能样式会消失
    // new PurifyCssWebpack({
    //   //消除冗余代码
    //   // 首先保证找路径不是异步的,所以这里用同步的方法
    //   // path.join()也是path里面的方法,主要用来合并路径的
    //   // 'src/*.html' 表示扫描每个html的css
    //   paths: glob.sync(path.join(__dirname, "../src/html/*.html")),
    // }),

    ...myHtmlPlugins,
  ],
};
