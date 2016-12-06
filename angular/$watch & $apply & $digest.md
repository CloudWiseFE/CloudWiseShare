##$watch & $apply & $digest
###1、$watch(watchExpression, listener, [objectEquality])
注册监听回调，在watchExpression更改时执行。

实际上angular双向数据绑定也是基于watch实现，当你写下表达式如{{ model }}时，angular会在scope模型上设置一个watcher，它用来在数据发生变化的时候更新view。

参数：

--- watchExpression：被监听对象，可以是string或者function(scope){}

--- listener：监听对象发生改变时执行的回调函数function(newValue,oldValue,scope){} ---
newValue为更改后的值，oldValue为更改前的值，scope为当前作用域

--- objectEquality：是否深度监听，如果设置为true，Angular会检查所监控的对象中每一个属性的变化。

```js
var data = {name:'harry'};
scope.$watch('data.name', function(newValue, oldValue) {
  scope.counter = scope.counter + 1;
},true);
```
###2、$apply(expression)
用于执行angular框架外部的表达式（例如：浏览器的DOM事件，setTimeout，XHR或者第三方库方法等）。

精简源码大概为：

```js
function $apply(expr) {
      try {
        return $eval(expr); // 执行当前表达式
      } catch (e) {
        $exceptionHandler(e); // 处理异常
      } finally {
        $rootScope.$digest(); // 调用rootScope的$digest
      }
    }
```


###3、$digest

处理当前scope和其childScope的所有watchers（$watch监听）。

当对model进行更改时，angular会通过调用scope.$digest()去处理所有的watcher，这些watchers会检查scope中的当前model值是否和原来的model值是否相同，如果不同，那么对应的回调函数会被执行。

注意：

1、watcher的监听也可能会改变model，$digest会调用watchers，直到没有更多监听被触发。这意味着方法调用可能会进入死循环，angular也为此做了处理，当迭代次数超出10次时，将会抛异常："Maximum iteration limit exceeded"(超出最大迭代数限制)

2、一般情况下不要在controllers和directives里调用$digest，应该使用$apply，$apply会强制执行$digest。

3、$digest最少会执行两次，因为本身默认会执行一次进行脏检查
