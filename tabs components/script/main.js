/**
 * Created by trigkit4 on 15/8/12.
 */
requirejs.config({
    baseUrl: 'script'
});
requirejs(['click','auto','delay','hover'], function (c,a,d,h) {
    c.click();
    //d.delay();
    //h.hover();
    //a.auto();
    
});