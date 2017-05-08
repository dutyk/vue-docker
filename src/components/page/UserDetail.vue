<template>
    <div>
      <div class="crumbs">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item><i class="el-icon-information"></i> 用户: {{$route.params.userId}}</el-breadcrumb-item>
                <el-breadcrumb-item>账户详情</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <el-table :data="accountsData" border style="width: 100%">
          <el-table-column prop="accountId" label="账户ID" width="150">
          </el-table-column>
          <el-table-column prop="currency" label="币种" width="200">
          </el-table-column>
          <el-table-column prop="available" label="余额">
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间">
          </el-table-column>
          <el-table-column prop="updated_at" label="更新时间">
          </el-table-column>
          <el-table-column label="操作" width="150">
              <template scope="scope">
                  <el-button size="small"
                          @click="handleTradeDetail(scope.$index, scope.row)">交易详情</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            accountsData: [{'accountId':'12345', 'currency':'BTC', 'available':12.0, 'created_at':1230999938, 'updated_at':1230999938}],
            cur_page: 1,
            userId: '',
            accounturl:'https://data.btcchina.com/data/userid='
        }
    },
    created(){
        // this.getData();
        this.formatDate();
        this.userId = this.$route.params.userId;
        this.accounturl = this.accounturl + this.userid;
    },
    methods: {
        getData(){
            axios.get(this.accounturl).then( (res) => {
                this.accountsData = res.data;
            })
        },
        formatDate() {
          for(var i = 0; i < this.accountsData.length; i++)
          {
            this.accountsData[i].created_at =  new Date(parseInt(this.accountsData[i].created_at) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
            this.accountsData[i].updated_at =  new Date(parseInt(this.accountsData[i].updated_at) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
          }
        },
        handleTradeDetail(index, row) {
          this.$router.push('/user/userId='+this.userId+'/accountId='+row.accountId);
        }
    }
}
</script>