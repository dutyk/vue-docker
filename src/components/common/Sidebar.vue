<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="/readme">
                <i class="el-icon-setting"></i>交易所介绍
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>市场</template>
                <el-menu-item index="/market/depth">BTC/CNY市场深度</el-menu-item>
                <el-menu-item index="/market/depth?market=ltccny">LTC/CNY市场深度</el-menu-item>
                <el-menu-item index="/market/depth?market=ltcbtc">LTC/BTC市场深度</el-menu-item>
                <el-menu-item index="/market/tradehistory">全站交易历史</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>用户 </template>
                <el-menu-item index="/user">用户详情</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
