<template>
  <div class="page-login">
    <div class="page-login--content-main">
      <!-- logo -->
      <!-- <img class="page-login--logo" src="./image/logo@2x.png"> -->
      <h1 class="page-login--content-title">系统登录</h1>
      <!-- form -->
      <div class="page-login--form">
        <el-card shadow="never">
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="loginForm" size="default">
            <el-form-item prop="username">
              <el-input type="text" v-model="loginForm.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="密码">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="12">
                <el-form-item prop="captcha">
                  <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新" style="width: 100%;">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item>
                  <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- <el-button size="default" @click="submit" type="primary" class="button-login">
              登录
            </el-button> -->
            <el-form-item style="width:100%;">
              <el-button type="info" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
              <el-button type="primary" style="width:48%;" @click.native.prevent="submit" :loading="loading">登 录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <p class="page-login--options" flex="main:justify cross:center">
          <span>
            <sys-icon name="question-circle" /> 忘记密码</span>
          <span>注册用户</span>
        </p>
        <!-- quick login -->
        <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
          快速选择用户（测试功能）
        </el-button>
        <div class="page-login--layer-time">北京时间：{{time}}</div>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="page-login--quick-user" @click="handleUserBtnClick(user)">
            <sys-icon name="user-circle-o" />
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import $ from "jquery";
  import {
    mapActions
  } from 'vuex'
  import localeMixin from '@/locales/mixin.js'
  export default {
    mixins: [
      localeMixin
    ],
    data() {
      return {
        timeInterval: null,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        // 快速选择用户
        dialogVisible: false,
        users: [{
            name: 'Admin',
            username: 'admin',
            password: 'admin'
          },
          {
            name: 'Editor',
            username: 'editor',
            password: 'editor'
          },
          {
            name: 'User1',
            username: 'user1',
            password: 'user1'
          }
        ],
        loading: false,
        // 表单
        loginForm: {
          username: 'admin',
          password: 'admin',
          captcha: '',
          src: ''
        },
        // 表单校验
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      /**
       * 刷新时间
       */
      this.timeInterval = setInterval(() => {
        this.refreshTime()
      }, 1000)

      /**
       * 验证码刷新
       */
      this.refreshCaptcha()

      /**
       * 背景图
       */
      update()

      window.addEventListener('resize', update())
    },
    beforeDestroy() {
      clearInterval(this.timeInterval)
    },
    methods: {
      ...mapActions('system/account', [
        'login'
      ]),

      refreshTime() {
        this.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
      },

      refreshCaptcha: function() {
        this.loginForm.src = this.$global.baseUrl + "/sys/login/captcha.jpg?t=" + new Date().getTime();
      },

      reset() {
        this.$refs.loginForm.resetFields()
      },

      /**
       * @description 接收选择一个用户快速登录的事件
       * @param {Object} user 用户信息
       */
      handleUserBtnClick(user) {
        this.loginForm.username = user.username
        this.loginForm.password = user.password
        this.submit()
      },

      /**
       * @description 提交表单
       */
      // 提交登录信息
      submit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 登录
            // 注意 这里的演示没有传验证码
            // 具体需要传递的数据请自行修改代码
            this.login({
                username: this.loginForm.username,
                password: this.loginForm.password
              })
              .then(() => {
                // 重定向对象不存在则返回顶层路径
                this.$router.replace(this.$route.query.redirect || '/')
              })
          } else {
            // 登录表单校验失败
            this.$message.error('表单校验失败，请检查')
          }
        })
      }
    },


  }



  let max_particles = 100;
  let particles = [];
  let frequency = 100;
  let init_num = max_particles;
  let max_time = frequency * max_particles;
  let time_to_recreate = false;

  // Enable repopolate
  setTimeout(function() {
    time_to_recreate = true;
  }.bind(this), max_time)

  // Popolate particles
  popolate(max_particles);

  var tela = document.createElement('canvas');
  tela.width = $(window).width();
  tela.height = $(window).height();
  $("body").append(tela);

  var canvas = tela.getContext('2d');

  class Particle {
    constructor(canvas, options) {
      let colors = ["#feea00", "#a9df85", "#5dc0ad", "#ff9a00", "#fa3f20"]
      let types = ["full", "fill", "empty"]
      this.random = Math.random()
      this.canvas = canvas;
      this.progress = 0;

      this.x = ($(window).width() / 2) + (Math.random() * 200 - Math.random() * 200)
      this.y = ($(window).height() / 2) + (Math.random() * 200 - Math.random() * 200)
      this.w = $(window).width()
      this.h = $(window).height()
      this.radius = 1 + (8 * this.random)
      this.type = types[this.randomIntFromInterval(0, types.length - 1)];
      this.color = colors[this.randomIntFromInterval(0, colors.length - 1)];
      this.a = 0
      this.s = (this.radius + (Math.random() * 1)) / 10;
      //this.s = 12 //Math.random() * 1;
    }

    getCoordinates() {
      return {
        x: this.x,
        y: this.y
      }
    }

    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render() {
      // Create arc
      let lineWidth = 0.2 + (2.8 * this.random);
      let color = this.color;
      switch (this.type) {
        case "full":
          this.createArcFill(this.radius, color)
          this.createArcEmpty(this.radius + lineWidth, lineWidth / 2, color)
          break;
        case "fill":
          this.createArcFill(this.radius, color)
          break;
        case "empty":
          this.createArcEmpty(this.radius, lineWidth, color)
          break;
      }
    }

    createArcFill(radius, color) {
      this.canvas.beginPath();
      this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      this.canvas.fillStyle = color;
      this.canvas.fill();
      this.canvas.closePath();
    }

    createArcEmpty(radius, lineWidth, color) {
      this.canvas.beginPath();
      this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      this.canvas.lineWidth = lineWidth;
      this.canvas.strokeStyle = color;
      this.canvas.stroke();
      this.canvas.closePath();
    }

    move() {

      this.x += Math.cos(this.a) * this.s;
      this.y += Math.sin(this.a) * this.s;
      this.a += Math.random() * 0.4 - 0.2;

      if (this.x < 0 || this.x > this.w - this.radius) {
        return false
      }

      if (this.y < 0 || this.y > this.h - this.radius) {
        return false
      }
      this.render()
      return true
    }

    calculateDistance(v1, v2) {
      let x = Math.abs(v1.x - v2.x);
      let y = Math.abs(v1.y - v2.y);
      return Math.sqrt((x * x) + (y * y));
    }
  }

  /*
   * Function to clear layer canvas
   * @num:number number of particles
   */
  function popolate(num) {
    for (var i = 0; i < num; i++) {
      setTimeout(
        function(x) {
          return function() {
            // Add particle
            particles.push(new Particle(canvas))
          };
        }(i), frequency * i);
    }
    return particles.length
  }

  function clear() {
    // canvas.globalAlpha=0.04;
    canvas.fillStyle = '#111111';
    canvas.fillRect(0, 0, tela.width, tela.height);
    // canvas.globalAlpha=1;
  }

  function connection() {
    let old_element = null
    $.each(particles, function(i, element) {
      if (i > 0) {
        let box1 = old_element.getCoordinates()
        let box2 = element.getCoordinates()
        canvas.beginPath();
        canvas.moveTo(box1.x, box1.y);
        canvas.lineTo(box2.x, box2.y);
        canvas.lineWidth = 0.45;
        canvas.strokeStyle = "#3f47ff";
        canvas.stroke();
        canvas.closePath();
      }

      old_element = element
    })
  }

  /*
   * Function to update particles in canvas
   */
  function update() {
    clear();
    connection()
    particles = particles.filter(function(p) {
      return p.move()
    })
    // Recreate particles
    if (time_to_recreate) {
      if (particles.length < init_num) {
        popolate(1);
      }
    }
    requestAnimationFrame(update.bind(this))
  }
</script>


<style lang="scss">
  .page-login {
    $backgroundColor: #F0F2F5;
    background-color: rgba(0, 212, 212, 0.2);
    // background-color: $backgroundColor;
    height: 100%;
    position: relative;

    // 时间
    .page-login--layer-time {
      font-size: 1rem;
      font-weight: bold;
      text-align: right;
      margin-top: 5px;
      color: #000000;
      overflow: hidden;
    }

    .page-login--content-title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #000000;
    }

    .page-login--content-main {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: auto auto;
      width: 400px;
      padding: 35px 35px;
      // background: #4eecec;
      background-color: rgba(66, 200, 200, 0.6);
      border: 1px solid #55ffff;
      box-shadow: 0 0 25px #00ffff;
      position: relative;
      /*设置position属性*/
      top: 20%;
      // margin-top: -300px;
    }

    // main
    .page-login--logo {
      width: 380px;
      margin-bottom: 2em;
      margin-top: -2em;
    }

    // 登录表单
    .page-login--form {
      width: 400px;

      // 卡片
      .el-card {
        margin-bottom: 15px;
        background-color: rgba(66, 200, 200, 0.6);
        border: 1px solid #55ffff;
        box-shadow: 0 0 25px #00ffff;
      }

      // 登录按钮
      .button-login {
        width: 100%;
      }

      // 输入框左边的图表区域缩窄
      .el-input-group__prepend {
        padding: 0px 14px;
      }

      .login-code {
        height: 40px - 2px;
        display: block;
        margin: 0px -20px;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
      }

      // 登陆选项
      .page-login--options {
        margin: 0px;
        padding: 0px;
        font-size: 14px;
        color: red;
        margin-bottom: 15px;
        font-weight: bold;
      }

      .page-login--quick {
        width: 100%;
      }
    }

    // 快速选择用户面板
    .page-login--quick-user {
      padding: 10px 0px;
      border-radius: 4px;

      &:hover {
        background-color: #f8f8f9;

        i {
          color: #606266;
        }

        span {
          color: #606266;
        }
      }

      i {
        font-size: 36px;
        color: #909399;
      }

      span {
        font-size: 12px;
        margin-top: 10px;
        color: #909399;
      }
    }
  }
</style>
