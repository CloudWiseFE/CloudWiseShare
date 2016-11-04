指令:

用于转换DOM元素的内部或者对DOM元素进行一些行为上的绑定；能最大程度减少DOM操作，实现数据绑定，与业务逻辑进行交互；
通常会把一些组件以指令的形式来写。

指令的四种表现形式：

1. 作为一个新的HTML元素来使用(E)。

        <my-dir></my-dir>
1. 作为一个元素的属性来使用(A)

        <div my-dir></div>
1. 作为一个元素的类来使用(C)

        <div class="my-dir"></div>
1. 作为注释来使用(M)

        <!--directive: my-dir -->

指令主要分为两种：内置指令和自定义指令。

内置指令：他们都是作用于HTML之上的，通过添加属性的方式来实现的。

    <div ng-app=''></div>

简单看一下一些常用的指令:
1. ng-app
2. ng-controller
3. ng-bind:将作用域（$scope）中的值绑定到元素的 innerHTML 上，其效果会比通过表达式绑定的方式更友好;用于改进表达式 {{}} 所带来的加载时表达式符号暂时性展现的问题。
4. ng-repeat
5. ng-class
6. ng-cloak
7. ng-show和ng-hide
8. ng-if
9. ng-change,ng-click,ng-submit......

此处不重点介绍，重点说明自定义指令：

那么具体如何来定义呢？如下：

    js:
    angular.module('moduleName',[]).directive('myDir',function(){
       return {
            restrict:'AECM',
            replace:true,
            template:'<button>click me</button>'
       }
    })
    html:
    <my-dir></my-dir>

先说明一下指令执行后的结果，dom结构变为

    <button>click me</button>

浏览器就可以正常的显示为按钮。

接下来介绍指令中的常用属性：

.directive()这个方法定义了一个新的指令，该方法有两个参数，第一个'myDir'就是规定指令的名字为myDir，第二个参数是返回指令对象的函数。那么在上面的代码中，该函数主要使用了两个属性来定义这个myDir指令：

1、restrict[string]这个属性，主要是用来规定指令在HTML代码中可以使用什么表现形式。默认是‘A’,通常使用：'AE','A','E'。

2、template[string or function]这个属性，规定了指令被Angular编译（compile）和链接（link）后生成的HTML标记，这个属性可以简单到只有一个HTML文本在里面，也可以特别复杂，当该属性的值为function的时候，那么该方法返回的就是代表模板的字符串，同时也可以在里面使用{{}}这个表达式。

    template: function () {
         return '<button>click me</button>';
     }
但是在一般情况下，template这个属性都会被templateUrl取代掉，用它来指向一个外部的文件地址，用法如下：

    templateUrl:'temp.html',
除了以上2个，还有以下属性比较常用：

3、scope[boolean or object]属性，该属性是用来定义指令的scope的范围，默认情况下是false，能共享父 scope 中定义的属性，例如在模版中直接使用父 scope 中的对象和属性。eg：

    <1-1>
    <body ng-app="myapp" ng-controller="myctrl">
        <input type="text" ng-model="color"/>
        <hr>
        <hello></hello>
        <script>
            var myapp = angular.module('myapp',[])
            myapp.controller('myctrl',['$scope', function ($scope) {
                $scope.color='red';
            }])
            myapp.directive('hello', function () {
                return{
                 restrict:'AECM',
                 replace:true,
                 template:'<button style="background-color: {{color}}" title="{{color}}">click me</button>',
                 link: function (scope,elements,attrs) {
                     elements.bind('click', function () {
                        scope.$apply(function () {
                            scope.color = 'blue';
                        })
                    })
                }
                }
            })
        </script>
    </body>
运行该段代码，按钮为red,修改input内容为yellow,按钮变为yellow,表明父域作用到了指令内，点击按钮，则按钮颜色和input内容都变为blue.两者结合表明共享了父域。

当你要创建一个可以重复使用的directive的时候（组件一般是复用的），就不能依赖于父scope了，因为在不同的地方使用directive对应的父scope不一样。所以我们可以让scope取以下两个值：true和{}。

- true:继承父域，且新建独立作用域；

将上面代码return{}中添加scope:true,执行后按钮为red,修改input内容为yellow,按钮变为yellow,表明继承父域，点击按钮后变blue,input 内容仍为red,表明指令中的scope只作用于该指令。


- 对象{}：不继承父域，且新建独立作用域

将上面代码return{}中添加scope:{},执行后按钮无色,修改input内容为yellow,按钮仍无色,表明不继承父域，点击后变blue,input 内容仍为red,表明指令中的scope只作用于该指令。

如果我想将父scope中的某些属性传递给directive的scope怎么办呢？

directive 在使用隔离 scope 的时候，提供了三种方法同隔离之外的地方交互:

1：使用@实现单向绑定，
    代码做如下改动：

    <1-2>
    <body ng-app="myapp" ng-controller="myctrl">
        <input type="text" ng-model="color"/>
        <input type="text" ng-model="name"/>
        <hr>
        <hello child-color="{{color}}"></hello>
        <script>
            var myapp = angular.module('myapp',[])
            .controller('myctrl',['$scope', function ($scope) {
                $scope.color='red';
                $scope.name = 'claire'
            }])
            .directive('hello', function () {
                return{
                    restrict:'AECM',
                    replace:true,
                    template:'<button style="background-color: {{color}}" title="{{color}}">click me，{{name}}</button>',
                    scope:{
                       //childColor就是原来元素中的child-color属性
                       color: '@childColor',
                    },
                    link: function (scope,elements,attrs) {
                        elements.bind('click', function () {
                            scope.$apply(function () {
                                scope.color = 'blue';
                            })
                        })
                        scope.name = 'happily';
                    }
                }
            })
        </script>
    </body>

这里有两点需要注意：

- scope里的属性color代表的是模板{{}}这个表达式里面的color，两者必须一致。

- scope里的属性color的值，也就是@后面的childColor，表示的是下面的HTML元素里的属性child-color，所以这两者也必须一致，

    当这里的属性名和模板里表达式{{}}里面使用的名称相同的话，就可以省略掉@后面的属性名了，然后写成下面的形式。

        scope:{
          color:'@'
        }

    执行<1-2>代码，按钮为red，按钮内的name为happily,input分别为red和claire,表明指令内的name为独立的，color继承了父域的color，点击按钮，颜色变为blue，但是父域的input仍是red,表明指令的color只作用于内部，所以说@是单项绑定
2. =和&与@差不多，只不过=进行的是双向的数据绑定，模板中不需要{{}}；不论模板还是父作用域上的属性的值发生改变都会使另一个值发生改变，而&是绑定函数而已。

    以下是双向绑定的情况：

        <body ng-app="myapp" ng-controller="myctrl">
            <input type="text" ng-model="color"/>
            <input type="text" ng-model="name"/>
            <hr>
            <hello child-color="{{color}}" other-name="name"></hello>
            <script>
                var myapp = angular.module('myapp',[])
            .controller('myctrl',['$scope', function ($scope) {
                $scope.color='red';
                $scope.name = 'claire'
            }])
            .directive('hello', function () {
                return{
                    restrict:'AECM',
                    replace:true,
                    template:'<button style="background-color: {{color}}" title="{{color}}">click me，{{name}}</button>',
                    scope:{
                        color: '@childColor',
                        name:'=otherName'
                    },
                    link: function (scope,elements,attrs) {
                        elements.bind('click', function () {
                            scope.$apply(function () {
                                scope.color = 'blue';
                            })
                        })
                        scope.name = 'happily';
                    }
                }
            })
        </script>
        </body>

        //父域的name发生变化，表明name是双向绑定的。


4、replace[boolean]属性,这个属性用来规定生成的HTML内容是否会替换掉定义此指令的HTML元素。

5、require[string]属性，

require选项的值可以分别用前缀？、^ 和？^进行修饰，也可以不修饰。如果不进行修饰，比如require:'thisDirective'，那么require只会在当前指令中查找控制器；

如果想要指向上游的指令，那么就是用^进行修饰，比如require:'^parentDirective'，如果没有找到，那就会抛出一个错误；

如果使用？前缀，就意味着如果在当前指令没有找到控制器，就将null作为link的第四个参数；

那么，如果将？和^结合起来，我们就可以既指定上游指令，又可以在找不到时，不抛出严重的错误；

6、controller[string or function]和require[string or string[]]参数,当我们想要允许其他的指令和你的指令发生交互时，我们就需要使用 controller 函数。如下写法：

    controller:function($scope){
                $scope.count=0;
                this.addCount=function(){
                    $scope.$apply(function(){
                        $scope.count++;
                    })
                }
            }
当另一个指令想要交互时，它需要声明它对你的指令 controller 实例的引用(require):require:'你的指令名'，然后在link里通过参数ctrl进行交互（在后面link讲到）

7、link[function]属性,写业务逻辑的地方，一些方法的定义和数据操作，dom操作。
写法：

    link:function(scope,elem,attrs,ctrl){}

    scope:在我们没有为指令定义scope属性的时候，那么他代表的就是父controller的scope,如果定义了就是自己的作用域。

    elem:通俗的说就是template中的最外层Dom元素。

    attrs:该指令所在元素的属性,是个对象，使用：attrs.color.

    contr: 需要和require属性一起使用,用于调用其他指令的方法(其他指令里的controller),指令之间的互相通信.ctrl.方法名().


8、compile[function]属性,写法

    compile:function(elem,attrs){
        //返回一个link函数
        return function(scope,elem,attrs,ctrl){

        }
    }

link和compile：

二者都用于把directive渲染出来。

compile在编译前执行，负责把template变成一个完整的DOM结构。

link在编译后执行，负责根据controller和scope里的东东，给compile得到的DOM注册事件、关联数据，

粗暴理解的话，可以认为一个管DOM准备，一个管数据操作。

一般用link就够了，compile用的少些，所以没有深入理解，不作过多解释。

还有一些其他的属性，不太常用。

