/**
 * Created by trigkit4 on 14/12/24.
 */
//获取元素样式
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];//兼容IE的方法
    }else{
        return getComputedStyle(obj,false)[name];//兼容Firefox
    }
}

//寻找父级下的后代class样式
function getByClass(oParent,nClass){
    var eLe = oParent.getElementsByTagName('*');
    var arr = [];
    for(var i=0;i<eLe.length;i++){
        if(eLe[i].className == nClass){
            arr.push(eLe[i]);
        }
    }
    return arr;
}
function startMove(obj,att,add){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cutt = 0;
        if(att == 'opacity'){
            cutt = Math.round(parseFloat(getStyle(obj,att)));
        }else{
            cutt = Math.round(parseInt(getStyle(obj,att)));
        }
        var speed = (add - cutt)/4;
        speed = speed>0?Math.ceil(speed):Math.floor(speed);
        if(cutt == add){
            clearInterval(obj.timer)
        }else{
            if(att == 'opacity'){
                obj.style.opacity = (cutt + speed)/100;
                obj.style.filter = 'alpha(opacity:'+(cutt+speed)+')';
            }else{
                obj.style[att] = cutt + speed +'px';
            }
        }
    },70)
}

window.onload = function () {
    var oDiv = document.getElementById('box');//获取父级元素div
    var oPre = getByClass(oDiv,'pre')[0];
    var oNext = getByClass(oDiv,'next')[0];
    var oImg = getByClass(oDiv,'img')[0];
    var oLi = oImg.getElementsByTagName('li');//图片的li
    var oDot = getByClass(oDiv,'dot')[0];
    var aLi = oDot.getElementsByTagName('li');//小圆点的li

    function tab(){
        for(var i = 0; i<aLi.length;i++){
            aLi[i].className = '';
        }
        aLi[now].className = 'cur';
        startMove(oImg,'left',-(now*oLi[0].offsetWidth))
    }
    var now = 0;
    for(var i = 0;i<aLi.length;i++){
        aLi[i].index = i;
        aLi[i].onclick = function () {
            now = this.index;
            tab();
        }
    }
    oPre.onclick = function () {
        now--;
        if(now == -1){
            now = oLi.length;
        }
        tab();
    };
    oNext.onclick = function () {
        now++;
        if(now == oLi.length){
            now = 0;
        }
        tab();
    };
    var timer = setInterval(oNext.onclick,3000);
    oDiv.onmouseover = function () {
        oPre.style.display = 'block';
        oNext.style.display = 'block';
        clearInterval(timer);
    };
    oDiv.onmouseout = function () {
        timer = setInterval(oNext.onclick,3000);
        oPre.style.display = 'none';
        oNext.style.display = 'none'
    }

};