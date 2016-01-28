/**
 * Created by trigkit4 on 16/1/27.
 * 说明：
 * 1.slash:true,reverse:true,counterText和exceedText有值
 * 2.reverse:false,slash:true
 * 3.reverse:true,slash:true
 * 4.reverse:true,slash:false,counterText和exceedText有值
 */
$.fn.wordsLimit = function (options) {
    var defaults = {
        limits: 140,                //默认的字数限制
        countStyle: 'counter',      //统计字数的样式
        counterElement: 'span',     //计算的元素标签，动态创建，不需要手动创建，默认span
        exceedStyle: 'exceeded',    //超出时的样式
        counterText: '',   //默认的提示文本
        exceedText: '',      //超出时提示的文本
        reverse: 'true',     //true倒数，false正数
        slash:'true',              //是否显示"/140"
        rangeCallback:function(){},//规定范围内的回调函数
        exceedCallback:function(){} //超出时的回调函数
    };
    options = $.extend(defaults, options);
    function strChange(obj){

        var inputNum = Math.ceil(getStrLen($.trim($(obj).val()))/2);//输入字数

        if(options.disabled == 'true'){
            if(inputNum >= options.limits){
                $(obj).val($(obj).val().slice(0,options.limits))
                $(obj).next().addClass(options.exceedStyle);
            }
        }
        //0~140
        if(options.reverse=='false'){
            if(inputNum <= options.limits && inputNum >= 0){
                $(obj).next().html(options.counterText + inputNum+'/'+options.limits + '字').addClass(options.countStyle).removeClass(options.exceedStyle);
                if(options.slash=='true'){
                    $(obj).next().html(inputNum +'/'+options.limits)
                }
                options.rangeCallback && options.rangeCallback();
            }else{
                $(obj).next().html(options.exceedText + inputNum+'/'+options.limits).addClass(options.exceedStyle).removeClass(options.countStyle);
                options.exceedCallback && options.exceedCallback();
            }

        }
        //140~0
        if(options.reverse=='true'){
            var leftNums = options.limits - inputNum;//剩下字数
            if(leftNums <= options.limits && leftNums >=0){
                $(obj).next().html(options.counterText + leftNums + '字').addClass(options.countStyle).removeClass(options.exceedStyle);
                if(options.slash=='true'){
                    $(obj).next().html(options.counterText+ leftNums + '/'+options.limits+'字');
                }
            }else{
                $(obj).next().html(options.exceedText + Math.abs(leftNums) + '字').removeClass(options.countStyle).addClass(options.exceedStyle);
                options.exceedCallback && options.exceedCallback();
            }
            if(options.exceedText){

            }
        }
    }
    function getStrLen(str) {
        return String(str).replace(/[^\x00-\xff]/g,'aa').length;
    }
    this.each(function () {
        $(this).after('<'+ options.counterElement +' class="' + options.countStyle+ '">'+ options.counterText+'</'+ options.counterElement +'>');
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