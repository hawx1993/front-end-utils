/**
* Created by trigkit4 on 15/8/12.
*/
 
define(function (require) {
    function $(id) {
        return document.getElementById(id);
    }
    return {
        auto: function() {
            timer = null;
            index = 0;

            var lis = $('title').getElementsByTagName('li'),
                divs = $('content').getElementsByTagName('div');

            //设置鼠标移入移出事件也可以显示要显示的内容
            for(var i=0;i<lis.length;i++){
                lis[i].id = i;
                lis[i].onmouseover = function () {
                    clearInterval(timer);
                    changeOption(this.id);
                };
                //鼠标离开继续执行定时器事件
                lis[i].onmouseout = function () {
                    timer = setInterval(autoPlay,2000);
                }
            }

            //添加定时器，改变当前高亮索引
            timer = setInterval(autoPlay,2000);

            function autoPlay() {
                index++;
                if(index>=lis.length){
                    index = 0;
                }
                changeOption(index);
            }

            function changeOption(curIndex) {
                for(var j=0;j<lis.length;j++){
                    lis[j].className = '';
                    divs[j].style.display = 'none';
                }

                //高亮显示当前标签页和显示内容
                lis[curIndex].className = 'select';
                divs[curIndex].style.display = 'block';

                //鼠标移出标签页后让其继续往下执行
                index = curIndex;
            }
        }
    }
});


