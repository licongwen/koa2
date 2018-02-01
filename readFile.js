const Koa = require('koa');
const fs = require('fs');
const app = new Koa()

const main = (ctx)=>{
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./template/template.html');
}
app.use(main);
app.listen(3003,()=>{
    console.log('app run at port 3003!');
})