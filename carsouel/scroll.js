
var carousel = function() {
    
    function $(id) {
        return document.getElementById(id);
    }
    
    return {
        //count图片数量，wrapper:包裹图片的Div，pagination：分页按钮
        scroll : function(count,wrapper,pagination) {
            var self=this;
            var order = true,index = 0,outoPlay=null,timer = null;
            
            //添加Li按钮
            var frag=document.createDocumentFragment();
            self.num=[]; //存储各个li
            for(var i=0;i<count;i++){
                (this.num[i]=frag.appendChild(document.createElement("li"))).innerHTML=i+1;
            }
            $(pagination).appendChild(frag);
            
            this.num[0].className="active";//为第一个li添加active样式
            
            auto();
            //为所有的li添加点击事件
            for( i = 0;i < self.num.length;i++){
                self.num[i].id = i;
                self.num[i].onclick = function(){
                    index = this.id;
                    startRolling(index);
                }
            }
            $(pagination).onmouseover = function(){
                clearInterval(outoPlay);
            };
            $(pagination).onmouseout = function(){
                auto();
            };
          
            // 设置自动播放
            function auto(){
                outoPlay = setInterval(function(){
                    if(order){
                        index++;
                    }
                    else{
                        index--;
                    }
                    if(index >= self.num.length){
                        index = 0;
                        order=true;
                    }
                    startRolling(index);
                },5000);
            }

            function startRolling(target){
                for(var i=0;i<self.num.length;i++){
                    self.num[i].className="";
                }
                self.num[target].className="active";
                clearInterval(timer);
                timer = setInterval(function(){
                    rolling(target);
                },20);
            }
            // 设置滚动速度
            function rolling(target){
                var carousel = $("carousel-list");

                if(!carousel.style.top){
                    carousel.style.top = "0px";
                }
                var pos = parseInt(carousel.style.top);
                var top_pos = -102*target;
                var dist = 0;
                if(pos == top_pos){
                    return true;
                }
                if(pos < top_pos){
                    dist = Math.ceil((top_pos - pos)/10);
                    pos = pos + dist;
                }
                if(pos > top_pos){
                    dist = Math.ceil((pos - top_pos)/10);
                    pos = pos - dist;
                }
                carousel.style.top = pos+"px";
            }
        }
    };
}();
