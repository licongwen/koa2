var content_fn = async(ctx,next)=>{
    var token = ctx.headers.token;
    if(token){
        ctx.response.body=[
            {name:'童长青',age:28},
            {name:'吴世宝',age:26},
            {name:'漏鸣杰',age:26}
        ]
    }
    await next();
}
module.exports ={
    'GET /content':content_fn
}