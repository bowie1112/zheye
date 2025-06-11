# JavaScript 手撕题练习

这个项目用于练习 JavaScript 常见的手撕题，如 call、apply、bind 等方法的实现。

## 项目结构

```
js-handwriting/
├── src/                # 源代码目录
│   ├── call.js        # call 方法实现（在这里编写你的代码）
│   ├── call.test.js   # call 方法测试
│   └── solutions/     # 参考答案目录
│       └── call.js    # call 方法参考答案
├── package.json       # 项目配置
└── babel.config.js    # Babel 配置
```

## 练习指南

1. 在 `src` 目录下找到要练习的题目（如 `call.js`）
2. 根据注释提示，在函数体内实现你的代码
3. 运行测试验证你的实现是否正确
4. 如果需要查看参考答案，可以查看 `solutions` 目录下的对应文件

## 安装依赖

```bash
npm install
```

## 运行测试

```bash
# 运行所有测试
npm test

# 监视模式运行测试
npm run test:watch
```

## 练习题目

- [ ] call 方法
- [ ] apply 方法
- [ ] bind 方法
- [ ] new 操作符
- [ ] Promise
- [ ] 防抖/节流
- [ ] 深拷贝
- [ ] 数组扁平化
- [ ] 更多...

## 注意事项

- 参考答案在 `solutions` 目录下，建议先自己实现，遇到困难再查看
- 每个题目都有对应的测试用例，可以通过运行测试来验证你的实现
- 如果遇到问题，可以查看测试用例来理解题目的要求

## 贡献

欢迎提交 Pull Request 来添加更多的手撕题实现！ 