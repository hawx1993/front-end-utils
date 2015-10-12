/**
 * Created by trigkit4 on 15/8/12.
 */
//4.设置点击后切换标签页和内容

define(function (require) {

    function $(id) {
        return document.getElementById(id);
    }

    return {
        click: function () {
            var lis = $('title').getElementsByTagName('li'),
                divs = $('content').getElementsByTagName('div');

            for(i = 0;i<lis.length;i++){
                lis[i].id = i;//li的索引为i

                lis[i].onclick = function(){
                    for(var i=0;i<lis.length;i++){
                        lis[i].className = "";//设置所有的class为空
                        divs[i].style.display = 'none';//设置索引的内容默认为不显示
                    }
                    //设置当前样式
                    this.className = 'select';
                    divs[this.id].style.display = 'block';
                }
            }
        }
    }
});


