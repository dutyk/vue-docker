webpackJsonp([7],{410:function(t,a,e){var r=e(146)(e(422),e(445),null,null);t.exports=r.exports},422:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=e(148),c=e.n(r);a.default={data:function(){return{accountsData:[{accountId:"12345",currency:"BTC",available:12,created_at:1230999938,updated_at:1230999938}],cur_page:1,userId:"",accounturl:"https://data.btcchina.com/data/userid="}},created:function(){this.formatDate(),this.userId=this.$route.params.userId,this.accounturl=this.accounturl+this.userid},methods:{getData:function(){var t=this;c.a.get(this.accounturl).then(function(a){t.accountsData=a.data})},formatDate:function(){for(var t=0;t<this.accountsData.length;t++)this.accountsData[t].created_at=new Date(1e3*parseInt(this.accountsData[t].created_at)).toLocaleString().replace(/年|月/g,"-").replace(/日/g," "),this.accountsData[t].updated_at=new Date(1e3*parseInt(this.accountsData[t].updated_at)).toLocaleString().replace(/年|月/g,"-").replace(/日/g," ")},handleTradeDetail:function(t,a){this.$router.push("/user/userId="+this.userId+"/accountId="+a.accountId)}}}},445:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"crumbs"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[e("i",{staticClass:"el-icon-information"}),t._v(" 用户: "+t._s(t.$route.params.userId))]),t._v(" "),e("el-breadcrumb-item",[t._v("账户详情")])],1)],1),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.accountsData,border:""}},[e("el-table-column",{attrs:{prop:"accountId",label:"账户ID",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"currency",label:"币种",width:"200"}}),t._v(" "),e("el-table-column",{attrs:{prop:"available",label:"余额"}}),t._v(" "),e("el-table-column",{attrs:{prop:"created_at",label:"创建时间"}}),t._v(" "),e("el-table-column",{attrs:{prop:"updated_at",label:"更新时间"}}),t._v(" "),e("el-table-column",{attrs:{label:"操作",width:"150"},scopedSlots:t._u([["default",function(a){return[e("el-button",{attrs:{size:"small"},on:{click:function(e){t.handleTradeDetail(a.$index,a.row)}}},[t._v("交易详情")])]}]])})],1)],1)},staticRenderFns:[]}}});