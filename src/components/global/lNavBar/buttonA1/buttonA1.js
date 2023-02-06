import BImage from './BImage.vue'
export default {
  name: 'ButtonA1',
  props: {
    message: String
  },
  components: {
    BImage
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
