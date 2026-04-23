## nest学习

这个项目是给 Nest 初学者用的练习项目。

学习顺序建议：

1. `main.ts`：应用启动、全局管道
2. `module / controller / service`：模块化、路由、依赖注入
3. `dto`：请求参数校验
4. `auth`：Guard、JWT、`req.user`
5. `common`：统一响应、统一异常处理
6. `mongoose`：从假数据过渡到真实数据库

## 配置模块

项目已经接入 `ConfigModule`，可以从 `.env` 读取配置。

当前用到的配置：

- `PORT`：服务启动端口
- `JWT_SECRET`：JWT 签名和校验密钥

启动前可以先参考 `.env.example` 创建自己的 `.env`。

## Mongoose 学习入口

为了方便对照 `ww-server`，项目里补了一套最小的 Mongoose 示例代码：

- `src/users/schemas/user.schema.ts`
- `src/users/users.mongo.module.example.ts`
- `src/users/users.mongo.service.example.ts`

先记住这条链：

1. `@Schema()` 和 `@Prop()` 定义数据结构
2. `MongooseModule.forFeature()` 注册 model
3. `@InjectModel()` 把 model 注入到 service
4. `findOne()` / `findById()` / `save()` 完成最常见的查和存

这些示例文件现在是“学习版对照代码”，不会影响你当前能跑通的基础练习接口。
