/**
 * Created by trigkit4 on 15/8/12.
 */
//2.设置延迟切换效果,要使用这个效果请把注释去掉，把其他注释加上
define(function (require) {
    function $(id) {
        return document.getElementById(id);
    }
    return {
        delay: function() {
            var lis = $('title').getElementsByTagName('li'),
                divs = $('content').getElementsByTagName('div');

            timer = null;
            index = 0;

            for(i = 0;i<lis.length;i++){
                lis[i].id = i;
                lis[i].onmouseover = function(){
                    var that = this;
                    if(timer){
                        clearTimeout(timer);
                        timer =null;
                    }
                    //延迟半秒执行
                    timer = window.setTimeout(function() {
                        for(var j=0;j<lis.length;j++){
                            lis[j].className = '';
                            divs[j].style.display = 'none';
                        }
                        lis[that.id].className = 'select';
                        divs[that.id].style.display = 'block'
                    },500);
                }
            }
        }
    }
});

