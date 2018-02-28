<template>
<div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
        <el-table :data="users" highlight-current-row style="width: 100%" v-loading.body="loading">
            <el-table-column property="id" label="ID" width="100">
            </el-table-column>
            <el-table-column label="头像">
                <template slot-scope="scope">
                        <img :src="scope.row.headimg" class="headimg">
</template>
                </el-table-column>
                <el-table-column property="name" label="用户姓名" width="220">
                </el-table-column>
                <el-table-column property="score" label="积分">
                </el-table-column>
                <el-table-column property="mobile" label="手机">
                </el-table-column>
                <el-table-column label="性别">
<template slot-scope="scope">
<div v-if='scope.row.sex==0'>
    男</div>
<div v-else>女</div>
</template>
                </el-table-column>
                <el-table-column property="address" label="地址">
                </el-table-column>
                <el-table-column label="注册日期" width="220">
<template slot-scope="scope">
 {{ scope.row.created_at | moment("YYYY-MM-DD HH:mm") }}
</template>
                </el-table-column>
                <el-table-column label="操作">
<template slot-scope="scope">
<el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">
    移除
</el-button>
</template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import { getUserList, getUserCount, delUser } from "@/api/getData";
export default {
  data() {
    return {
      users: [],
      currentRow: null,
      offset: 0,
      limit: 10,
      count: 0,
      currentPage: 1,
      loading: true
    };
  },
  components: {
    headTop
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = true;
      vm.initData();
    });
  },
  methods: {
    async initData() {
      try {
        const countData = await getUserCount();
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getUsers();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async deleteRow(val) {
      //删除用户
      try {
        const data = await delUser(val);
        if (data.affectedRows == 1) {
          this.$message({
            message: "删除用户成功",
            type: "success"
          });
        }
        this.getUsers();
      } catch (err) {
        this.$message({
          message: err,
          type: "warning"
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getUsers();
    },
    async getUsers() {
      const Users = await getUserList({
        offset: this.offset,
        limit: this.limit
      });
      this.users = Users;
      if (this.users) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}

.headimg {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>
