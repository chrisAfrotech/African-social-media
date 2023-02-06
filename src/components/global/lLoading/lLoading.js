export default {
  name: 'lLoading',
  data () {
    return {
      Display: 'none'
    }
  },
  mounted () {
    this.$root.$on('loading', data => {
      if (data === 'on') this.Display = 'flex'
      else this.Display = 'none'
    })
  }
}
