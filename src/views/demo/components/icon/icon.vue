<template>
  <sys-container>
    <template slot="header">图标组件</template>
    <sys-icon class="sys-mr-10"/>
    <sys-icon name="github" class="sys-mr-10"/>
    <sys-icon name="github" style="font-size: 100px;" class="sys-mr-10"/>
    <sys-icon name="github" class="icon-demo"/>
  </sys-container>
</template>

<style lang="scss" scoped>
.icon-demo {
  transition: all .3s;
  font-size: 100px;
  color: #409EFF;
  &:hover{
    color: #F56C6C;
    transform: scale(1.2) rotate(30deg);
  }
}
</style>
