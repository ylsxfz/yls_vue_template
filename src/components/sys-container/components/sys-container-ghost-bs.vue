<template>
  <div class="sys-container-ghost-bs">
    <div v-if="$slots.header" class="sys-container-ghost-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="sys-container-ghost-bs__body" ref="wrapper">
      <!-- https://github.com/sys-projects/sys-admin/issues/181 -->
      <div>
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" class="sys-container-ghost-bs__footer" ref="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'sys-container-card-bs',
  mixins: [
    bs
  ]
}
</script>
