/**
 * Created by trigkit4 on 15/8/12.
 */
//1.设置鼠标经过显示内容和切换标签页
define(function (require) {
    function $(id) {
        return document.getElementById(id);
    }

    return {
        hover: function() {
            //先获取要操作的对象，然后将其赋给变量
            var lis = $('title').getElementsByTagName('li');
            var divs = $('content').getElementsByTagName('div');

            //遍历title下的所有li
            for(i = 0;i<lis.length;i++){
                lis[i].id = i;//li的索引为i
                lis[i].onmouseover = function(){
                    for(var j=0;j<lis.length;j++){
                        lis[j].className = "";//设置所有的class为空
                        divs[j].style.display = 'none';//设置索引的内容默认为不显示
                    }
                    //设置当前样式
                    this.className = 'select';
                    divs[this.id].style.display = 'block';
                }
            }
        }
    }
});

