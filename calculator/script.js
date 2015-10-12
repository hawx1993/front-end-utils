/**
 * Created by trigkit4 on 14/12/21.
 */
//从document中获取所有btns
window.onload = function () {
    var btns = document.querySelectorAll("#calculator span");
    var characters = ['+','-','x','÷'];

    //给所有btns和符号添加onclick事件
    for(var i = 0;i<btns.length;i++){
        btns[i].onclick = function(e) {
            var input = document.querySelector('.input');
            var inputVal = input.innerHTML;
            var btnVal = this.getAttribute('data-value');
            var mark = this.getAttribute('_type');
            var value = this.value;//获取当前的值

            //现在只需将btnVal的值添加到输入的字符串中然后使用eval函数去获取最终结果
            if (btnVal == 'C') {
                input.innerHTML = '';//clear键按下，则清除一切
                decimalAdded = false;
            }
            else if (btnVal == '=') {
                var equation = inputVal;
                var lastChar = equation[equation.length - 1];
                //分别用*和/代替所有的x和÷，使用正则表达式的g可以代替所有的匹配的characters/substring
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

                if (characters.indexOf(lastChar) > -1 || lastChar == '.') {
                    equation = equation.replace(/.$/, '');
                }
                if (equation) {
                    input.innerHTML = eval(equation);
                    decimalAdded = false;
                }
            }
            //indexOf需IE9+才能正常运行
            else if (characters.indexOf(btnVal) > -1) {
                //获取最后一个字符从equation
                var lastChar = inputVal[inputVal.length - 1];
                if (inputVal != '' && characters.indexOf(lastChar) == -1) {
                    input.innerHTML += btnVal;
                }

                else if (inputVal == '' && btnVal == '-') {
                    input.innerHTML += btnVal;
                }
                //用最新按下的字符替换最后的字符（如果有的话）
                if (characters.indexOf(lastChar) > -1 && inputVal.length > 1) {
                    input.innerHTML = inputVal.replace((/.$/, btnVal));
                }
                decimalAdded = false;
            }

            else if (btnVal == '.') {
                if (!decimalAdded) {
                    input.innerHTML += btnVal;
                    decimalAdded = true;
                }
            }

            //如果其他键被按下了，那就添加进去
            else {
                input.innerHTML += btnVal;
            }
            //阻止页面跳转
            e.preventDefault();


        }

    }
};







