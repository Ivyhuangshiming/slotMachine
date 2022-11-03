$.fn.extend({
    luckGame: function(options) {
        var defaults = {
            'sameTimeBegin': 1, //是否同时开始，默认1
            'duration': 5000, //动画时间，默认5000
            'gameLen': '18',
            'game_pagesize': 10, //生成多少圈同样的东西
            'game_front': 'prize_', //奖品前缀
            'lottery_arr_init': [], //初始化默认显示奖品数组
            'lottery_arr_number': [], //中奖结果数组
            'game_prize_box': '.game-prize-box ', //奖品盒子
            'game_prize_ul': '.game-prize-ul', //奖品数组ul
            'game_img_root':'images/',//奖品图片根目录
            'start': function() {
                //开始抽奖
            },
            'end': function(result) {
                //中奖结果
            }
        };
        var settings = $.extend(defaults, options);
        var w_config = {
            'w': $(window).width(),
            'h': $(window).height()
        }
        var gameArr = [];
        var gameLen = settings.gameLen;
        var game_list_h = '';
        var game_init = [];
        var game_list_item_h = 0;

        game_init = settings.lottery_arr_init;
        createGame();
        $(window).resize(function() {

            createGame();
        })

        function createGame() {
            getHeight();
            setLi();
            pushLi(gameArr);
        }

        function getHeight() {
            w_config = {
                'w': $(window).width(),
                'h': $(window).height()
            }
            game_list_item_h = $(settings.game_prize_box).height();
        }


        //设置奖品
        function setLi() {
            for (var j = 1; j <= settings.game_pagesize; j++) {
                for (var i = 1; i <= gameLen; i++) {
                    gameArr.push({
                        'type': j,
                        'index': i,
                        'src': ''+settings.game_img_root+'/' + settings.game_front + i + '.png'
                    });
                }
            }
        }
        //写入，初始化奖品的滚动
        function pushLi(arr) {
            var html_str = '';
            for (var i = 0; i < arr.length; i++) {
                html_str += '<li style="height:' + game_list_item_h + 'px" data-index="' + arr[i]['index'] + '"><img src="' + arr[i]['src'] + '"></li>';
            }
            $(settings.game_prize_ul).each(function(e) {
                $(this).empty().append(html_str);
                game_list_h = $(this).height();
                var y = game_list_item_h * game_init[e];
                $(this).css({
                    'margin-top': -y
                })
            });
        }

        var scrollFlag = true;
        //开始抽奖
        this.start = function() {
            if(!scrollFlag){
                return;
            }
            scrollFlag = false;//防止多次抽奖
            pushLi(gameArr);
            var _this = this;
            $(settings.game_prize_ul).each(function(e) {
                setTimeout(function() {
                    var y = (_this.lottery_arr_number[e] + settings.gameLen * (settings.game_pagesize - 1)) * game_list_item_h;
                    $(settings.game_prize_ul).eq(e).animate({
                        'margin-top': -y
                    }, settings.duration, function() {
                        if ($(this).parent().attr('data-index') == '2') {
                            settings.end({
                                "prize": _this.lottery_arr_number
                            });
                            scrollFlag = true;
                        }
                    })
                }, settings.sameTimeBegin ? 10 : e * 300);
            })
        }


       /* this.start = function() {
            if(!scrollFlag){
                return;
            }
            scrollFlag = false;//防止多次抽奖
            pushLi(gameArr);
            var _this = this;
            $(settings.game_prize_ul).each(function(e) {
                setTimeout(function() {
                    var y = (_this.lottery_arr_number[e] + settings.gameLen * (settings.game_pagesize - 1)) * game_list_item_h;
                    $(settings.game_prize_ul).eq(e).animate({
                        'margin-top': -y
                    }, settings.duration, function() {
                        if ($(this).parent().attr('data-index') == '2') {
                            settings.end({
                                "prize": _this.lottery_arr_number
                            });
                            scrollFlag = true;
                        }
                    })
                }, settings.sameTimeBegin ? 10 : e * 300);
            })
        }*/


        //主函数 
        return this.each(function() {
            //激活事件 
            var obj = $(this);
        });
    }
})
