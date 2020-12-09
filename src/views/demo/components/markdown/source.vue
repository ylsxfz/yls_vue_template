<template>
  <sys-container>
    <template slot="header">指定资源</template>
    <sys-markdown :source="doc" highlight/>
  </sys-container>
</template>

<script>
import doc from './md/doc.md'
export default {
  data () {
    return {
      doc
    }
  }
}
</script>
