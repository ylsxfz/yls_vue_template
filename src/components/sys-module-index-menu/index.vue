<template>
  <transition name="fade-transverse">
    <div v-if="show" class="sys-module-index-menu">
      <sys-module-index-menu-group
        v-for="(item, index) in menu.children"
        :key="index"
        :menu="item"/>
    </div>
  </transition>
</template>

<script>
import sysModuleIndexMenuGroup from './components/group'
export default {
  components: {
    sysModuleIndexMenuGroup
  },
  props: {
    menu: {
      default: () => ({
        children: []
      })
    }
  },
  data () {
    return {
      show: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, 300)
  }
}
</script>

<style lang="scss">
.sys-module-index-menu {
  margin-top: 20px;
}
</style>
