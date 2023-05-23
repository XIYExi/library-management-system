# 图书管理系统

孩子不懂事，随便写着玩的

<img width="50%" src="https://s1.ax1x.com/2023/05/21/p9IY8aj.jpg" alt="p9IY8aj.jpg" border="0" />

---

## 题目七 图书馆管理信息系统一一图书借阅子系统

- 系统简介：

> 图书管理系统需要满足来自三方面的需求，这三个方面分别是图书借阅者、图书馆工作人员和图书馆管理人员。图书借阅者的需求是查询图书馆所存的图书、个人借阅情况及个人信息的修改；图书馆工作人员对图书借阅者的借阅及还书要求进行操作，同时形成借书或还书报表给借阅者查看确认；图书馆管理人员的功能最为复杂，包括对工作人员、图书借阅者、图书进行管理和维护，及系统状态的查看、维护并生成催还图书报表。

（1）管理系统具有多个管理员，管理员可以使用不同的用户名和密码进入管理系统，并可以修改自己的密码；

（2）进入系统后可以重新登录该系统，可以退出系统，断开连接等；

（3）在系统中可以对数据库进行简单的操作；

（4）可以进行借书、还书及查询相应的信息等功能；

（5）本系统可以给会员一个标识自己的凭证，例如会员卡，便于管理。还应可以对会员卡进行编辑、打印等操作；

（6）最基本的功能还应具有可以编辑图书，录入、删除图书资料，录入、删除会员资料；

（7）做个借期超过要求罚款的功能，不同类的书罚款各不相同；

（8）报表打印：所有图书、借出图书、库存图书、所有读者；

（9）图书管理系统软件还必须具有导入,导岀数据库功能。方便即时更新和修改；

（10）软件系统安全上要有一定的保障；

	限制条件：

（1）可随时查询出可借阅图书的详细情况，如图书编号（bno）、图书名称（bna）、出版日期(bda)、图书出版社（bpu）、图书存放位置（bpl)、图书总数量（bnu）等，这样便于学生选借。

（2）为了唯一标识每一学生，图书室办借书证需如下信息：学生姓名(sna)、学生系别（sde）、学生所学专业（ssp）、借书上限数（sup）及唯一的借书证号（sno）。

（3）每学生一次可借多本书，但不能超出该生允许借阅上限数，每个学生可多次借阅，允许重复借阅同一本书。


**没完全按照上面写，建表的时候忘了给书籍加分类，所有扣款统一为 逾期天数 \* 0.5元**

编辑和打印会员卡属实离谱，把envelope的最小系统搬过来了，使用dom-to-image导出卡面图片，由于通过图床给src链接报跨域错误，
这里正常的流程应该是通过Upload组件上传服务器，然后使用服务器的图片这样就不会报跨域，但是偷懒了，直接用本地的水獭图片写死了。


---

## 主要技术：

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