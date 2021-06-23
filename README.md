# uni-app-template
uni-app + U-view商城基础模板及分包，接口api封装，icon，基础登录模块
### 一、技术栈
uniapp<br />
sass<br />
javaScript<br />
vuex <br />
uView <br />
### 二、项目结构
```
├─apis                    -------------api文件
|    |——xxxA              -------------取对应的页面名
|    |  |——xxxA.js        -------------对应的页面xxx.js 
|    ........... 
├─common                  -------------公用js、css
|    |——css
|    |   |——rest.scss     -------------重置样式
|    |   |——classComm.scss -------------通用的样式类
|    |——js
|    .......              
├─node_modules            -----------第三方依赖
├─components              -----------项目组件文件夹
├─pages                   -----------源码目录
|   |——xxxA               -----------根据页面命名
|   |   |——xxxA.vue      -----------同父文件命名
|   ...... 
|——subpages               -----------需要分包的文件
|      |——xxxA            -----------根据页面命名
|      |    |——xxxA.vue   -----------同父文件命名
|      ......
|——static
|     |——xxxA             -------------取对应的页面名
|     ..........
|——unpackage              -------------项目编译后的页面
|——utils                  -------------工具类文件
|    |——request           -------------request封装工具
|    ..........
|——App.vue                -----------页面入口文件
|——main.ts                -----------入口文件，加载公共组件
|——manifest.json          -----------配置文件
|——package.json           -----------依赖文件
|——pages.json             -----------项目相关配置（页面路径、tabbar、页面标题等等）
|——uni.scss               -----------全局样式变量
|——router.js              -----------路由相关(守卫配置)
|——vue.config.js          -----------vue相关