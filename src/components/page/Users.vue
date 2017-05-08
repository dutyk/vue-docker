<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="usersData" border style="width: 100%">
            <el-table-column prop="userId" label="用户ID" width="150">
            </el-table-column>
            <el-table-column prop="accountCategory" label="账户类别" width="200">
            </el-table-column>
            <el-table-column prop="status" label="账户状态">
            </el-table-column>
            <el-table-column prop="withdrawal_lock" label="是否允许提现">
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间">
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleDetail(scope.$index, scope.row)">用户详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                usersData: [{'userId':'12345', 'accountCategory':'cash', 'status':'active', 'withdrawal_lock':'1', 'created_at':1230999938, 'updated_at':1230999938}],
                cur_page: 1,
                limit: 10,
                userurl:'https://data.btcchina.com/data/historydata?since=0&limit=10'
            }
        },
        created()   {
            // this.getData();
            this.formatDate();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                var since = (val - 1) * this.limit;
                this.userurl = 'https://data.btcchina.com/data/historydata?since=' + since + '&limit=' + this.limit;
                this.getData();
            },
            getData(){
                axios.get(this.userurl).then( (res) => {
                    this.usersData = res.data;
                })
            },
            formatDate() {
              for(var i = 0; i < this.usersData.length; i++)
              {
                this.usersData[i].created_at =  new Date(parseInt(this.usersData[i].created_at) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
                this.usersData[i].updated_at =  new Date(parseInt(this.usersData[i].updated_at) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
              }
            },
            handleDetail(index, row) {
              this.$router.push('/user/userId='+row.userId);
            }
        }
    }
</script>