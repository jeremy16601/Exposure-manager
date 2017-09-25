<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="users" highlight-current-row style="width: 100%">
                <el-table-column property="id" label="ID" width="100">
                </el-table-column>
                <el-table-column label="注册日期" width="220">
                    <template scope="scope">
                        {{ scope.row.created_at | moment("YYYY-MM-DD HH:mm") }}
                    </template>
                </el-table-column>
                <el-table-column property="name" label="用户姓名" width="220">
                </el-table-column>
                <el-table-column property="score" label="积分">
                </el-table-column>
                <el-table-column property="mobile" label="手机">
                </el-table-column>
                <el-table-column property="sex" label="性别">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import { getUserList, getUserCount } from '@/api/getData'
export default {
    data() {
        return {
            users: [],
            currentRow: null,
            offset: 0,
            limit: 15,
            count: 0,
            currentPage: 1,
        }
    },
    components: {
        headTop,
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            try {
                const countData = await getUserCount();
                if (countData.status == 1) {
                    this.count = countData.count;
                } else {
                    throw new Error('获取数据失败');
                }
                this.getUsers();
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getUsers()
        },
        async getUsers() {
            const Users = await getUserList({ offset: this.offset, limit: this.limit });
            this.users = Users;

        }
    },
}
</script>

<style lang="less">
@import '../style/mixin';
.table_container {
    padding: 20px;
}
</style>
