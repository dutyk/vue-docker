<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 市场</el-breadcrumb-item>
          <el-breadcrumb-item>历史交易</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="selector">
    <el-row :gutter="20" class="TimeSelecter">
      <el-col :span="2" align="right">
        起止时间:
      </el-col>
      <el-col :span="4">
        <div class="block">
          <el-date-picker
            v-model="startDate"
            type="date"
            @change="startDateChange">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="1" align="right">
        -
      </el-col>
      <el-col :span="4">
        <div class="block">
          <el-date-picker
            v-model="endDate"
            type="date"
            @change="endDateChange">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="MarketSelecter">
      <el-col :span="2" align="right">
        市场:
      </el-col>
      <el-col :span="5">
        <el-radio-group v-model="marketSelector" @change="selectMarket">
          <el-radio :label="1">人民币市场</el-radio>
          <el-radio :label="2">比特币市场</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="CurrencySelecter">
      <el-col :span="2" align="right">
        交易币种:
      </el-col>
      <el-col :span="5">
        <el-radio-group v-model="currencySelector" @change="selectCurrency" v-if="showAll">
          <el-radio :label="1">比特币交易</el-radio>
          <el-radio :label="2">莱特币交易</el-radio>
        </el-radio-group>
        <el-radio-group v-model="currencySelector" @change="selectCurrency" v-if="!showAll">
          <el-radio :label="1">莱特币交易</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    </div>
    <p style="font-style:italic">
      一共搜索到{{totalCount}}条记录
    </p>
    <el-table :data="TradesData" border style="width: 100%">
      <el-table-column prop="date" label="交易时间" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="type" label="交易类型">
      <template scope="scope">
        <el-tag
          :type="scope.row.type === '买入' ? 'primary' : 'success'"
          close-transition>{{scope.row.type}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column prop="price" label="成交价">
      </el-table-column>
      <el-table-column prop="amount" label="数量">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change ="handleCurrentChange"
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="limit">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    import axios from 'axios';
    import {formateTime} from '../common/common.js'
    export default {
      data() {
        return {
          tradesData: [],
          limit: 10,
          cur_page: 1,
          startDate: new Date()-3600 * 1000 * 24,
          endDate: new Date() - 0,
          marketSelector: 1,
          currencySelector: 1,
          showAll: true,
          marketname: 'btccny',
          totalCount: 0,
          startId: 0,
          endId: 0,
          price_flag: '',
          amount_flag: ''
        }
      },
      created() {
          this.getData();
      },
      computed:{
        TradesData() {
          return this.formatData(this.tradesData);
        }
      },
      methods: {
        handleCurrentChange(val) {
          this.cur_page = val;
          if(this.cur_page == 1){
            this.getData();
          }else{
            var id = this.endId - this.cur_page * this.limit;
            var tradesurl = 'https://data.btcchina.com/data/historydata?since='+id+'&limit='+this.limit+'&market='+this.marketname;
              axios.get(tradesurl).then( (res) => {
                this.tradesData = res.data;
            })
          }
        },
        getData() {
          var tradesurl = '';
          //计算startId和endId
          var showTime = this.startDate;
          var time = Math.round(showTime / 1000);
          tradesurl = 'https://data.btcchina.com/data/historydata?since='+time+'limit='+this.limit+'&sincetype=time&market='+this.marketname;
          axios.get(tradesurl).then( (res) => {
            this.startId = res.data[0].tid;
            showTime = this.endDate;
            time = Math.round(showTime / 1000);
            tradesurl = 'https://data.btcchina.com/data/historydata?since='+time+'limit='+this.limit+'&sincetype=time&market='+this.marketname;
            axios.get(tradesurl).then( (res) => {
              if(res.data.length == 0){
                tradesurl = 'https://data.btcchina.com/data/historydata?limit='+this.limit+'&sincetype=time&market='+this.marketname;
                axios.get(tradesurl).then( (res) => {
                  this.tradesData = res.data;
                  this.endId = res.data[res.data.length-1].tid;
                  this.totalCount = this.endId - this.startId + 1;
                })
              }else{
                this.endId = res.data[res.data.length-1].tid;
                this.totalCount = this.endId - this.startId + 1;
              }
            })
          })
          showTime = this.endDate;
          if(showTime >= (new Date())){
            tradesurl = 'https://data.btcchina.com/data/historydata?limit='+this.limit+'&sincetype=time&market='+this.marketname;
          }else{
            time = Math.round(showTime / 1000);
            tradesurl = 'https://data.btcchina.com/data/historydata?since='+time+'limit='+this.limit+'&sincetype=time&market='+this.marketname;
          }
          axios.get(tradesurl).then( (res) => {
            if(res.data.length == 0){
              tradesurl = 'https://data.btcchina.com/data/historydata?limit='+this.limit+'&sincetype=time&market='+this.marketname;
              axios.get(tradesurl).then( (res) => {
                this.tradesData = res.data;
              })
            }
            this.tradesData = res.data;
          })
        },
        formatData(tradesData) {
          var TradesData = [];
          for(var i = 0; i < tradesData.length; i++){
            var j = tradesData.length - i - 1;
            var tmp = new Object();
            tmp.date = tradesData[j].date;
            if(tradesData[j].type == 'sell'){
              tmp.type = '卖出';
            }else{
              tmp.type = '买入';
            }
            tmp.price = this.price_flag+this.tradesData[j].price;
            tmp.amount = this.amount_flag+this.tradesData[j].amount;
            TradesData[i] = tmp;
          }
          return TradesData;
        },
        formatDate(row, column) {
          return formateTime(new Date(parseInt(row.date) * 1000), 'yyyy-MM-dd hh:mm:ss');
        },
        startDateChange(value) {
          this.startDate = Date.parse(new Date(value));
          this.getData();
        },
        endDateChange(value) {
          var tmp = new Date(value);
          this.endDate = Date.parse(tmp) + 16 * 3600 * 1000 - 1000;
          var tmp1 = this.formateTime(new Date(this.endDate), 'yyyy-MM-dd hh:mm:ss');
          console.log(tmp1);
          this.getData();
        },
        selectMarket(value) {
          if(value == 2){
            this.showAll = false;
            this.currencySelector = 1;
          }else{
            this.showAll = true;
          }
          this.setMarketName();
          this.getData();
        },
        selectCurrency(value) {
          this.setMarketName();
          this.getData();
        },
        setMarketName() {
          if(this.marketSelector == 1 && this.currencySelector == 1){
            this.marketname = 'btccny';
            this.price_flag = '¥';
            this.amount_flag = '฿';
          }else if(this.marketSelector == 1 && this.currencySelector == 2){
            this.marketname = 'ltccny';
            this.price_flag = '¥';
            this.amount_flag = 'Ł';
          }else{
            this.marketname = 'ltcbtc';
            this.price_flag = '฿';
            this.amount_flag = 'Ł';
          }
        }
      }
    }
</script>
<style scoped>
  .selector{
    background:#c9daf8;
    border-bottom:1px solid #3c78d8;
    border-top:1px solid #3c78d8;
    border-spacing: 5px;
  }
</style>