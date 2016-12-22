### seajs3.0.1在safari上的bug
tsb项目中有人更新了seajs版本到3.0.1，导致页面资源加载长达几分钟，着急忙慌找bug，最后在seajs的issues上找到了同样的问题：

[https://github.com/seajs/seajs/issues/1681](https://github.com/seajs/seajs/issues/1681)

贴出里面的解决办法：

parseDependencies() 函数里 dealWord() 函数的问题：

dealWord()里原先有这么一段

3.0.0 版本

```js
modName = /^require\s*\(\s*(['"]).+?\1\s*\)/.test(s2)
if(modName) {
  r = /^require\s*\(\s*['"]/.exec(s2)[0]
  index += r.length - 2
}
else {
  index += /^[\w$]+(?:\s*\.\s*[\w$]+)*/.exec(s2)[0].length - 1
}
```
3.0.2 版本

```js
modName = /^require\s*(?:\/\*[\s\S]*?\*\/\s*)?\(\s*(['"]).+?\1\s*[),]/.test(s2)
if(modName) {
  r = /^require\s*(?:\/\*[\s\S]*?\*\/\s*)?\(\s*['"]/.exec(s2)[0]
  index += r.length - 2
} else {
  index += /^[\w$]+(?:\s*\.\s*[\w$]+)*/.exec(s2)[0].length - 1
}
```

貌似问题出在第一句的正则表达式上，用了 \1 来 back reference (["'])，可能safari下backtrace性能比较弱？然后这个地方执行次数和源文件的 word 数正相关，遇到很大的文件就会非常耗时。

把第一句换成：

```js
modName = /^require\s*(?:\/\*[\s\S]*?\*\/\s*)?\(\s*['"].+?['"]\s*[),]/.test(s2)
```

似乎就没有问题了。

