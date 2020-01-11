//引入路由模块
const getRouter = require('router')
//获取路由对象
const router =  getRouter()
const Student = require('../model/user.js')
//引入模板引擎
const template = require('art-template')
const queryString = require('querystring')
const dataformat = require('dateformat')
//呈递用户增加页面
router.get('/add',(req,res) =>{
    const html = template('index.art',{})
    res.end(html)
})


//展现用户信息页面
router.get('/list',async (req,res) =>{
   let stus =  await Student.find()
    const html = template('list.art',{
        stus:stus
    })
    res.end(html)
})
//学生信息添加功能路由
router.post('/add',(req,res)=>{
    let formData = ''
    req.on('data',param => {
        formData += param
    })
    req.on('end',async ()=>{
      
        console.log(queryString.parse(formData))
        //await 变成异步函数
       await  Student.create(queryString.parse(formData))
        res.writeHead(301,{
            Location:'/list'
        })
        res.end()
    })
})

module.exports= router