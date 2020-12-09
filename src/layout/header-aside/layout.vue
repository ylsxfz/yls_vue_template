<template>
  <div class="sys-layout-header-aside-group" :style="styleLayoutMainGroup" :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="sys-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="sys-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div class="sys-theme-header" :style="{ opacity: this.searchActive ? 0.5 : 1 }" flex-box="0" flex>
        <router-link to="/index" :class="{'logo-group': true, 'logo-transition': asideTransition}" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
          flex-box="0">
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </router-link>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <sys-icon name="bars" />
        </div>
        <sys-menu-header flex-box="1" />
        <!-- 顶栏右侧 -->
        <div class="sys-header-right" flex-box="0">
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <sys-header-log />
          <sys-header-fullscreen />
          <sys-header-theme />
          <sys-header-size />
          <sys-header-locales />
          <sys-header-color />
          <sys-header-user />
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="sys-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div flex-box="0" ref="aside" :class="{'sys-theme-container-aside': true, 'sys-theme-container-transition': asideTransition}"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <sys-menu-side />
        </div>
        <!-- 主体 -->
        <div class="sys-theme-container-main" flex-box="1" flex>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="sys-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="sys-theme-container-main-header" flex-box="0">
                <sys-tabs />
              </div>
              <!-- 页面 -->
              <div class="sys-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view :key="routerViewKey" />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sysMenuSide from './components/menu-side'
  import sysMenuHeader from './components/menu-header'
  import sysTabs from './components/tabs'
  import sysHeaderFullscreen from './components/header-fullscreen'
  import sysHeaderLocales from './components/header-locales'
  import sysHeaderSize from './components/header-size'
  import sysHeaderTheme from './components/header-theme'
  import sysHeaderUser from './components/header-user'
  import sysHeaderLog from './components/header-log'
  import sysHeaderColor from './components/header-color'
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    name: 'sys-layout-header-aside',
    components: {
      sysMenuSide,
      sysMenuHeader,
      sysTabs,
      sysHeaderFullscreen,
      sysHeaderLocales,
      sysHeaderSize,
      sysHeaderTheme,
      sysHeaderUser,
      sysHeaderLog,
      sysHeaderColor
    },
    data() {
      return {
        // [侧边栏宽度] 正常状态
        asideWidth: '200px',
        // [侧边栏宽度] 折叠状态
        asideWidthCollapse: '65px',
        searchActive: false,
      }
    },
    computed: {
      ...mapState('system', {
        keepAlive: state => state.page.keepAlive,
        grayActive: state => state.gray.active,
        transitionActive: state => state.transition.active,
        asideCollapse: state => state.menu.asideCollapse,
        asideTransition: state => state.menu.asideTransition
      }),
      ...mapGetters('system', {
        themeActiveSetting: 'theme/activeSetting'
      }),
      /**
       * @description 用来实现带参路由的缓存
       */
      routerViewKey() {
        // 默认情况下 key 类似 __transition-n-/foo
        // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
        const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
        return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
      },
      /**
       * @description 最外层容器的背景图片样式
       */
      styleLayoutMainGroup() {
        return this.themeActiveSetting.backgroundImage ?
          {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
          } :
          {}
      }
    },
    methods: {
      ...mapActions('system/menu', [
        'asideCollapseToggle'
      ]),
      /**
       * 接收点击切换侧边栏的按钮
       */
      handleToggleAside() {
        this.asideCollapseToggle()
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/assets/style/public-class.scss';
  // 注册主题
  @import '~@/assets/style/theme/register.scss';
</style>
