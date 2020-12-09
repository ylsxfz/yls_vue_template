import Vue from 'vue'

import sysContainer from './sys-container'
import sysContainerFrame from './sys-container-frame'
import sysLinkBtn from './sys-link-btn'

// 注意 有些组件使用异步加载会有影响
Vue.component('sys-source',()=>import('./sys-container/components/sys-source'))
Vue.component('sys-container', sysContainer)
Vue.component('sys-container-frame', sysContainerFrame)
Vue.component('sys-link-btn', sysLinkBtn)
Vue.component('sys-count-up', () => import('./sys-count-up'))
Vue.component('sys-highlight', () => import('./sys-highlight'))
Vue.component('sys-icon', () => import('./sys-icon'))
Vue.component('sys-icon-svg', () => import('./sys-icon-svg/index.vue'))
Vue.component('sys-icon-select', () => import('./sys-icon-select/index.vue'))
Vue.component('sys-icon-svg-select', () => import('./sys-icon-svg-select/index.vue'))
Vue.component('sys-markdown', () => import('./sys-markdown'))
Vue.component('sys-mde', () => import('./sys-mde'))
Vue.component('sys-module-index-banner', () => import('./sys-module-index-banner'))
Vue.component('sys-module-index-menu', () => import('./sys-module-index-menu'))
Vue.component('sys-quill', () => import('./sys-quill'))
Vue.component('sys-ueditor', () => import('./sys-ueditor'))
