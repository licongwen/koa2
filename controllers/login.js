
const jwtKoa = require('koa-jwt');
const jwt = require('jsonwebtoken')
const secret = 'jwt login';
//链接mongodb数据库
const monk = require('monk');
const murl = 'localhost:27017/login'
const db = monk(murl);

var login_fn = async(ctx,next)=>{
    var data =[];
    var id = ctx.request.body.id;
    var password = ctx.request.body.password;
    var token = jwt.sign({userId:id},secret,{expiresIn:'1h'});
    //数据库查找操作
    await db.get('login').find({"id":id}).then((res)=>{
        data = res;
    })
    db.close();
    data.forEach((item,index,arr)=>{
        console.log(item.id+','+item.password);
        if(id===item.id && password===item.password){
            ctx.response.body={
                id:item.id,
                name:item.name,
                email:item.email,
                token
            };
        }else{
            ctx.status = 401;
        }
    })
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
    //数据库插入操作
    db.get('login').insert([
        {
            id:id,
            password:password,
            name:name,
            email:email
        }
    ]);
    db.close();
    ctx.response.body="register successful";
    console.log(id+','+name+','+password+','+email);
    await next();
};

module.exports = {
    'POST /login':login_fn,
    'POST /register':register_fn 
}