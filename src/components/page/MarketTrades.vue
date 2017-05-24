<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 市场</el-breadcrumb-item>
        <el-breadcrumb-item>市场深度</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.market}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="firstTab">
    <el-table :data="marketData" border style="width: 100%">
      <el-table-column prop="buy" label="最高出价" width="150">
      </el-table-column>
      <el-table-column prop="date" label="最新更新时间" :formatter="formatDate" width="150">
      </el-table-column>
      <el-table-column prop="high" label="近24小时内最高价格" width="150">
      </el-table-column>
      <el-table-column prop="last" label="最新成交价格" width="150">
      </el-table-column>
      <el-table-column prop="low" label="近24小时内最低价格" width="150">
      </el-table-column>
      <el-table-column prop="open" label="今日开盘价" width="150">
      </el-table-column>
      <el-table-column prop="prev_close" label="昨日收盘价" width="150">
      </el-table-column>
      <el-table-column prop="sell" label=" 	最低要价" width="150">
      </el-table-column>
      <el-table-column prop="vol" label="近24小时内成交数量" width="150">
      </el-table-column>
      <el-table-column prop="vwap" label="近24小时内平均成交价" width="200">
      </el-table-column>
    </el-table>
    </div>
    <br>
    <p class="ticker">最近更新在 {{ticker}} 秒前</p>
    <br>
    <div class = "secondTab">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="buy">
          <el-table :data="buyData" border style="width: 100%" fit>
            <el-table-column prop="id" label="委买">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="amount" label="数量">
            </el-table-column>
            <el-table-column prop="sum" label="总价">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="sell">
          <el-table :data="sellData" border style="width: 100%">
            <el-table-column prop="id" label="委卖">
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="amount" label="数量">
            </el-table-column>
            <el-table-column prop="sum" label="总价">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    </div>
   </div>
 </div>
</template>
<script>
import axios from 'axios';
import {formateTime} from '../common/common.js'
export default {
  data() {
    return {
      buydata: [],
      selldata: [],
      limit: 200,
      marketData: [],
      price_flag: '',
      amount_flag: '',
      total_flag: '',
      ticker: 0,
      intervalid: ''
    }
  },
  computed:{
    buyData(){
      return this.formatData(this.buydata, 1);
    },
    sellData(){
      return this.formatData(this.selldata, 0);
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
  },
  beforeMount: function(){
    this.timer();
    this.getData();
  },
  methods: {
    timer(){
       this.intervalid = setInterval(function() {
        this.ticker = this.ticker + 1;
        if(this.ticker >= 5){
          this.getData();
          this.ticker = 0;
        }
      }.bind(this),1000);
    },
    getData(){
      var marketname = this.$route.query.market;
      if(marketname == null){
        marketname = 'btccny';
      }
      if(marketname == 'btccny'){
        this.price_flag = '¥';
        this.amount_flag = '฿';
        this.total_flag = '¥';
      }else if(marketname == 'ltccny'){
        this.price_flag = '¥';
        this.amount_flag = 'Ł';
        this.total_flag = '¥';
      }else{
        this.price_flag = '฿';
        this.amount_flag = 'Ł';
        this.total_flag = '฿';
      }
      var tradeurl = 'https://data.btcchina.com/data/orderbook?market='+marketname+'&limit='+this.limit;
      var marketurl = 'https://data.btcchina.com/data/ticker?market=' + marketname;
      axios.get(tradeurl).then((res) => {
        this.buydata = res.data.bids;
        this.selldata = res.data.asks;
      })
      axios.get(marketurl).then((res) => {
        var tmp = [];
        tmp[0] = new Object();
        for(var i in res.data.ticker){
          tmp[0][i] = res.data.ticker[i];
        }
        this.marketData = tmp;
      })
    },
    getData1() {
      this.getData();
      this.ticker = 0;
    },
    formatData(datas, flag) {
      var tradesData = [];
      if(flag == 1){
        for(var i = 0; i < datas.length; i++){
          var tmp = new Object();
          tmp.id = '买(' + (i+1) + ')'
          tmp.price = this.price_flag+datas[i][0];
          tmp.amount = this.amount_flag+datas[i][1];
          tmp.sum =  this.total_flag+(Math.round(datas[i][0] * datas[i][1] * 10000)/10000);
          tradesData[i] = tmp;
        }
      }else{
        for(var i = datas.length; i >= 1; i--){
          var tmp = new Object();
          tmp.id = '卖(' + (datas.length-i+1) + ')'
          tmp.price = this.price_flag+datas[i-1][0];
          tmp.amount = this.amount_flag+datas[i-1][1];
          tmp.sum =  this.total_flag+(Math.round(datas[i-1][0] * datas[i-1][1] * 10000)/10000);
          tradesData[datas.length-i] = tmp;
        }
      }
      return tradesData;
    },
    formatDate: function(row) {
      return formateTime(new Date(parseInt(row.date) * 1000), 'yyyy-MM-dd hh:mm:ss');
    }
  },
  watch:{
    '$route':'getData1'
  },
}
</script>
<style scoped>
</style>