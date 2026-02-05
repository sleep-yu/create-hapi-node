# {{projectName}}

Hapi + TypeScript 三层架构项目

## 项目结构

src/
├── routes/          # 路由层 - 定义路由、参数校验
├── services/        # 服务层 - 业务逻辑
├── clients/         # 客户端层 - 调用外部服务
├── interfaces/      # 类型定义
├── enum/           # 枚举定义
├── utils/          # 工具类
└── validates/      # 校验规则

## 安装依赖

```bash
npm install
```

## 开发

npm run dev

## 构建

npm run build

## 启动

npm start

## 访问
服务启动后访问：http://localhost:5000

示例接口：http://localhost:5000/example?name=test