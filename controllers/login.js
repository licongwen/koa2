
const jwtKoa = require('koa-jwt');
const jwt = require('jsonwebtoken')
const secret = 'jwt login';

var login_fn = async(ctx,next)=>{
    var id = ctx.request.body.id;
    var password = ctx.request.body.password;
    var token = jwt.sign({userId:id},secret,{expiresIn:'1h'});
    if(id==='li' && password==='123456'){
        ctx.response.body={
            name:'licongwen',
            userId:'li',
            token
        }
    }else{
        ctx.status = 401;
    }
    console.log(`${id} ${password}`);
    await next();
};
var register_fn = async (ctx,next)=>{
    var {
        id,
        name,
        password,
        email
    }=ctx.request.body;
    ctx.response.body="register successful";
    console.log(id+','+name+','+password+','+email);
    await next();
}
module.exports = {
    'POST /login':login_fn,
    'POST /register':register_fn 
}