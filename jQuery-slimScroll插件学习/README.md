##jQuery-slimScroll
###前言
现在大部分浏览器都不支持对滚动条默认样式的更改，所以前端程序员们不可避免的需要解决滚动条难看，以及在各个浏览器样式不统一的问题,slimScroll就是一个很不错的滚动条插件。
###slimscroll是什么？
slimScroll是一个很小的（4.6KB）jQuery插件，它可以把任何一个div转换为一个拥有漂亮滚动条的滚动区域。

slimScroll不占用任何可视空间，因为它只会在客户鼠标悬停的时候才出现。用户可以通过拖动滚动条或者使用鼠标滚轮操作，改变滚动值。
###下载
你可以从这里下载最稳定的版本：[slimScroll下载](https://github.com/rochal/jQuery-slimScroll/releases)

或者使用npm下载：

```sh
npm install jquery-slimscroll
```

github地址：[https://github.com/rochal/jQuery-slimScroll](https://github.com/rochal/jQuery-slimScroll)
###使用方法
需要先添加jQuery

```html
<script type="text/javascript" src="/jquery.min.js"></script>
```

然后引入slimScroll插件：

```html
<script type="text/javascript" src="/jquery.slimscroll.js"></script>
```

最后，像下面代码这样去启动slimScroll（一定要在DOM元素加载完后再去启用）：

html像这样：

```html
<div id="test">
slimScroll is a small jQuery plugin that transforms any div into a scrollable area with a nice scrollbar - similar to the one Facebook and Google started using in their products recently. slimScroll doesn't occupy any visual space as it only appears on a user initiated mouse-over. User can drag the scrollbar or use mouse-wheel to change the scroll value.
</div>
```

启用slimScroll插件：

```html
$(function(){
    $('#test').slimScroll({
        height: '250px'
    });
});
```

###配置项

```js
{
    width : 'auto', // 可见滚动区域宽度，默认auto（以像素为单位）
    height : '250px',   // 可见滚动区域高度，默认250px（以像素为单位）
    size : '7px',   // 滚动条的宽度，（以像素为单位）
    color: '#000',  // 滚动条颜色，默认#000000
    position : 'right', // 滚动条位置，默认right，可选：left/right
    alwaysVisible : false,  // 是否禁用隐藏滚动条，默认为false（当hover才显示滚动条）
    distance : '1px',   // 边缘和滚动条之间的距离，默认为1px（以像素为单位）
    start : 'top',  // 滚动条初始位置，默认为top，可选：top / bottom / $('selector')[滚动区域内容元素位置]
    wheelStep : 20, // 设置鼠标每步滚动值大小，默认为20px
    railVisible : false,    // 设置滚动轨迹的可见性，默认为false
    railColor : '#333', // 滚动轨迹颜色，默认#333
    railOpacity : .2,   // 设置滚动轨迹透明度，默认为0.2
    allowPageScroll : false,    //检查滚动条滚动到顶部或底部时是否允许页面滚动,默认false
	scrollTo:'0px',		// 跳转到指定的滚动值。可以在已启用slimScroll的任何元素上手动调用,将其滚动到指定位置（调用方式：$(element).slimScroll({ scrollTo: '50px' });）
	scrollBy:'50px',	// 在当前滚动位置id基础上，增加或减少（正/负）当前滚动值。可以在已启用slimScroll的任何元素上手动调用,将其滚动到指定位置（调用方式：$(element).slimScroll({ scrollBy: '50px' });）
	disableFadeOut : false, // 检查当用户鼠标在滚动区域悬停并且不做任何操作，是否应该隐藏滚动条，alwaysVisible为true时该参数无效，默认false
	touchScrollStep : 200  // 用户使用手势触摸时的滚动值
}
```
###事件
当滚动条在滚动过程中会触发slimscrolling事件，当到达顶部或底部时，slimScroll会触发slimscroll事件。 你可以使用jQuery绑定方法来绑定此事件：

```js
$(selector).slimScroll().bind('slimscrolling', function(e, pos){
    console.log("当前位置：" + pos);
});
$(selector).slimScroll().bind('slimscroll', function(e, pos){
    console.log("到达：" + pos);
});
```



