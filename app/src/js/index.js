"use strict";
var helloComponent = require('./vue/hello.js');

Vue.component('hello', helloComponent);

var vm = new Vue({
    el:"#hello",
    data:{
        msg:"hello vue"
    }
});