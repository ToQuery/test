<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix"><span>系统配置管理</span></div>
      <div>
        <div class="filter-container">
          <el-input v-model="data.filter.filter_configGroupLike" clearable :placeholder="$t('system.config.configGroup')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-input v-model="data.filter.filter_configNameLike" clearable :placeholder="$t('system.config.configName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-input v-model="data.filter.filter_configValueLike" clearable :placeholder="$t('system.config.configValue')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleShowEdit(undefined)">
            {{ $t('table.add') }}
          </el-button>
        </div>
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="data.content"
          border
          fit
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column :label="$t('system.config.configGroup')" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.configGroup }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('system.config.configName')" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.configName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('system.config.configValue')" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.configValue }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('system.config.sortNum')" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sortNum }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleShowEdit(row.id)">
                {{ $t('table.edit') }}
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(row.id)">
                {{ $t('table.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="data.page.totalElements > 0" :total="data.page.totalElements" :page.sync="data.page.pageNumber" :limit.sync="data.page.pageSize" @pagination="queryContent" />

        <edit-vue ref="editVue" @success="handleEditSuccess" />
      </div>
    </el-card>
  </div>
</template>

<script>
import sysConfigApi from '@/api/system/config'

import editVue from './edit'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SystemConfig',
  components: { editVue, Pagination },
  directives: { waves },
  filters: {
  },
  data() {
    return {
      tableKey: 0,
      data: {
        filter: {
          filter_configValueLike: '',
          filter_configGroupLike: '',
          filter_configNameLike: ''
        },
        page: {
          pageSize: 10,
          pageNumber: 1,
          totalElements: 0,
          totalPages: 0
        },
        content: null
      },
      listLoading: true,
      downloadLoading: false
    }
  },
  created() {
    this.queryContent()
  },
  methods: {
    queryContent() {
      this.listLoading = true
      sysConfigApi.query(this.data.filter, this.data.page).then(response => {
        this.data.content = response.content
        this.data.page = response.page
        this.listLoading = false
      }).catch(e => {
        this.listLoading = false
        this.$notify({ title: '错误', message: e.message || '错误', type: 'error', duration: 2000 })
        console.error(e)
      })
    },
    handleShowEdit(id) {
      this.$refs['editVue'].handleShowEdit(id)
    },
    handleEditSuccess() {
      this.queryContent()
    },
    handleFilter() {
      this.data.page.pageNumber = 1
      this.queryContent()
    },
    handleDelete(id) {
      sysConfigApi.deleteById(id).then(response => {
        this.$notify({ title: '成功', message: response.message || '删除成功', type: 'success', duration: 2000 })
        this.queryContent()
      }).catch(e => {
        this.$notify({ title: '错误', message: e.message || '错误', type: 'error', duration: 2000 })
      })
    }
  }
}
</script>
