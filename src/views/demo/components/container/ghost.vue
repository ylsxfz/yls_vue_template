<template>
  <sys-container type="ghost">
    <div class="sys-pt sys-pb">
      <el-card shadow="never" class="sys-card" style="width: 400px;">
        <sys-demo-article/>
      </el-card>
    </div>
  </sys-container>
</template>

<script>
import d2DemoArticle from './components/sys-demo-article'
export default {
  components: {
    'sys-demo-article': d2DemoArticle
  }
}
</script>
