export default {
  name: 'ButtonA2',
  props: {
    message: String,
    fSize: {
      type: String,
      default: '0.94vw'
    },
    bghColor: {
      type: String,
      default: '#FF6A39'
    },
    bEmoji: String
  },
  data () {
    return {
      bgColor: 'transparent'
    }
  }
}
