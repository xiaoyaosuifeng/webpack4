const merge=require('webpack-merge');
const webpack=require('webpack');
const base=require('./webpack.base.config');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
module.exports=merge(base,{
    mode:'production',
    plugins:[
        //设置process.env的值，判断是什么环境，用什么url
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: "'production'",baseUrl:"'production'"}
        }),
    ]
})