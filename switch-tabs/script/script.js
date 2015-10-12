/**
 * Created by trigkit4 on 15/8/27.
 */
define(['jquery'],function ($) {
return {
    tabs: function (options) {
            var $elements,$triggers,$contents;
            options = $.extend({
                triggerType: 'click',
                activeIndex: 0,
                active: 'select',
                element: null,
                triggers: '.triggers',
                contents: '.contents'
            }, options || {});
            $elements = $(options.element);

            if(!$elements.length) {
                return null;
            }
            $triggers = $elements.find(options.triggers);

            //内容
            $contents = $elements.find(options.contents);

            function auto(){
                timer = null;
                index = 0;
                var lis = $('.main-nav li'),
                    divs = $('.content-item');
                for(var i = 0;i < lis.length; i++ ){
                    lis[i].id = i;
                    lis[i].onmouseover = function () {
                        clearInterval(timer);
                        changeOption(this.id);
                    };
                    lis[i].onmouseout = function () {
                        timer= setInterval(autoPlay,2000);
                    }
                }
                timer = setInterval(autoPlay,2000);

                function autoPlay(){
                    index++;
                    if(index >= lis.length){
                        index = 0;
                    }
                    changeOption(index);
                }
                function changeOption(curIndex){
                    for(var j = 0;j < lis.length;j++){
                        lis[j].className = '';
                        divs[j].style.display = 'none';
                    }

                    lis[curIndex].className = 'select';
                    divs[curIndex].style.display = 'block';

                    index = curIndex;
                }
            }

            if(options.triggerType === 'hover'){
                options.triggerType = 'mouseenter';
            }else if(options.triggerType === 'auto'){
                auto();
            }else{
                options.triggerType = 'click';
            }

            $triggers.on(options.triggerType, function () {
                var index = $triggers.index(this);
                $triggers.removeClass(options.active);
                $(this).addClass(options.active);

                $contents.hide().eq(index).show();
            });
            $triggers.eq(options.activeIndex).trigger(options.triggerType);
        }
    };
});
