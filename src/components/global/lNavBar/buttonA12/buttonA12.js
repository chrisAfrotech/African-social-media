import BImage2 from './BImage2.vue'
export default {
  name: 'ButtonA12',
  props: {
    message: String
  },
  components: {
    BImage2
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
