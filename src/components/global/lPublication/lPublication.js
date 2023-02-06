import LPStar from './LPStar.vue'
export default {
  name: 'lPublication',
  props: {
    reference: String,
    id: Number
  },
  components: {
    LPStar
  },
  data () {
    return {
      publication_type: 'football',
      auth_img: '',
      auth_id: 20,
      // publication_img: './images/dembouz.jpg',
      publication_img: 'http://localhost/projet/datas/pulication_img/image.jpg',
      publication_date: 'MER. 20.02.2000 ',
      publication_author: 'TAMO MBOBDA ERIC',
      publication_title: 'The LaLiga Experience serves up one of the matches of the season',
      publication_text: '\'Saturday\'s Real Sociedad v Real Madrid match was quite the occasion, particularly for the special guests of the second LaLiga Experience 2021/22, who got to enjoy one of the most spectacular games of the year',
      publi_numb_com: 100,
      publication_point: 1000,
      // ------ other --------
      Display: 'none',
      DisplayImg: 'block',
      vtext_height: '53px',
      vdisplay_more: 'flex',
      full_text_visible: false,
      star_colors: [{ color: '#E32D38' }, { color: '#E32D38' }, { color: '#E32D38' }, { color: '#E32D38' }],
      react: 'handshake'
    }
  },
  methods: {
    slideText () {
      if (!this.full_text_visible) {
        this.vtext_height = '500px'
      } else {
        this.vtext_height = '53px'
      }
      this.full_text_visible = !this.full_text_visible
    },
    reactEmit () { /* this signal is emitted for the component lReaction */
      this.$root.$emit('reactClick', this.reference)
    },
    lsReactEmit () { /* this signal is emitted for the component listReactor */
      this.$root.$emit('lsReactClick', this.id)
    },
    moreVisible (text) {
      if (text > 300) {
        this.vdisplay_more = 'flex'
        this.vtext_height = '53px'
      } else {
        this.vdisplay_more = 'none'
        this.vtext_height = '500px'
      }
    },
    updateDatas () {
      this.reset()
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'publicationDatas.php', {
        id: this.id
      })
        .then((response) => {
          this.getReaction()
          this.getPublicationPoint()
          this.getNumberPubCom()
          this.publication_text = response.data.texte
          this.moreVisible(response.data.texte.length)
          this.publication_title = response.data.titre
          this.publication_type = response.data.type
          this.publication_date = response.data.dat_p
          this.auth_id = response.data.auth_id
          this.publication_author = (response.data.nom + ' ' + response.data.prenom).toUpperCase()
          this.auth_img = this.$store.state.baseUrl + response.data.auth_img
          if (response.data.image === '') this.DisplayImg = 'none'
          else this.DisplayImg = 'block'; this.publication_img = this.$store.state.baseUrl + response.data.image
        })
        .catch((error) => {
          alert(error)
        })
    },
    reactRequest (reaction) {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'reactToPublication.php', {
        publication: this.id,
        personne: this.$store.state.login.id,
        reactionType: reaction,
        type: this.publication_type
      })
        .then((response) => {
          console.log(response.data)
          this.getPublicationPoint()
          this.react = reaction
        })
        .catch((error) => {
          alert(error)
        })
    },
    getReaction () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'getPubReaction.php', {
        publication: this.id,
        personne: this.$store.state.login.id
      })
        .then((response) => {
          this.react = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    getPublicationPoint () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'publicationPoint.php', {
        publication: this.id
      })
        .then((response) => {
          this.publication_point = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    getNumberPubCom () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'numberPubCom.php', {
        publication: this.id
      })
        .then((response) => {
          this.publi_numb_com = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    toPublication () {
      this.$router.push({name: 'publication', params: { id: this.id, com: 1, comOfCom: 1 }})
    },
    toProfile () {
      this.$store.commit('updateProfilePage', this.auth_id)
      this.$router.push('profilePage')
    },
    exist (a) {
      if (typeof a === 'undefined') {
        return false
      } else { return true }
    },
    reset () {
      this.publication_img = ''
      this.publication_date = ''
      this.publication_author = ''
      this.publication_title = ''
      this.publication_text = ''
      this.publi_numb_com = 0
      this.publication_point = 0
    }
  },
  mounted () {
    this.$on('reactSelected', data => {
      this.reactRequest(data)
    })
    this.reset()
  },
  watch: {
    id: function (newVal, oldVal) { // watch it
      if (this.exist(newVal)) {
        this.Display = 'block'
        this.updateDatas()
      } else this.Display = 'none'
    }
  }
}
