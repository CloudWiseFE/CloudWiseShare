#SeaJs (一)

###SeaJs 是什么？

* **SeaJS**是一个遵循CommonJS规范的JavaScript模块加载框架，

* 可以实现JavaScript的模块化开发及加载机制。

* 与jQuery等JavaScript框架不同，**SeaJS**不会扩展封装语言特性，而只是实现JavaScript的模块化及按模块加载。

###SeaJs 可以做什么？

可以解决命名冲突、文件依赖

###简单说明 它带来的好处

####传统模式 vs SeaJS模块化

假设我们现在正在开发一个Web应用TinyApp，我们决定在TinyApp中使用jQuery框架。TinyApp的首页会用到module1.js，module1.js依赖module2.js和module3.js，同时module3.js依赖module4.js。

> ####传统开发
> 
> 使用传统的开发方法，各个js文件代码如下：
> 
	//module1.js
	var module1 = {
	    run: function() {
	        return $.merge(['module1'],
	        $.merge(module2.run(), module3.run()));
	    }
	}
>
	//module2.js
	var module2 = {
	    run: function() {
	        return ['module2'];
	    }
	}
>	
	//module3.js
	var module3 = {
	    run: function() {
	        return $.merge(['module3'], module4.run());
	    }
	}
>	
	//module4.js
	var module4 = {
	    run: function() {
	        return ['module4'];
	    }
	}

>此时index.html需要引用module1.js及其所有下层依赖（注意顺序）：
>
	<!DOCTYPE HTML>
	<html lang="zh-CN">
	<head>
	    <meta charset="UTF-8">
	    <title>TinyApp</title>
	    <script src="./jquery-min.js"></script>
	    <script src="./module4.js"></script>
	    <script src="./module2.js"></script>
	    <script src="./module3.js"></script>
	    <script src="./module1.js"></script>
	</head>
	<body>
	    <p class="content"></p>
	    <script>
	        $('.content').html(module1.run());
	    </script>
	</body>
	</html>
>
>随着项目的进行，js文件会越来越多，依赖关系也会越来越复杂，使得js代码和html里的script列表往往变得难以维护。
>

##SeaJs 模块

> ####SeaJS模块化开发
下面看看如何使用SeaJS实现相同的功能。
首先是index.html：
> 
可以看到html页面不再需要引入所有依赖的js文件，而只是引入一个sea.js，sea.js会处理所有依赖，加载相应的js文件，加载策略可以选择在渲染页面时一次性加载所有js文件，也可以按需加载（用到时才加载响应js），具体加载策略使用方法下文讨论。
index.html加载了init模块，并使用此模块的initPage方法初始化页面数据，这里先不讨论代码细节。
下面看一下模块化后JavaScript的写法：
>
	//jquery.js
	define(function(require, exports, module) = {
>	
	    //原jquery.js代码...
>	
	    module.exports = $.noConflict(true);
	});
>	
	//init.js
	define(function(require, exports, module) = {
	    var $ = require('jquery');
	    var m1 = require('module1');
>	
	    exports.initPage = function() {
	        $('.content').html(m1.run());    
	    }
	});
>	
	//module1.js
	define(function(require, exports, module) = {
	    var $ = require('jquery');
	    var m2 = require('module2');
	    var m3 = require('module3');
>	
	    exports.run = function() {
	        return $.merge(['module1'], $.merge(m2.run(), m3.run()));    
	    }
	});
>	
	//module2.js
	define(function(require, exports, module) = {
	    exports.run = function() {
	        return ['module2'];
	    }
	});
>	
	//module3.js
	define(function(require, exports, module) = {
	    var $ = require('jquery');
	    var m4 = require('module4');
>	
	    exports.run = function() {
	        return $.merge(['module3'], m4.run());    
	    }
	});
>	
	//module4.js
	define(function(require, exports, module) = {
	    exports.run = function() {
	        return ['module4'];
	    }
	});


乍看之下代码似乎变多变复杂了，这是因为这个例子太简单，如果是大型项目，SeaJS代码的优势就会显现出来。不过从这里我们还是能窥探到一些SeaJS的特性：

* 1.是html页面不用再维护冗长的script标签列表，只要引入一个sea.js即可。
* 2.是js代码以模块进行组织，各个模块通过require引入自己依赖的模块，代码清晰明了。
* 通过这个例子朋友们应该对SeaJS有了一个直观的印象，下面本文具体讨论SeaJS的使用。

#SeaJs (二)

### **Seajs** 下载安装

**seajs**项目 目前托管在github上，主页https://github.com/seajs/seajs/

可以看到build下面sea.js(已压缩)和sea-debug.js(未压缩)

> 我个人习惯用node的npm

> npm install seajs --sava-dev

在页面里直接引入sea.js 我们就可以开始开发了

### **Seajs** 基本开发原则

使用**Seajs**开发javascript的基本原则就是：一切皆为模块

每个模块都定义在一个单独js文件中

##模块的定义及编写

### **Seajs** 模块定义函数define

SeaJS中使用“define”函数定义一个模块。因为SeaJS的文档并没有关于define的完整参考，所以我阅读了SeaJS源代码，发现define可以接收三个参数：

	/**
	* Defines a module.
	* @param {string=} id The module id.
	* @param {Array.|string=} deps The module dependencies.
	* @param {function()|Object} factory The module factory function.
	*/
	fn.define = function(id, deps, factory) {
	    //code of function…
	}

define对于不同参数个数的解析规则如下：

* 如果只有一个参数，则赋值给factory。
* 如果有两个参数，第二个赋值给factory；第一个如果是array则赋值给deps，否则赋值给id。
* 如果有三个参数，则分别赋值给id，deps和factory。

但是，包括SeaJS的官方示例在内几乎所有用到define的地方都只传递一个工厂函数进去，类似与如下代码：

	define(function(require, exports, module) {
	    //code of the module...
	});

>个人建议遵循SeaJS官方示例的标准，用一个参数的define定义模块。那么id和deps会怎么处理呢？

>id是一个模块的标识字符串，define只有一个参数时，id会被默认赋值为此js文件的绝对路径。
>
>如example.com下的a.js文件中使用define定义模块，则这个模块的ID会赋值为 http://example.com/a.js ，没有特别的必要建议不要传入id。deps一般也不需要传入，需要用到的模块用require加载即可。

###工厂函数factory解析

在只传递一个参数给define时（推荐写法），这个参数就是工厂函数，此时工厂函数的三个参数分别是：

* require——模块加载函数，用于记载依赖模块。

* exports——接口点，将数据或方法定义在其上则将其暴露给外部调用。

* module——模块的元数据。

>下面说一下module。module是一个对象，存储了模块的元信息，具体如下：
>
1.module.id——模块的ID。
>
2.module.dependencies——一个数组，存储了此模块依赖的所有模块的ID列表。
>
3.module.exports——与exports指向同一个对象。

	define(function(require, exports, module) {
	    var a = require('a'); //引入a模块
	    var b = require('b'); //引入b模块

	    var data1 = 1; //私有数据

	    var func1 = function() { //私有方法
	        return a.run(data1);
	    }

	    exports.data2 = 2; //公共数据

	    exports.func2 = function() { //公共方法
	        return 'hello';
	    }
	});


##模块的载入和引用

###模块的寻址算法

绝对地址——给出js文件的绝对路径。

	require("http://example/js/a");

相对地址——用相对调用载入函数所在js文件的相对地址寻找模块。

	require("./c");

基址地址——如果载入字符串标识既不是绝对路径也不是以”./”开头，则相对SeaJS全局配置中的“base”来寻址，这种方法稍后讨论。

注意上面在载入模块时都不用传递后缀名“.js”，SeaJS会自动添加“.js”。但是下面三种情况下不会添加：
载入css时

	require("./module1-style.css");


