webpackJsonp([2],{403:function(t,e,a){a(441);var r=a(146)(a(414),a(431),"data-v-0b5bbe18",null);t.exports=r.exports},408:function(t,e,a){"use strict";function r(t,e){var a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),"S+":t.getMilliseconds()};/(y+)/i.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(var r in a)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[r]:("00"+a[r]).substr((""+a[r]).length)));return e}e.a=r},414:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(148),n=a.n(r),s=a(408);e.default={data:function(){return{tradesData:[],limit:10,cur_page:1,startDate:new Date-864e5,endDate:new Date-0,marketSelector:1,currencySelector:1,showAll:!0,marketname:"btccny",totalCount:0,startId:0,endId:0,price_flag:"",amount_flag:""}},created:function(){this.getData()},computed:{TradesData:function(){return this.formatData(this.tradesData)}},methods:{handleCurrentChange:function(t){var e=this;if(this.cur_page=t,1==this.cur_page)this.getData();else{var a=this.endId-this.cur_page*this.limit,r="https://data.btcchina.com/data/historydata?since="+a+"&limit="+this.limit+"&market="+this.marketname;n.a.get(r).then(function(t){e.tradesData=t.data})}},getData:function(){var t=this,e="",a=this.startDate,r=Math.round(a/1e3);e="https://data.btcchina.com/data/historydata?since="+r+"limit="+this.limit+"&sincetype=time&market="+this.marketname,n.a.get(e).then(function(s){t.startId=s.data[0].tid,a=t.endDate,r=Math.round(a/1e3),e="https://data.btcchina.com/data/historydata?since="+r+"limit="+t.limit+"&sincetype=time&market="+t.marketname,n.a.get(e).then(function(a){0==a.data.length?(e="https://data.btcchina.com/data/historydata?limit="+t.limit+"&sincetype=time&market="+t.marketname,n.a.get(e).then(function(e){t.tradesData=e.data,t.endId=e.data[e.data.length-1].tid,t.totalCount=t.endId-t.startId+1})):(t.endId=a.data[a.data.length-1].tid,t.totalCount=t.endId-t.startId+1)})}),a=this.endDate,a>=new Date?e="https://data.btcchina.com/data/historydata?limit="+this.limit+"&sincetype=time&market="+this.marketname:(r=Math.round(a/1e3),e="https://data.btcchina.com/data/historydata?since="+r+"limit="+this.limit+"&sincetype=time&market="+this.marketname),n.a.get(e).then(function(a){0==a.data.length&&(e="https://data.btcchina.com/data/historydata?limit="+t.limit+"&sincetype=time&market="+t.marketname,n.a.get(e).then(function(e){t.tradesData=e.data})),t.tradesData=a.data})},formatData:function(t){for(var e=[],a=0;a<t.length;a++){var r=t.length-a-1,n=new Object;n.date=t[r].date,"sell"==t[r].type?n.type="卖出":n.type="买入",n.price=this.price_flag+this.tradesData[r].price,n.amount=this.amount_flag+this.tradesData[r].amount,e[a]=n}return e},formatDate:function(t,e){return a.i(s.a)(new Date(1e3*parseInt(t.date)),"yyyy-MM-dd hh:mm:ss")},startDateChange:function(t){this.startDate=Date.parse(new Date(t)),this.getData()},endDateChange:function(t){var e=new Date(t);this.endDate=Date.parse(e)+576e5-1e3;var a=this.formateTime(new Date(this.endDate),"yyyy-MM-dd hh:mm:ss");console.log(a),this.getData()},selectMarket:function(t){2==t?(this.showAll=!1,this.currencySelector=1):this.showAll=!0,this.setMarketName(),this.getData()},selectCurrency:function(t){this.setMarketName(),this.getData()},setMarketName:function(){1==this.marketSelector&&1==this.currencySelector?(this.marketname="btccny",this.price_flag="¥",this.amount_flag="฿"):1==this.marketSelector&&2==this.currencySelector?(this.marketname="ltccny",this.price_flag="¥",this.amount_flag="Ł"):(this.marketname="ltcbtc",this.price_flag="฿",this.amount_flag="Ł")}}}},422:function(t,e,a){e=t.exports=a(66)(),e.push([t.i,".selector[data-v-0b5bbe18]{background:#c9daf8;border-bottom:1px solid #3c78d8;border-top:1px solid #3c78d8;border-spacing:5px}",""])},431:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),t._v(" 市场")]),t._v(" "),a("el-breadcrumb-item",[t._v("历史交易")])],1)],1),t._v(" "),a("div",{staticClass:"selector"},[a("el-row",{staticClass:"TimeSelecter",attrs:{gutter:20}},[a("el-col",{attrs:{span:2,align:"right"}},[t._v("\n      起止时间:\n    ")]),t._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{type:"date"},on:{change:t.startDateChange},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1)]),t._v(" "),a("el-col",{attrs:{span:1,align:"right"}},[t._v("\n      -\n    ")]),t._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"block"},[a("el-date-picker",{attrs:{type:"date"},on:{change:t.endDateChange},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)])],1),t._v(" "),a("el-row",{staticClass:"MarketSelecter",attrs:{gutter:20}},[a("el-col",{attrs:{span:2,align:"right"}},[t._v("\n      市场:\n    ")]),t._v(" "),a("el-col",{attrs:{span:5}},[a("el-radio-group",{on:{change:t.selectMarket},model:{value:t.marketSelector,callback:function(e){t.marketSelector=e},expression:"marketSelector"}},[a("el-radio",{attrs:{label:1}},[t._v("人民币市场")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("比特币市场")])],1)],1)],1),t._v(" "),a("el-row",{staticClass:"CurrencySelecter",attrs:{gutter:20}},[a("el-col",{attrs:{span:2,align:"right"}},[t._v("\n      交易币种:\n    ")]),t._v(" "),a("el-col",{attrs:{span:5}},[t.showAll?a("el-radio-group",{on:{change:t.selectCurrency},model:{value:t.currencySelector,callback:function(e){t.currencySelector=e},expression:"currencySelector"}},[a("el-radio",{attrs:{label:1}},[t._v("比特币交易")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("莱特币交易")])],1):t._e(),t._v(" "),t.showAll?t._e():a("el-radio-group",{on:{change:t.selectCurrency},model:{value:t.currencySelector,callback:function(e){t.currencySelector=e},expression:"currencySelector"}},[a("el-radio",{attrs:{label:1}},[t._v("莱特币交易")])],1)],1)],1)],1),t._v(" "),a("p",{staticStyle:{"font-style":"italic"}},[t._v("\n    一共搜索到"+t._s(t.totalCount)+"条记录\n  ")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.TradesData,border:""}},[a("el-table-column",{attrs:{prop:"date",label:"交易时间",formatter:t.formatDate}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"交易类型"},scopedSlots:t._u([["default",function(e){return[a("el-tag",{attrs:{type:"买入"===e.row.type?"primary":"success","close-transition":""}},[t._v(t._s(e.row.type))])]}]])}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"成交价"}}),t._v(" "),a("el-table-column",{attrs:{prop:"amount",label:"数量"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.totalCount,"page-size":t.limit},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]}},441:function(t,e,a){var r=a(422);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a(147)("036f68b1",r,!0)}});