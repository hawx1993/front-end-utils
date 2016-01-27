/**
 * Created by trigkit4 on 16/1/27.
 */
$.fn.wordsLimit = function (options) {
    var defaults = {
        limits: 140,                //默认的字数限制
        countStyle: 'counter',      //统计字数的样式
        counterElement: 'span',     //计算的元素标签
        exceedStyle: 'exceeded',    //超出时的样式
        counterText: '还可以输入',   //默认的提示文本
        exceedText: '已超出',      //超出时提示的文本
        rangeCallback:function(){},//规定范围内的回调函数
        exceedCallback:function(){} //超出时的回调函数
    };
    options = $.extend(defaults, options);
    function strChange(obj){
        var inputNum = Math.ceil(getStrLen($.trim($(obj).val()))/2);//输入字数
        var leftNum = options.limits - inputNum;//剩下字数
        if(leftNum <= options.limits && leftNum >= 0){
            $(obj).next().html(options.counterText + leftNum);
            $(obj).next().removeClass(options.exceedStyle).addClass(options.countStyle);
            options.rangeCallback && options.rangeCallback();
        }else{
            $(obj).next().html(options.exceedText + leftNum).addClass(options.exceedStyle).removeClass(options.countStyle);
            options.exceedCallback && options.exceedCallback();

        }
    }
    function getStrLen(str) {
        return String(str).replace(/[^\x00-\xff]/g,'aa').length;
    }
    this.each(function () {
        $(this).after('<'+ options.counterElement +' class="' + options.countStyle + '">'+ options.counterText +'</'+ options.counterElement +'>');
        strChange(this);
        $(this).keyup(function () {
            strChange(this);
        });
        $(this).change(function () {strChange(this);})
    });
};


/*使用示例

*<div class="count">
*<textarea name="content"  class="inputContent" placeholder="点此输入..."></textarea>
*<p>huang</p>
*</div>
*<script>
*$(function () {
*    $('.inputContent').wordsLimit({
*        limits: 150,
*        countStyle: 'test',
*        exceedStyle: 'beyond',
*        exceedCallback: function(){
*            $('p').html('world')
*        },
*        rangeCallback: function () {
*            $('p').html('test')
*        }
*    })
*})
*</script>
*/