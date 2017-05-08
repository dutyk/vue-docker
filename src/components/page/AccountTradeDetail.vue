<template>
  <div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-information"></i> 用户: {{$route.params.userId}}</el-breadcrumb-item>
              <el-breadcrumb-item>账户: {{$route.params.accountId}}</el-breadcrumb-item>
              <el-breadcrumb-item>交易详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  </div>
</template>
<script></script>