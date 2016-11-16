##表格排序——jQuery插件tablesorter的使用
###（推荐）特点:
####Tablesorter 是一个用来直接在浏览器上对表格数据进行排序的jQuery插件，无需再次刷新页面，支持多种单元格数据类型，例如数值、字符串、日期和自定义排序。

#####主要的特点包括：

#####多列排序
#####支持文本、URL地址、数值、IP地址、日期类型，以及自定义类型排序
#####支持 TH 元素的 ROWSPAN 和 COLSPAN 属性
#####支持第二个隐藏域排序
#####可扩展外观
#####程序简小，打包后只有 7.4K

###使用方法

###1.引入头文件

####注意：jquery一定要放在tablesorter之前

```html
<head>
	<title>jquery.tablesorter</title>
	<script language="JavaScript" type="text/javascript" src="jquery-1.8.3.min.js"></script>
	<script language="JavaScript" type="text/javascript" src="jquery.tablesorter.min.js"></script>
	<link rel="stylesheet" type="text/css" href="styles/tablesorter/tablesorter.css" media="all" />
</head>
```
###2.创建表格

####注意：表格中需要用<thead><th><thead>来指明才可以完成排序,表格加上class="tablesorter"是css设定的样式。也可以不用他们的样式,我直接用的自己产品表格的样式.

###以压测宝被压测主机表格排序为例:

```html
<table id="tableSortList" class="tablesorter ycb-table ycb-table-border ycb-table-gray ycb-margin-top-10">
    <thead>
    <tr>
        <th width="50%">名称</th>
        <th width="25%" class="header">CPU</th>
        <th width="25%" class="header">内存</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td class="text-ellipis">apache1 apache1apa</td>
            <td>20%</td>
            <td>1.24G</td>
        </tr>
        <tr>
            <td class="text-ellipis">apache1 apache1apa</td>
            <td>77%</td>
            <td>9.0G</td>
        </tr>
        <tr>
            <td class="text-ellipis">apache1 apache1apa</td>
            <td>60%</td>
            <td>400.0G</td>
        </tr>
        <tr>
            <td class="text-ellipis">apache1 apache1apa</td>
            <td>80%</td>
            <td>200.0G</td>
        </tr>
        <tr>
            <td class="text-ellipis">apache1 apache1apa</td>
            <td>44%</td>
            <td>13.4G</td>
        </tr>
        <tr>
            <td class="text-ellipis">apache1 apache1apa</td>
            <td>30%</td>
            <td>17.4G</td>
        </tr>
    </tbody>
</table>
```

###验证脚本
```js

 $(function() {
        var $tbody = "";
        var obj = [
            {
                "id": 1,
                "name": "apache1 apache1apa",
                "cpu": "20%",
                "memory": "1.24G"
            },
            {
                "id": 2,
                "name": "apache1 apache1apa",
                "cpu": "77%",
                "memory": "9.0G"
            },
            {
                "id": 3,
                "name": "apache1 apache1apa",
                "cpu": "60%",
                "memory": "400.0G"
            },
            {
                "id": 4,
                "name": "apache1 apache1apa",
                "cpu": "80%",
                "memory": "200.0G"
            },
            {
                "id": 5,
                "name": "apache1 apache1apa",
                "cpu": "44%",
                "memory": "13.4G"
            },
            {
                "id": 6,
                "name": "apache1 apache1apa",
                "cpu": "30%",
                "memory": "17.4G"
            }

        ];
        //下面使用each进行遍历
        $.each(obj, function (n, value) {
            var $trs = "";
            $trs += "<tr><td class='text-ellipis'>" + value.name + "</td> <td>" + value.cpu + "</td><td>" + value.memory +"</td></tr>";
            $tbody += $trs;
        });

        $.tablesorter.addParser({
            // set a unique id
            id: 'memorySortParse',
            is: function(s) {
                // return false so this parser is not auto detected
                return false;
            },
            format: function(s) {
                // format your data for normalization
                return s.toLowerCase().replace(/g/,'');
            },
            // set type, either numeric or text
            type: 'numeric'
        });

        $("#tableSortList").append($tbody);
        //ajax获取数据之后触发"update"事件(我目前没有用ajax)
        $("#tableSortList").trigger('update'); //
        //排序
        $("#tableSortList").tablesorter(
          {
              headers:{
                  0:{sorter:false},//第一列不需要排序
                  2:{sorter:'memorySortParse'},
              }
          }
        );
        return false;

    });


```
总结:
以上是我做压测宝表格排序的实例,如果有兴趣的同学们,详情api和实例可以参考下面官方链接:

[tablesorter官网](http://tablesorter.com/docs/index.html)
