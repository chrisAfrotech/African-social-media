import BImage1 from './BImage1.vue'
export default {
  name: 'ButtonA11',
  props: {
    message: String
  },
  components: {
    BImage1
  },
  methods: {
    mouseover: function () {
      this.$refs.bImage.changeam()
    },
    mouseleave: function () {
      this.$refs.bImage.changeamR()
    }
  }
}
