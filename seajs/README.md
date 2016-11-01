#SeaJs

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




