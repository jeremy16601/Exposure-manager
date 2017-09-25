<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">

                <el-table-column label="ID" property="id" width="80">
                </el-table-column>
                <el-table-column label="发布者" prop="author">
                </el-table-column>
                <el-table-column label="标题" prop="title" width="400">
                </el-table-column>
                <el-table-column label="查看" prop="view_times">
                </el-table-column>
                <el-table-column label="赞" prop="zan">
                </el-table-column>
                <el-table-column label="发布日期">
                    <template scope="scope">
                        {{ scope.row.created_at | moment("YYYY-MM-DD HH:mm") }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="mini" v-if='scope.row.status==1' type="warning" @click="handleClose(scope.$index, scope.row)">隐藏</el-button>
                         <el-button size="mini" v-else type="info" @click="handleClose(scope.$index, scope.row)">显示</el-button> 
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import { baseUrl, baseImgPath } from '@/config/env'
import { getArticles, updateArticle, getACount, arCategory, searchplace, deleteArticle } from '@/api/getData'
export default {
    data() {
        return {
            baseUrl,
            baseImgPath,
            city: {},
            offset: 0,
            limit: 10,
            count: 0,
            tableData: [],
            currentPage: 1,
            selectTable: {},
            dialogFormVisible: false,
            categoryOptions: [],
            selectedCategory: [],
            address: {},
        }
    },
    created() {
        this.initData();
    },
    components: {
        headTop,
    },
    methods: {
        async initData() {
            try {
                // this.city = await cityGuess();
                const countData = await getACount();
                if (countData.status == 1) {
                    this.count = countData.count;
                } else {
                    throw new Error('获取数据失败');
                }
                this.getArticles();
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        async getCategory() {
            try {
                const categories = await arCategory();
                categories.forEach(item => {
                    if (item.sub_categories.length) {
                        const addnew = {
                            value: item.name,
                            label: item.name,
                            children: []
                        }
                        item.sub_categories.forEach((subitem, index) => {
                            if (index == 0) {
                                return
                            }
                            addnew.children.push({
                                value: subitem.name,
                                label: subitem.name,
                            })
                        })
                        this.categoryOptions.push(addnew)
                    }
                })
            } catch (err) {
                console.log('获取商铺种类失败', err);
            }
        },
        async getArticles() {
            const { latitude, longitude } = this.city;
            console.log('文章列表：offset=' + this.offset + 'limit:' + this.limit)
            this.tableData = await getArticles(this.offset, this.limit);

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            this.getArticles()
        },
        async  handleClose(index, row) {

            if (row.status == 1) {
                row.status = 0;
            } else {
                row.status = 1;
            }
            try {
                const result = await updateArticle(row.id, row);
                if (result) {
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: result.message
                    });
                }
            } catch (err) {
                console.log(err)
            }
        },
        handleEdit(index, row) {
            this.$router.push({ path: 'updateArticle', query: { aid: row.id } })
        },
        addArticle(index, row) {
            this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id } })
        },
        async handleDelete(index, row) {
            try {
                const res = await deleteArticle(row.id);
                if (res) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.tableData.splice(index, 1);
                } else {
                    throw new Error(res.message)
                }
            } catch (err) {
                this.$message({
                    type: 'error',
                    message: err.message
                });
                console.log('删除失败')
            }
        },
        async querySearchAsync(queryString, cb) {
            // if (queryString) {
            //     try {
            //         const cityList = await searchplace(this.city.id, queryString);
            //         if (cityList instanceof Array) {
            //             cityList.map(item => {
            //                 item.value = item.address;
            //                 return item;
            //             })
            //             cb(cityList)
            //         }
            //     } catch (err) {
            //         console.log(err)
            //     }
            // }
        },
        addressSelect(vale) {
            const { address, latitude, longitude } = vale;
            this.address = { address, latitude, longitude };
        },
        async updateShop() {
            // this.dialogFormVisible = false;
            // try{
            //     Object.assign(this.selectTable, this.address);
            //     this.selectTable.category = this.selectedCategory.join('/');
            //     const res = await updateResturant(this.selectTable)
            //     if (res.status == 1) {
            //         this.$message({
            //             type: 'success',
            //             message: '更新店铺信息成功'
            //         });
            //         this.getArticles();
            //     }else{
            //         this.$message({
            //             type: 'error',
            //             message: res.message
            //         });
            //     }
            // }catch(err){
            //     console.log('更新餐馆信息失败', err);
            // }
        },
    },
}
</script>

<style lang="less">
@import '../style/mixin';
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

.table_container {
    padding: 20px;
}

.Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
