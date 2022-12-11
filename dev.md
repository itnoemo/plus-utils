# 开发指南

## 技术介绍
> * typescript: 用来约束方法参数等规范
> * typedoc: 生成方法静态文档,[具体参考](https://typedoc.org/guides/overview/)
> * jest: 方法测试用例,[具体参考](https://jestjs.io/docs/getting-started)
> * rollup: npm和cdn方式文件打包工具,[具体参考](https://rollupjs.org/guide/en/#overview)
> * eslint: 编码规范约束,[具体参考](http://eslint.cn/)
> * commitlint: 提交代码记录备注约束,[具体参考](https://commitlint.js.org/)
> * conventional-changelog: 通过提交记录自动生成更新日志,[GitHub](https://github.com/conventional-changelog/conventional-changelog)

## 项目运行
> * yarn: 依赖包管理工具
> * node: v16.16.0(和编译部署时所用的node环境保持一直)
> * package.json中scripts命令介绍
  -- dev: 生成文档并通过http-server启用本地服务
  -- doc: ci(持续集成)时运行的命令
  -- build: npm和cdn文件生成
  -- test: 运行测试用例
  -- changelog: 通过提交记录生成更新日志
  -- version: 自动修改版本号并提交文档记录
  -- eslint: 检查文件代码规范
  -- mdToHtml: 提交记录转html格式

## 概念解释
> * 原子: 单一事件，需要放在src->tools下，不对外暴露
> * utils: 独立原子或复合原子或原子拓展，对外暴露

## 升级原则
> * 不影响之前的业务，业务内新的工具方法采用ts,参照src->utils里面进行书写
> * 测试驱动，原则上每个新添加的方法都要有测试用例，覆盖率为100%
> * 以原子(单一事件)作为基础赋能utils方法(独立原子或复合原子或原子拓展)对外暴露
> * 方法分类创建和保存并以分类为单位对外暴露，比如有个取平方根的方法，属于计算类，那么需要在utils->Math->sqrt.ts文件

## 项目设计
> * [具体可查看](http://wiki.vhallops.com/pages/viewpage.action?pageId=310542846)


## 开发流程(例: 开平方根)
> * 启项目，nvm install 16.16.0 && nvm use 16.16.0 && npm i yarn -g && yarn && yarn dev
> * src下创建一个Math文件夹，并创建一个index.ts(math下的所有方法对外统一暴露)和sqrt.ts(具体的方法)
```javascript
// sqrt.ts
/**
* 计算一个数的开平方根
* @param x 目标值
* @returns 返回该目标值的开平方根的值
* @example
*
* import { math } from '@vhall/utils';
* math.sqrt(16);
* // => 4
*/
export default function(x: number): number {
    return Math.sqrt(x);
}
```
```javascript
// Math->index.ts
import sqrt from "./sqrt";
export {
	sqrt
};
```
```javascript
// src->index.ts
import * as math from './utils/Math';
export {
    math
};
```
```javascript
// test->math.test.js
import {math}  from '../src/index';
test("16开平方根是4", () => {
    expect(math.sqrt(4)).toBe(4);
});
```
> * yarn dev 本地查看对应文档
> * 使用git commit来提交代码
> * npm version [major(大版本)/minor(小版本)/patch(小修复)]

## 规范约束
* 在对应分类的文件夹下的 `index.ts` 文件中添加方法即可(注意：请参考原有方法规则，必须要有方法、参数解释与范例，且 Example 的内容需使用 \`ts 包起来，也可以参考原因的范例，一个 Function 写一个 `* Example:` 注释即可，多个示例代码时换行写入并都使用 \` 包起来即可。)。[具体可参考官方demo](https://typedoc.org/tags/example/)
* 创建分类文件夹后，请添加文件头说明此分类主要内容, 并创建一个 `index.ts` 将分类下的其他防范统一 `export {}` 导出
* 具体方法统一使用 `export default function functionName() {}` 导出方法，不要使用 `export const functionName = function() {}` 或者箭头函数，确保每次提交时 `export default function` 的数目与 `* Example:` 的数目一致。
* 在 `src/index.ts` 中 `export {[分类名]}` 统一对外导出
* `package.json` 修改版本号 `push` 到 `publish` 分支即可发布新版本。
* `commit`时需要按照 `commitlint规范`填写提交记录，[commitlint规范参考](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

## commitLint规范
* feat: 新功能
* fix：修补bug
* docs：表示更新文档
* style：表示修改样式（不影响代码运行变动）
* refactor: 重构（既不是新增功能，也不是修改bug的变动）
* test：增加测试
* chore: 构建过程或辅助工具的变动
* merge：合并分支
* perf：优化新能提升
* revert：回滚到上一个版本
* build：构建
