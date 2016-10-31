$(function () {
    //首页 环形切换
    (function () {
        var $span = $('#map_loop span'),
            index = 6,
            reg = 0,
            timer;

        function round(_reg) {
            if (!arguments.length) {
                reg = reg + 60;
            } else {
                reg = _reg;
            }
            $('#map_loop .map_con').css('transform', 'rotate(' + reg + 'deg)');
            if (reg > 0) {
                $span.css('transform', 'rotate(-' + reg + 'deg)');
            } else {
                $span.css('transform', 'rotate(' + Math.abs(reg) + 'deg)');
            }
            $span.eq(index).addClass('active').siblings().removeClass('active');
            $('#map_loop').closest('.item_con').find('.item_right').eq(index).show().siblings('.item_right').hide();
        }

        //自动旋转
        function autoRound() {
            index--;
            if (index < 0) index = $span.length - 1;
            round();
        }

        //点击
        $('#map_loop span').on('click', function () {
            index = $(this).index() - 1;
            var oldReg = reg;
            reg = 360 * (Math.ceil(reg / 360)) + (6 - index) * (60);
            if (reg - oldReg >= 360) {
                reg = reg - 360;
            }
            if (reg - oldReg > 180) {
                reg = reg - 360;
            }
            round(reg);
        });
        timer = setInterval(function () {
            autoRound();
        }, 10000);
        $('#map_loop .map_con').on('mouseover', function () {
            clearInterval(timer);
        });
        $('#map_loop .map_con').on('mouseleave', function () {
            timer = setInterval(function () {
                autoRound();
            }, 10000);
        });
    })();
    //案例内容切换
    (function () {
        var $width = $(window).width();
        $('.case .tab_title').on('mouseover', 'li', function () {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.tab_box').find('.tab_con').eq(index).show().siblings('.tab_con').hide();
        });

        $('.case .tab_con .more').on('click', function () {
            $('.cover').show();
            $('body').addClass('hidden-body');
            $(this).closest('.tab_con').find('.case_detail').fadeIn(500, function () {
                if ($width <= 480) {
                    var $height = $(this).height();
                    $(this).find('.case_con').height($height - 60);
                }
            });
        });
        $('.case .case_detail .close').on('click', function () {
            $(this).closest('.case_detail').fadeOut(500);
            $('.cover').hide();
            $('body').removeClass('hidden-body');
        });
    })();

    //旋转木马
    (function () {
        if ($('#round_con').size() > 0) {
            var index = 0,
                liLength = $('#round_con li').length;
            $('#round_con').roundabout({
                startingChild: 0,
                duration: 600
            });
            setInterval(function () {
                index++;
                if (index == liLength) index = 0;
                $('#round_con li').eq(index).click();
            }, 3000);
        }
    })();

    //手机导航
    (function () {
        var touchHeader = $('.header .header_con'), isOpen = false;
        $('.nav_btn', touchHeader).on('click', function () {
            if (isOpen == false) {
                touchHeader.find('.mobile_nav').slideDown();
                isOpen = true;
            } else {
                touchHeader.find('.mobile_nav').slideUp();
                isOpen = false;
            }
        });
    })();

    //用户案例详情
    (function () {

    })();

    if ($(".about .flexslider").size() > 0) {
        $(".about .flexslider").flexslider({
            controlNav: false,
            animation: 'slide'
        });
    }


    $('.about .tab a').each(function () {
        var _this = $(this),
            _index = _this.index();
        _this.bind('click', function () {
            _this.addClass('active').siblings('a').removeClass('active');
            $('.map-box').eq(_index).show().siblings('.map-box').hide();
        })

    })

    //获取当前host 更改申请试用URL
    //var host = window.location.host;
    //var url = 'http://' + host + '/yacebao/trial.shtml';
    //console.info(url);
    //$('a#apply_btn').attr('href', url);

});