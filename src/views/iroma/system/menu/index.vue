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
      <el-col :xs="24" :sm="24" :lg="19">
        <div class="app-container">
          <el-form ref="form" :model="form" label-width="120px">
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
                <el-select v-model="form.parantId" placeholder="please select your zone">
                  <el-option v-for="item in menuList" :key="item.value" :label="item.label" :value="item.value"/>
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
            <el-form-item label="title">
              <el-col :span="12">
                <el-input v-model="form.title"/>
              </el-col>
            </el-form-item>
            <el-form-item label="描述">
              <el-col :span="12">
                <el-input v-model="form.desc" type="textarea"/>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
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
export default {

  data() {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      form: {
        id: '',
        name: '',
        path: '',
        parantId: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuList: [{
        label: 'Zone 1',
        value: 'shanghai',
        level: 1
      }, {
        label: 'Zone 2',
        value: 'shanghai2',
        level: 2
      }]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    initMenuTree()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      console.log(data)
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
function initMenuTree() {
  const query = {
    queryType: 1
  }
  const data = getMenuList(query)
  console.log(data)
}
function getMenuList(query) {
  // console.log(query)
  request({
    url: '/api/menu/list',
    method: 'post',
    data: query
  }).then(response => {
    console.log(response.data)
    return response.data
  })
}
</script>

