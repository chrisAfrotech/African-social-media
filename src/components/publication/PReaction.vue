<template>
    <span></span>
</template>
<script>
export default {
  name: 'PReaction',
  props: {
    reference: String
  },
  data () {
    return {
      react: 'handshake'
    }
  },
  mounted () {
    this.$on('reactSelected', data => {
      this.$parent.$emit('reactSelected', data)
    })
  }
}
</script>
