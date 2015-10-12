$(function () {
    var $group = $('.section-group'),
        $sections = $group.find('section'),//一个section为一个页面，获取所有的页码
        $sectionNum = $sections.length,
        html = ['<ul class=nav>'],//保存ul数组元素
        flag = false;
    /*当前所在页标*/
    $group.data('indexFlag',0);//向indexFlag附加数据值0
    /*初始化页码*/
    for(var i = 0;i < $sectionNum; i ++) {
        html.push('<li><span></span></li>');
    }
    html.push('</ul>');
    var $pagination = $(html.join('')),//ul>li>span
        $paginations = $pagination.find('>li');//ul>li，页码

    $pagination.appendTo($('body'));
    $pagination.children('li:eq(0)').children('span').addClass('active');
    $paginations.click(function () {
        if(flag) return; //如果此时正在动画中，则不再继续
        var $this = $(this),//获取页标
            index = $this.index(),//获取页标索引值
            translateY = index * 100;

        $pagination.children('li').children('span').removeClass('active');
        $this.children('span').addClass('active');

        flag = true;
        $group.data('indexFlag', index) //储存当前页标
            .css({
                '-webkit-transform':'translateY(-'+ translateY +'%)',
                '-moz-transform': 'translateY(-' + translateY + '%)',
                '-ms-transform': 'translateY(-' + translateY + '%)',
                'transform':'translateY(-'+ translateY +'%)'
            });
        setTimeout(function () {
            flag = false;
        },1000);
    });

    /*滚轮事件入口,包括上一页和下一页*/
    function wheelevent (delta) {
        if(flag = false) return;
        delta = delta > 0 ? 1 : -1;//滚轮往上滚时 delta 大于 0，往下则小于 0
        var index = $group.data('indexFlag');
        index -= delta;
        index = index < 0 ? 0 : index = index > ($sectionNum -1 ) ? ($sectionNum -1 ) : index;
        /*触发页码点击事件*/
        $paginations.eq(index).click();
    }

    /*绑定滚轮事件*/
    $(document).bind('mousewheel',function (event, delta) {
        wheelevent(delta);
    });
});
