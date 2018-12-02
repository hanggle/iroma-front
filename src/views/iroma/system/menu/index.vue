<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="5">
        <div >
          <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;width:80%;" />
          <el-tree
            ref="tree2"
            :data="data2"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="18">
        <div class="app-container">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="title">
              <el-col :span="12">
                <el-input v-model="form.title"/>
              </el-col>
            </el-form-item>
            <el-form-item label="菜单名称">
              <el-col :span="12">
                <el-input v-model="form.name"/>
              </el-col>
            </el-form-item>
            <el-form-item label="菜单ID">
              <el-col :span="12">
                <el-input :readonly="true" v-model="form.id" />
              </el-col>
            </el-form-item>
            <el-form-item label="菜单URL">
              <el-col :span="12">
                <el-input v-model="form.path"/>
              </el-col>
            </el-form-item>
            <el-form-item label="上级菜单">
              <el-col :span="12">
                <el-select v-model="form.parentId" placeholder="please select your zone">
                  <el-option v-for="item in menuList" :key="item.id" :label="item.label" :value="item.value"/>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="序号">
              <el-col :span="12">
                <el-input v-model="form.orderCode" />
              </el-col>
            </el-form-item>
            <el-form-item label="icon">
              <el-col :span="12">
                <el-input v-model="form.icon"/>
              </el-col>
            </el-form-item>
            <el-form-item label="描述">
              <el-col :span="12">
                <el-input v-model="form.desc" type="textarea"/>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-edit" @click="onCreate">新增</el-button>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button type="primary" icon="el-icon-delete" @click="onDelete">删除</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/utils/request'

const defaultForm = {
  id: '',
  name: '',
  path: '',
  parentId: '',
  orderCode: '',
  title: '',
  desc: '',
  icon: ''
}
export default {

  data() {
    return {
      filterText: '',
      data2: [],
      form: Object.assign({}, defaultForm),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuList: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.initMenuTree()
    this.loadMenuSelect()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      request({
        url: '/api/menu/get',
        method: 'get',
        params: { id: data.id }
      }).then(response => {
        const result = response.data
        this.form.id = result.id
        this.form.name = result.name
        this.form.path = result.path
        this.form.title = result.title
        this.form.parentId = result.parentId
        this.form.orderCode = result.orderCode
        this.form.desc = result.description
        this.form.icon = result.icon
      })
    },
    onCreate() {
      this.form = Object.assign({}, defaultForm)
    },
    onSubmit() {
      const data = {
        id: this.form.id,
        name: this.form.name
      }
      console.log(data)
      request({
        url: '/api/menu/insert',
        method: 'post',
        data: this.form
      }).then(response => {
        if (response.data) {
          this.$message('submit!')
        }
      })
    },
    onDelete() {
      this.$message('delete!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    initMenuTree() {
    // console.log(query)
      request({
        url: '/api/menu/menuTree',
        method: 'get',
        data: {}
      }).then(response => {
        this.data2.push(response.data)
      })
    },
    loadMenuSelect() {
      request({
        url: '/api/menu/menuSelect',
        method: 'get',
        data: {}
      }).then(response => {
        const data = response.data
        data.forEach(item => {
          this.menuList.push(item)
        })
        console.log(this.menuList)
      })
    }
  }
}
</script>

