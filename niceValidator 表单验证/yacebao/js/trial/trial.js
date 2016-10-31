$(function () {
    var validFlag = false;
    var sendCodeUrl = 'http://portal.yacebao.com/sendCode.do';
    // var sendCodeUrl = 'http://qa001.yacebao.com/sendCode.do';
    var checkApplyInfoUrl = 'http://portal.yacebao.com/checkApplyInfo.do';
    // var checkApplyInfoUrl = 'http://qa001.yacebao.com/checkApplyInfo.do';

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
                msg: {required: "请输入公司名称"}
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
            }
        },
        valid: function (form) {
            validFlag = true;
        }
    })
        //字段验证失败后，添加错误高亮
        .on('validation', function (e, current) {
            $(current.element).closest('.form-group')[current.isValid ? "removeClass" : "addClass"]('has-error');
        });

    //表单提交
    $("#trialForm").on('click', '#Submit', function () {
        $("#trialForm").trigger("validate");

        // 验证成功
        if (validFlag) {
            checkApplyInfo();
        }
        // 标准重置
        validFlag = false;
    });

    //公司名称检测
    $("input[name='companyName']").on('blur', function(){
       checkApplyInfo();
    });

    //网站链接检测
    $("input[name='siteLink']").on('blur', function(){
        checkApplyInfo();
    });

    //手机号码检测
    $("input[name='phone']").on('blur', function() {

        //checkApplyInfo();
    });

    //校验用户信息
    function checkApplyInfo () {
        var companyName = $("input[name='companyName']").val();
        var siteLink = $("input[name='siteLink']").val();
        var contact = $("input[name='contact']").val();
        var phone = $("input[name='phone']").val();
        var msgCode = $("input[name='msgCode']").val();

        //console.info(companyName, siteLink, contact, phone, msgCode);

        $('#Submit').attr('disabled', true).html('正在提交');

        $.ajax({
            type: "get",
            async: false,
            url: checkApplyInfoUrl,
            data: {'companyName': companyName, 'website' : siteLink, 'linkMan' : contact, 'mobilephone' : phone, 'verificationCode' : msgCode},
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "checkApplyInfo",

            success: function (data) {
                var state = parseInt(data.state);
                console.info(data);
                $('#Submit').removeAttr('disabled').html('提交申请');

                if (state !== 0) {
                    switch (state) {
                        //手机格式不正确
                        case 4 :
                            showErrorMsg('phone', data.msg);
                            break;
                        //公司名称格式不正确
                        case 5 :
                            showErrorMsg('companyName', data.msg);
                            break;
                        //公司网站格式错误
                        case 6 :
                            showErrorMsg('siteLink', data.msg);
                            break;
                        //联系人格式错误
                        case 7 :
                            showErrorMsg('contact', data.msg);
                            break;
                        //验证码错误
                        case 8 :
                            showErrorMsg('msgCode', data.msg);
                            break;
                        //手机号已经存在
                        case 9 :
                            showErrorMsg('phone', data.msg);
                            break;
                        //验证码为空
                        case 10 :
                            showErrorMsg('msgCode', data.msg);
                            break;
                        default :
                            alert('接口响应失败');
                            break;
                    }
                } else {
                    //显示成功TIPS
                    $(".tip-msg").fadeIn();
                    setTimeout(function () {
                        $(".tip-msg").fadeOut();
                        window.location.href = 'http://yacebao.com';
                    }, 5000);
                    $(".icon-close").click(function () {
                        $(this).parent().fadeOut();
                        window.location.href = 'http://yacebao.com';
                    });
                }

            },
            error: function () {
                $('#Submit').removeAttr('disabled').html('提交申请');
                alert('接口请求失败');
            }
        });
    }

    //获取验证码
    $(".send-code").on('click', function() {
        getCode();
    });

    function getCode() {
        var mobile = $("input[name = 'phone']").val();

        $.ajax({
            type: "get",
            async: false,
            url: sendCodeUrl,
            data: {'mobilePhone': mobile},
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "sendCode",
            success: function (data) {

                if (data.state !== 0) {
                    showErrorMsg('phone', data.msg);
                } else {
                    //倒计时
                    countDown();
                    $("#msgBtn").attr('value', '验证码已发送');

                    $("input[name='msgCode']").focus();
                }

            },
            error: function () {
                alert('接口请求失败');
            }
        });
    }

    //验证码60S限制
    var countdown = 60;
    function countDown(){
        var $this = $("#msgBtn");
        if (countdown == 0) {
            $this.removeAttr("disabled");
            $this.val("获取验证码");
            countdown = 60;
            return;
        } else {
            $this.attr("disabled", true);
            var resend = ("重新发送(" + countdown + ")");
            $this.val(resend);
            countdown--;
        }
        setTimeout(function() {
                countDown();}
            ,1000)
    }

    //显示错误信息
    function showErrorMsg(name, msg){
        var element= 'input[name="'+name+'"]';
        $(element).closest('.form-group').addClass("has-error");
        $('form').validator('showMsg', element, {
            type: "error",
            msg: msg
        });
    }


    //获取当前host 更改申请试用URL
    var host = window.location.host;
    var url = 'http://' + host + '/trial.shtml';
    console.info(url);
    $('#apply_btn').attr('href', url);
});