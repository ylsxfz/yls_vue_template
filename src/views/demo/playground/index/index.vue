<template>
  <sys-container type="ghost">
    <sys-module-index-banner slot="header" v-bind="banner"/>
    <sys-module-index-menu :menu="menu"/>
  </sys-container>
</template>

<script>
import menu from '@/menu/modules/demo-playground'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'PLAYGROUND',
        subTitle: '在这里可以测试一些 system 的系统功能'
      }
    }
  }
}
</script>
