const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next)=>{
    const start = Date.now();
    console.log('>>>111')
    await next();
    const ms = Date.now()-start;
    //ctx.set('X-Response-Time',`${ms}ms`);
    console.log('<<<111')
})
app.use(async (ctx,next)=>{
    const start = Date.now();
    console.log('>>>222')
    await next();
    const ms = Date.now()-start;
    //console.log(`${ctx.method} ${ctx.url}-${ms}`);
    console.log('<<<222')
})
app.use(async (ctx,next) =>{
    ctx.body = 'Hello World';
    console.log('>>>333');
    await next();
    console.log('<<<333')
    
})
app.listen(3002);