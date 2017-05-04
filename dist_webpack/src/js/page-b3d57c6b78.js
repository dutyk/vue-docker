/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var helloComponent = __webpack_require__(2);

	Vue.component('hello', helloComponent);

	var vm = new Vue({
	    el:"#hello",
	    data:{
	        msg:"hello vue"
	    }
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	var helloComponent = Vue.extend({
	    template: '<div><div>{{ mmsg }}</div><input type="text" v-model="mmsg"></div>',
	    data:function(){
	        var msg = 'hello vue component';
	        var returnData = {
	            mmsg:msg
	        };
	        setTimeout(function(){
	            returnData.mmsg = "sss";
	        },1000);
	        return returnData;
	    }
	});
	module.exports=helloComponent;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 *
	 * @author zidong.wang
	 */

	/**
	 * 两个数字相加
	 * @param a 加数
	 * @param b 加数
	 * @returns {*} 和
	 * @author zidong.wang
	 */
	function add(a,b){
	return a+b;

	}
	var i=10;
	if(i<20){
	                add(1,2);
	}

/***/ })
/******/ ]);