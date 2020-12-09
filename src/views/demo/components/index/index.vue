<template>
  <sys-container type="ghost">
    <sys-module-index-banner slot="header" v-bind="banner"/>
    <sys-module-index-menu :menu="menu"/>
  </sys-container>
</template>

<script>
import menu from '@/menu/modules/demo-components'
export default {
  data () {
    return {
      menu,
      banner: {
        title: 'COMPONENTS',
        subTitle: 'system 为你提供了一些上手即用的组件'
      }
    }
  }
}
</script>
