<template>
  <el-table :data="list" v-bind="table">
    <el-table-column prop="title" align="center" width="160"/>
    <el-table-column label="预览" width="120">
      <div slot-scope="scope" class="theme-preview" :style="{ backgroundImage: `url(${scope.row.preview})` }"/>
    </el-table-column>
    <el-table-column prop="address" align="center">
      <template slot-scope="scope">
        <el-button v-if="activeName === scope.row.name" type="success" icon="el-icon-check" round>已激活</el-button>
        <el-button v-else round @click="handleSelectTheme(scope.row.name)">使用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'sys-theme-list',
  data () {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('system/theme', [
      'list',
      'activeName'
    ])
  },
  methods: {
    ...mapActions('system/theme', [
      'set'
    ]),
    handleSelectTheme (name) {
      this.set(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
}
</style>
