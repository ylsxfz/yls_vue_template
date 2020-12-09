<template>
  <sys-container type="card">
    <template slot="header">process.env</template>
    <sys-highlight :code="env"/>
  </sys-container>
</template>

<script>
export default {
  data () {
    return {
      env: JSON.stringify(process.env, null, 2)
    }
  }
}
</script>
