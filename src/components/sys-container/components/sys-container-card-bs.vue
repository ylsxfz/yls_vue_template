<template>
  <div class="sys-container-card-bs">
    <div v-if="$slots.header" class="sys-container-card-bs__header" ref="header">
      <slot name="header"/>
    </div>
    <div class="sys-container-card-bs__body" ref="wrapper">
      <div class="sys-container-card-bs__body-wrapper-inner">
        <div class="sys-container-card-bs__body-card">
          <slot/>
        </div>
      </div>
    </div>
    <div v-if="$slots.footer" class="sys-container-card-bs__footer" ref="footer">
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
