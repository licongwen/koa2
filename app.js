//import { request } from 'https';

const Koa = require('koa')
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const router = require('koa-router')();
const cors = require('koa2-cors');
const jwtKoa = require('koa-jwt');
const jwt = require('jsonwebtoken')
const secret = 'jwt login';
const app = new Koa();
var data = {
    //"Token":"6V5InO6aoz6nFmwH9r6DB2Vbmk8O4-C-wweQRd-tUlEpAVW54wRAKVyGMjZhnuVwcG0thWaz7cKxKAqWr1qbmkX4juYvCRCYSG5aaYZcUGGJ_MMeXuX8UVe1MBiMVHMszc1rER1xvYnuINtGWEQEKAE0SRCeKl6Fx0WsRUspDGZey7_BUD-omDJ4wZgl5_OD8BUQdTOwXNzbIc-B_PskziA45Yq9CqPsctYkz1Yh1Cr96JJkuBqe-NyfnzFpzn1m8WayuTxnvIpvNRJXYH50XNrRJ_xGzUOfJOR789PDkP6wIvf0YMmm_DzRV3glDieM-QdI5FQd--q0Un6IM43-PUujwKnrIiIWkYpFamyJ1REQWpCBEYSwvXYOjkQbJ-81csMWULHwJkTDY61gg-6wLFOPQMcHh1om",
    "name":"licongwen",
    "userId":"li"
}
app.use(cors({
    origin:'*',
    exposeHeaders:['WWW-Authenticate','Server-Authorization'],
    maxAge:5,
    credentials:true,
    allowMethods:['GET','POST','DELETE'],
    allowHeaders:['Content-Type','Authorization','Accept','token']
}))
router.post('/login',async (ctx,next)=>{
    var id = ctx.request.body.id;
    var password = ctx.request.body.password;
    var token = jwt.sign({userId:id},secret,{expiresIn:'1h'});
    if(id === data.userId && password ==='123456'){
        ctx.body = {
            "name":"licongwen",
            "userId":"li",
            "token":token
        }
    }else{
        ctx.status = 401;
    }
    console.log(`${id} ${password}`);
    await next();
})
router.get('/content',async (ctx,next)=>{
    var token = ctx.headers.token;//获取token
    //console.log(token);
    if(token){
        ctx.body = [
            {"name":"one","age":23},
            {"name":"two","age":24}
        ]
    }
        

    await next();
})
router.get('/',async (ctx,next)=>{
    ctx.body = 'licongwen';
})
app.use(bodyparser());
app.use(router.routes());
// app.use(router.allowedMethods());
app.listen('3001');