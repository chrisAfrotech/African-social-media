import BImage3 from './BImage3.vue'
export default {
  name: 'ButtonA13',
  props: {
    message: String
  },
  components: {
    BImage3
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
