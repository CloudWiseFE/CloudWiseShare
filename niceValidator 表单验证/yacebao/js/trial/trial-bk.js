$(function () {
    var validFlag = false;
    $("#trialForm").validator({
  focusCleanup: false,
    stopOnError: false,
    timely: 1, //1、失去焦点；2、时时验证；0、提交表单
    msgClass: "n-bottom",
    msgStyle: "left:43px;top:-3px;",
    rules: {
    // xxx: [/^\d{6}$/, '请输入6位数字']
  },
  fields: {
    companyName: {
      rule: "required;",
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
    $('form').validator('showMsg', element, {
      type: "error",
      msg: msg
    });
  }

});