## Promise

###一、Promise是什么？
Promise，就是一个对象，用来传递异步操作的消息,它代表了某个未来将要发生的事件（通常是一个异步操作）。
  
通俗点来说promise就是处理回调函数的一个辅助对象，可以将回调函数的操作扁平化，提高代码可读性等。
###二、为什么出现promise？
解决回调地狱问题，尤其是异步操作,比如:

```js
$.get(url,function(){
	$.get(url,function(){
    	$.get(url,function(){
        	$.get(url,function(){
            	$.get(url,function(){
                	......
                });
            });
         });
     });
});
```

像上面的例子，在js代码中有着各种形式编写的异步回调代码，想想如果在上面的每个ajax请求之后加上各种数据处理，业务逻辑操作，一大坨代码得多恶心。

不仅如此，异步回调真正的问题在于：剥夺了使用return和throw处理的能力。
1、无法return返回值:

```js
$.get(url,function(){
    $.get(url,function(){
       $.get(url,function(data){
       		......
            return data; // 然而这return并么有什么卵用
        });
    });
});
```

像上面这段代码，在异步函数里面是无法像JavaScript一个正常函数那样操作返回值的

2、无法处理错误（throw）:

```js
$.get(url,function(){
    $.get(url,function(){
        $.get(url,function(data){
            .......
            return data; // 然而这return并么有什么卵用
        });
    });
});
```

###三、使用方式：
先看效果，利用promise封装上面的ajax请求：

```js
function request(url){
    var promise = new Promise();
    $.ajax({
       type: "GET",
       url: url,
       data: "name=harry",
       success: function(data){
         promise.resolve(data); // 实现承诺
       },
       error:function(e){
            promise.reject(e);  // 拒绝承诺
       }
    });
    return promise;
}
```

封装好后，可以像下面这样去调用：

```js
request(url1).then(function(data){
    console.log('url1 success');
    console.log(data); // 请求url1的返回结果
    return request('url2');
},function(error){
    console.log('request error');
}).then(function(data){
   console.log('url2 success');
   console.log(data); // 请求url2的返回结果
});
```

通过上面可以看出，promise基本上只有一个api方法，那就是then，并且then的返回值每次都是一个promise对象，而且then方法一般接收两个可选参数，第一个是“成功操作”的函数，第二个是“失败处理”函数，其实这就对应promise的两种状态了，并且还扁平化了多次请求调用的依赖，比如请求2得等请求1结束之后才调用。

实际上promise有三种可能的状态：
* pending待承诺，promise初始状态
* fulfilled实现承诺，一个承诺成功实现状态（实现方法：resolved）
* rejected拒绝承诺，一个承诺失败的状态（实现方法：rejected）

###四、总结
对比使用Promise前后我们可以发现：

传统异步编程通过嵌套回调函数的方式，等待异步操作结束后再执行下一步操作。然而过多的嵌套导致代码可读性差、耦合度高、扩展性低。

但是通过Promise，可以扁平化代码结构，大大提高了代码可读性；并且用同步编程的方式来编写异步代码，降低了代码耦合性而提高了程序的可扩展性。

注：其实在很多当前流行的框架里早就已经在应用这个模式，比如:jquery里的deferred，angular里的$q。而且在新的JavaScript标准ES6里面也已经引入了Promise模式。



