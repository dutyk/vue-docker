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