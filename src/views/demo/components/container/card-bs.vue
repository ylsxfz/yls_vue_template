<template>
  <sys-container type="card" better-scroll>
    <template slot="header">Header</template>
    <sys-demo-article/>
    <template slot="footer">Footer</template>
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
