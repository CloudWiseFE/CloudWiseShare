##jQuery简单、智能、令人愉悦的表单验证方案nice Validator
###（推荐）特点:
>1.智能：自动初始化、自动生成消息、只在需要时验证
>2.灵活：主题机制、多规则绑定、丰富的事件、随意扩展、国际化支持
>3.体验：支持实时验证与显示消息，4种消息类型，上下左右位置随你，提供对外API
>4.简单：少量的参数，轻松上手，简单配置就可以定义消息主题
>5.强大：规则动态性、分组验证支持、调试支持、通过DOM传参可不用初始化、超强适应能力

###下载
你可以从这里下载最新版本 - v0.10.11：[validator下载](https://niceue.com/validator/download.php)

###使用方法

###首先,引入资源

使用之前，确保已经引入了jQuery，需要 1.7 以上版本。
```html
<script type="text/javascript" src="path/to/jquery-1.7.2.min.js"></script>
```
然后引入验证插件，其中“zh_CN.js” 是本地化配置文件，你可以在里面配置一些全局的参数（规则、主题、多语言消息）。
```html
<link rel="stylesheet" href="path/to/validator/jquery.validator.css">
<script type="text/javascript" src="path/to/validator/jquery.validator.js"></script>
<script type="text/javascript" src="path/to/validator/local/zh_CN.js"></script>
```
###以压测宝申请压测服务表单为例:

```html
<form action="" id="trialForm" >
    <div class="login-box">
        <div class="title">申请压测服务</div>
        <div class="form-group">
            <span class="span-icon">
                <i class="icon-company" ></i>
            </span>
            <input type="text" class="form-control" name="companyName" placeholder="公司名称">
            <span class="icon-star">*</span>
        </div>
        <div class="form-group">
            <span class="span-icon">
                <i class="icon-link" ></i>
            </span>
            <input type="text" class="form-control" name="siteLink" placeholder="网站链接">
            <span class="icon-star">*</span>
        </div>
        <div class="form-group">
             <span class="span-icon">
                <i class="icon-contact" ></i>
            </span>
            <input type="text" class="form-control" name="contact" placeholder="联系人">
            <span class="icon-star">*</span>
        </div>
        <div class="form-group">
             <span class="span-icon">
                <i class="icon-phone" ></i>
            </span>
            <input type="text" class="form-control " name="phone" placeholder="手机号">
            <span class="icon-star">*</span>
        </div>
        <div class="form-group">
            <span class="span-icon">
                <i class="icon-key" ></i>
            </span>
            <input type="text" class="form-control input-tel" name="msgCode" placeholder="短信验证码">
            <input type="button" class="btn btn-orange" id="msgBtn"  value="获取验证码" />
            <span class="icon-star">*</span>

        </div>
        <div class="form-group" style="padding-top: 10px;">
            <button id="Submit" type="button" class="btn btn-primary btn-lg btn-block btn-blue">提交申请</button>
        </div>
    </div>
</form>
```
###验证脚本
```js
$(function () {
    var validFlag = false;
    $("#trialForm").validator({
  focusCleanup: false,//是否在输入框获得焦点的时候清除消息，默认不清除,默认为false;
    stopOnError: false,//是否在验证出错时停止继续验证，默认不停止,默认为false;
    timely: 1, //1、失去焦点；2、时时验证；0、提交表单
    msgClass: "n-bottom",//消息将自动显示在输入框下方;n-top;n-right;n-bottom;n-left;
    msgStyle: "left:43px;top:-3px;",//有时候主题定义的消息样式的位置没有达到预期,就可以通过msgStyle参数传递css规则来精确控制消息位置
    rules: {
    // xxx: [/^\d{6}$/, '请输入6位数字']
  },
  fields: {
    companyName: {
      rule: "required;xxx",
        msg: {required: "请输入公司名称"},
      // tip: "密码由6位数字组成",
      // ok: "别担心，稍后您还可以更改",
      // target: "#msg_holder"
    },
    siteLink: {
      rule: "required;",
        msg: {required: "请输入网站链接"}
    },
    contact: {
      rule: "required;",
        msg: {required: "请输入联系人"}
    },
    phone: {
      rule: "required;",
        msg: {required: "请输入手机号"}
    },
    msgCode: {
      rule: "required;",
        msg: {required: "请输入短信验证码"}
    },
  },
  valid: function (form) {
    validFlag = true;
  }
})
//字段验证失败后，添加错误高亮
  .on('validation', function(e, current){
    $(current.element).closest('.form-group')[current.isValid?"removeClass":"addClass"]('has-error');
  });
//保存事件
$("#trialForm").on('click','#Submit',function(){
  $("#trialForm").trigger("validate");
  // 验证成功
  if (validFlag) {
    //console.log(1);
    showErrorMsg('phone',"手机号错误");
    //showErrorMsg('msgCode',"验证码错误");
  }else{
    //console.log(2);
  }
  // 标准重置
  validFlag = false;
});
  var countdown=60;
  function countDown(){
      var $this = $("#msgBtn");
      if (countdown == 0) {
        $this.removeAttr("disabled");
        $this.val("获取验证码");
        countdown = 60;
        return;
      } else {
        $this.attr("disabled", true);
        var resend = ("重新发送(" + countdown + ")")
        $this.val(resend);
        countdown--;
      }
    setTimeout(function() {
        countDown();}
      ,1000)
    }
  $("#msgBtn").click(function(){
          countDown();
    });
  $("#Submit").click(function(){
        $(".tip-msg").fadeIn();
        setTimeout(function(){
            $(".tip-msg").fadeOut()
        },5000);
        //login close
        $(".icon-close").click(function(){
            $(this).parent().fadeOut();
        })

    })



  function showErrorMsg(name,msg){
    var element= 'input[name="'+name+'"]';
    $(element).closest('.form-group').addClass("has-error");
    //如果有ajax的异步验证失败显示失败消息,可以用showMsg方法.
    $('form').validator('showMsg', element, {
      type: "error",
      msg: msg
    });
  }

});

```
总结:
以上是我做申请压测做的一些验证,如果有兴趣的同学们,详情api和实例可以参考下面官方链接:

[validator]: https://niceue.com/validator/