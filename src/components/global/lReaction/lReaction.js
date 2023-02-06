export default {
  name: 'lReaction',
  data () {
    return {
      Display: 'none',
      isDisplayed: false,
      parentRef: ''
    }
  },
  methods: {
    select (reaction) {
      this.$parent.$refs[this.parentRef].$emit('reactSelected', reaction)
      this.displaying()
    },
    displaying () {
      this.Display = this.isDisplayed ? 'none' : 'block'
      this.isDisplayed = !this.isDisplayed
    }
  },
  mounted () {
    this.$root.$on('reactClick', data => {
      this.Display = this.isDisplayed ? 'none' : 'flex'
      this.isDisplayed = !this.isDisplayed
      this.parentRef = data
    })
  }
}
