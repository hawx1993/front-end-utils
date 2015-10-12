/**
 * Created by trigkit4 on 15/8/27.
 */
requirejs.config({
    baseUrl: 'script',
    paths:{
        jquery: 'jquery-1.9.1.min'
    }
});
requirejs(['jquery','script','echo'], function ($,s,e) {
    s.tabs({
        element: '#demo',
        triggers: '.main-nav li',
        contents: '.content-item',
        triggerType: 'click',//click,auto,hover
        activeIndex: 0,
        active: 'select'
    });
    e.init({
        offset: 100,
        throttle: 250,
        unload: false
    })
});