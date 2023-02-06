export default {
  name: 'listReactorCom',
  data () {
    return {
      datas: [
        {profile: './profile.svg', name: '...', emoji: 'angry'}
      ],
      id: 0,
      Display: 'none',
      isDisplayed: false,
      total: 0,
      heart: 0,
      laughing: 0,
      impressed: 0,
      like: 0,
      handshake: 0,
      sad: 0,
      sick: 0,
      angry: 0
    }
  },
  methods: {
    displaying () {
      this.Display = this.isDisplayed ? 'none' : 'block'
      this.isDisplayed = !this.isDisplayed
    },
    exist (a) {
      if (typeof a === 'undefined') {
        return 0
      } else return a
    },
    getPointReactions () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'pointReactionsCom.php', {
        commentaire: this.id
      })
        .then((response) => {
          this.total = this.exist(response.data.total)
          this.heart = this.exist(response.data.heart)
          this.laughing = this.exist(response.data.laughing)
          this.impressed = this.exist(response.data.impressed)
          this.like = this.exist(response.data.like)
          this.handshake = this.exist(response.data.handshake)
          this.sad = this.exist(response.data.sad)
          this.sick = this.exist(response.data.sick)
          this.angry = this.exist(response.data.angry)
        })
        .catch((error) => {
          alert(error)
        })
    },
    getReactor (reaction) {
      this.$root.$emit('loading', 'on')
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'listComReacteur.php', {
        commentaire: this.id,
        reactionType: reaction
      })
        .then((response) => {
          this.datas = response.data
          this.$root.$emit('loading', 'off')
        })
        .catch((error) => {
          alert(error)
        })
    }
  },
  mounted () {
    this.$root.$on('lsReactComClick', data => {
      this.id = data
      this.getPointReactions()
      this.getReactor('[a-z]+')
      this.displaying()
    })
  }
}
