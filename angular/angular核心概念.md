**angular框架**：angular是一个十分明显的mvc框架，最初不明白什么是mvc，写了一些之后，依稀明白一点.  在Angular应用中，视图(v)就是DOM，控制器(c)就是负责业务逻辑和交互的，模型数据(m)存储在对象属性中。

**angular核心概念**：
- module(模块)：

    代码模块化：通过模块对页面进行业务上的划分,根据不同的功能划分不同的模块。

    将重复使用的指令或者过滤器之类的代码做成模块，方便复用

    语法：angular.module('模块名',[])

    ==注意点==：第二个参数是个数组,这个数组里的每一个元素，是我们当前模块依赖的其他模块，即便我们不依赖其他的模块，也需要传递一个空数组，因为如是不传第二个参数的话，angular.module('模块名')这个方法的作用就会变为获取一个名为"模块名"的模块对象，在手动启动中就是这样引用的:angular.bootstrap(document,'模块名')，最好放在$(document).ready(function(){})里。。

    在模板中给一个元素添加ng-app='模块名'，告诉anuglar,现在由我们自己创建的这个模块来管理页面，该方法为手动启用angular。
- controller(控制器)：

    为应用中的模型设置初始状态；并添加自定义行为。

    通过$scope对象把数据模型或者函数行为暴露给视图；

    监视模型的变化，做出相应的动作

    语法：

        var app = angular.module('模块名',[])
        app.controller('控制器的名字',function($scope){
            // 在这个function里写我们具体想要执行的代码
            // $scope 就是用来存储我们的数据模型.
        })

    我们需要在页面上使用了数据模型的元素父级元素上加上ng-controller指令，并给这个指令一个属性值，这个值就是我们创建的“控制器名字”。

    controller可以运用angular的依赖注入特性注入服务，常用2种方法：

        <1-1>
        <body ng-app="myApp" ng-controller="myController">
            <p>
                大家好，我是{{name}};
            </p>
            <input type="text" ng-model="name"/>
            <!--直接引入angular框架即可-->
            <script src="bower_components/angular/angular.min.js"></script>
            <script>
                var app = angular.module('myApp',[]);
                //推断式注入依赖,依赖注入时需要什么服务，就注入什么
                app.controller('myController', function ($scope，$filter) {
                    $scope.name="Claire";
                });
                //显式注入依赖，依赖注入时需要什么服务，就注入什么
                /*app.controller('myController', ['$scope','$filter',function (a,b) {
                    a.name="Claire";
                }]);*/
            </script>
        </body>


    controller定义属性的写法：

        //可以是字符串，数组，数字，对象...
        $scope.name = customObj;
        name和模板中的ng-modul='name'的name,模板中的{{name}}是关联的。

    controller定义方法的写法：

        $scope.方法名 = function(){}
        //模板中调用方法，<button ng-click="方法名()"></button>

- 双向数据绑定

        <input type="text" ng-model="name" />
    改变视图中的数据，在input中输入内容，同时就把输入的值赋给了controller中$scope.name，如果在js中操作数据更改了$scope.name，则视图中input的值也跟着改变。
- 依赖注入

    除了<1-1>代码中的注入，还可以在指令中注入，eg:

        .directive('指令名',function(){$filter,$timeout,customService})
- 指令（在directive.md中描述）
