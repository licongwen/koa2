
const Koa = require('koa')
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const router = require('koa-router')();
const cors = require('koa2-cors');
// const jwtKoa = require('koa-jwt');
// const jwt = require('jsonwebtoken')
// const secret = 'jwt login';
const app = new Koa();
app.use(bodyparser());

//获取controllers文件
var files = fs.readdirSync(__dirname+'/controllers');
//获取controllers下的所有js文件
var js_files = files.filter((s)=>{
    return s.endsWith('.js');
})
//引入js文件并进行处理
for(var f of js_files){
    var mapping = require(__dirname+'/controllers/'+f);
    for(var url in mapping){
        if(url.startsWith('GET')){
            var path = url.substr(4);
            router.get(path,mapping[url]);
        }else if(url.startsWith('POST')){
            var path = url.substr(5);
            router.post(path,mapping[url]);
        }
    }
}
var data = {
    "name":"licongwen",
    "userId":"li"
}
//cors跨域处理
app.use(cors({
    origin:'*',
    exposeHeaders:['WWW-Authenticate','Server-Authorization'],
    maxAge:5,
    credentials:true,
    allowMethods:['GET','POST','DELETE'],
    allowHeaders:['Content-Type','Authorization','Accept','token']
}))
router.get('/',async (ctx,next)=>{
    ctx.body = 'licongwen';
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen('3001',()=>{
    console.log('server run at port 3001');
});