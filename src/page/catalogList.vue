<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="挂载中的订单" name="1">可用资金: {{balance.data.cny_balance}}&nbsp;&nbsp;挂单资金: {{balance.data.cny_balance_lock}}</el-tab-pane>
        <el-tab-pane label="配置管理" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="4"></el-tab-pane>
      </el-tabs>
      <el-select v-model="selectValue" placeholder="请选择" @change="changeValue" v-show="activeName2==1">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-table :data="tableData" highlight-current-row style="width: 100%" v-loading.body="loading" v-show="activeName2==1">
        <el-table-column label="ID" property="id">
        </el-table-column>
        <el-table-column label="币种类" prop="coinname">
        </el-table-column>
        <el-table-column label="类型" prop="type">
        </el-table-column>
        <el-table-column label="价格" prop="price">
        </el-table-column>
        <el-table-column label="挂单数量" prop="amount">
        </el-table-column>
        <el-table-column label="挂单时间" prop="time">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" v-if='scope.row.status==1' type="warning" @click="handleClose(scope.$index, scope.row)">隐藏</el-button>
            <el-button size="mini" v-else type="info" @click="handleClose(scope.$index, scope.row)">显示</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import { baseUrl, baseImgPath } from '@/config/env'
import { btc_getOrderList, btc_getbalance } from '@/api/getData'
export default {
  data() {
    return {
      activeName2: '1',
      tableData: [],
      loading: true,
      balance: '',
      selectValue: '',
      options: [{
        value: 'ETH',
        label: '以太币ETH'
      }, {
        value: 'INF',
        label: '讯链INF'
      }, {
        value: 'ARDR',
        label: '阿朵ARDR'
      }, {
        value: 'BLK',
        label: '黑币BLK'
      }, {
        value: 'TMC',
        label: '时代币TMC'
      }, {
        value: 'BTS',
        label: '比特股BTS'
      }],
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading = true;
      // vm.activeName = 'all';
      vm.initData('BTS');
    })
  },
  computed: {

  },
  components: {
    headTop,
  },
  methods: {
    async initData(coinname) {
      try {
        // this.city = await cityGuess();
        const data = await btc_getOrderList({ coinname: coinname });
        this.balance = await btc_getbalance();
        console.log('getdata===' + JSON.stringify(data));
        this.tableData = data.data;
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    handleClick(tab, event) {
      //选项卡点击
      this.activeName2 = tab.name;

    },
    changeValue() {
      this.loading = true;
      this.initData(this.selectValue);
    }
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
