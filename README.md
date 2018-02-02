# 基于Koa2的一个后端简单API（待扩充）

1. git clone项目后, cnpm install 安装所有依赖(项目前端接口调用可参考另一个仓库 vue2andkoa2);
1. 数据库用的是mongoDB;
1. 安装好所有依赖后，建议安装nodemon插件，这样的话当每次js文件发生改变，服务会重新启动，自动更新;
1. controllers文件夹下login.js存放的是登陆和注册的API;
1. controllers文件夹下content.js存放的是登陆后获得内容的API;
1. app.js是项目入口，使用命令行nodemon app.js启动服务。