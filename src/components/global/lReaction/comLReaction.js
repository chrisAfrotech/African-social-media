export default {
  name: 'comLReaction',
  data () {
    return {
      Display: 'none',
      isDisplayed: false,
      parentRef: ''
    }
  },
  methods: {
    select (reaction) {
      // emited for LovComOfCom
      this.$parent.$refs[this.parentRef].$emit('comReactSelected', reaction)
      this.displaying()
    },
    displaying () {
      this.Display = this.isDisplayed ? 'none' : 'block'
      this.isDisplayed = !this.isDisplayed
    }
  },
  mounted () {
    // from lovComOfcom
    this.$root.$on('comReactClick', data => {
      this.Display = this.isDisplayed ? 'none' : 'flex'
      this.isDisplayed = !this.isDisplayed
      this.parentRef = data
    })
  }
}
