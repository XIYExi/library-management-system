# 图书管理系统

孩子不懂事，随便写着玩的

<img width="50%" src="https://s1.ax1x.com/2023/05/21/p9IY8aj.jpg" alt="p9IY8aj.jpg" border="0" />

---

主要技术：

| 主要技术 | 作用|
|---|---|
|umi.js|前端框架|
|Typescript|写umi用的|
|Javascript|写koa中台用的|
|Ant Design|React UI组件库|
|Less|umi内置的，其实没怎么用，样式几乎没调，直接用的antd|
|koa.js|做前端中台服务器，对数据进行初步处理，这样后端基本只进行crud，不涉及数据操作|
|dva|umi内置，状态管理|
|mock.js|模拟数据用|
|axios|发送HTTP请求用|
|springboot|后端服务器框架|
|mybatis-plus|好用|
|mysql|数据库|

前端发给koa的数据全是post请求，koa发给后端的请求分两种，查数据就是get，其余涉及到数据变动的全是post，
请求携带的参数超过两个的发json，用```@RequestBody```接收，否则就直接拼接路径，在后端用
```@RequestParam```接收，如果是表格那种分页查询统一使用路径参数接收。

后端接口采用RESTful API，所以koa和前端接收写法几乎一致，后端传给koa的是一个完整的响应json，但是koa接收之后传递给
前端就没必要传json了，直接写在response.body里面，然后前端取出来判断。

---

API包内是服务器
Frontend包内是前端代码（包括koa）

Frontend根目录下app.js才是koa的入口文件，Frontend/koa里面是koa的路由文件