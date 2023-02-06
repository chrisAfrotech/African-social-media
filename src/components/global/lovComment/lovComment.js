export default {
  name: 'lovComment',
  props: {
    reference: String,
    id: Number
  },
  data () {
    return {
      Display: 'none',
      DisplayImg: 'none',
      publication_img: '',
      publication_date: '',
      publication_author: '',
      publication_text: '',
      publi_numb_com: 0,
      publication_point: 0,
      auth_img: '',
      auth_id: 20,
      // ------ other --------
      vtext_height: '106px',
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
        this.vtext_height = '106px'
      }
      this.full_text_visible = !this.full_text_visible
    },
    reactEmit () { /* this signal is emitted for the component lReaction */
      this.$root.$emit('reactClick', this.reference)
    },
    lsReactEmit () { /* this signal is emitted for the component listReactor */
      this.$root.$emit('lsReactComClick', this.id)
    },
    commentEmit () { /* this signal is emitted for the publicationComment */
      this.$root.$emit('commentEmit', this.id)
    },
    updateDatas () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'commentDatas.php', {
        id: this.id
      })
        .then((response) => {
          this.getReaction()
          this.getPublicationPoint()
          this.getNumberComCom()
          this.publication_text = response.data.texte
          this.moreVisible(response.data.texte.length)
          this.publication_type = response.data.type
          this.publication_date = response.data.dat_commentaire
          this.publication_author = (response.data.nom + ' ' + response.data.prenom).toUpperCase()
          this.auth_img = this.$store.state.baseUrl + response.data.auth_img
          this.auth_id = response.data.auth_id
          if (response.data.image === '') this.DisplayImg = 'none'
          else this.DisplayImg = 'block'; this.publication_img = this.$store.state.baseUrl + response.data.image
        })
        .catch((error) => {
          alert(error)
        })
    },
    reactRequest (reaction) {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'reactToComment.php', {
        commentaire: this.id,
        personne: this.$store.state.login.id,
        reactionType: reaction,
        type: this.$parent.publication_type,
        publication: this.$route.params.id
      })
        .then((response) => {
          this.getPublicationPoint()
          this.react = reaction
        })
        .catch((error) => {
          alert(error)
        })
    },
    getReaction () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'getComReaction.php', {
        commentaire: this.id,
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
      axios.post(this.$store.state.baseUrl + 'commentPoint.php', {
        commentaire: this.id
      })
        .then((response) => {
          this.publication_point = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    getNumberComCom () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'numberComCom.php', {
        parent_comment: this.id
      })
        .then((response) => {
          this.publi_numb_com = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    toProfile () {
      this.$store.commit('updateProfilePage', this.auth_id)
      this.$router.push('profilePage')
    },
    moreVisible (text) {
      if (text > 600) {
        this.vdisplay_more = 'flex'
        this.vtext_height = '106px'
      } else {
        this.vdisplay_more = 'none'
        this.vtext_height = '500px'
      }
    },
    exist (a) {
      if (typeof a === 'undefined') {
        return false
      } else { return true }
    }
  },
  mounted () {
    this.$on('reactSelected', data => {
      this.reactRequest(data)
    })
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
