/**
 * Created by trigkit4 on 15/10/29.
 */
(function (window) {
    function $(ele){
        return document.getElementById(ele);
    }
    var $bar = $('bar'), $spin = $('spinner'),progress = 1;

    var random = function (min,max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    };

    var onprogress = function () {
        //random time
        runtime = random(10,30);
        setTimeout(function () {
            if(window.loaded){
                $bar.style.width = '100%';
                $bar.style.display = 'none';
                $spin.style.display = 'none';
                return;
            }
            progress += random(1,4);

            if(progress > 95){
                progress = 95;
            }

            $bar.style.width = progress + '%';
            onprogress();
        },runtime)
    };
    onprogress();
    window.onload = function(){
        window.loaded = true;
    };
})(window);