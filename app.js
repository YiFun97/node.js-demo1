const  http = require('http')
const url = require('url');
const path = require('path')
const serveStatic = require('serve-static')
const queryString = require('querystring')
const dataformat = require('dateformat')
const router = require('./route/index')
//// app对象就是网站服务器对象
const app = http.createServer()
const  mongoose = require('mongoose')
//引入模板引擎
const template = require('art-template')


//实现静态资源访问服务
const serve = serveStatic(path.join(__dirname,'public'))


//配置模板所在根目录
template.defaults.root = path.join(__dirname,'views')
template.defaults.imports.dataformat = dataformat


//连接数据库
require('./model/connect.js')

// 当客户端有请求来的时候
app.on('request',(req,res) => {
    router(req,res,()=>{ })
    serve(req,res,()=>{})
})

app.listen(3000);
console.log('网站服务器启动成功');