<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="用户ID" prop="uid">
                </el-table-column>
                <el-table-column label="内容" prop="content">
                </el-table-column>
                 <el-table-column label="是否回复" prop="is_look">
                </el-table-column>
                  <el-table-column label="回复内容" prop="admin_send">
                </el-table-column>
                <el-table-column label="发布时间">
                    <template slot-scope="scope">
                        {{ scope.row.created_at | moment("YYYY-MM-DD HH:mm") }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button @click.native.prevent="delFeedback(scope.row.id)" type="text" size="small">
                        移除
                    </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from "../components/headTop";
import { getFeedback, delFeedback } from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      expendRow: []
    };
  },
  components: {
    headTop
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      try {
        const data = await getFeedback(this.offset, this.limit);
        if (data) {
          this.tableData = data.data.rows;
          this.count = data.length;
        } else {
          throw new Error("获取数据失败");
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async delFeedback(id) {
      const data = await delFeedback(id);
      if (data.affectedRows == 1) {
        this.initData();
        this.$message({
          showClose: true,
          message: "删除成功！",
          type: "success"
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getOrders();
    },
    async expand(row, status) {}
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
