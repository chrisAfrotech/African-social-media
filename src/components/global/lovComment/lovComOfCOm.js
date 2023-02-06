
export default {
  name: 'lovComOfCom',
  props: {
    reference: String,
    id: Number
  },
  data () {
    return {
      Display: 'none',
      auth_img: '',
      auth_id: 20,
      DisplayImg: 'block',
      publication_img: '',
      publication_date: '',
      publication_author: '',
      publication_text: '',
      publi_numb_com: 0,
      publication_point: 0,
      // ------ other --------
      vtext_height: '106px',
      vdisplay_more: 'flex',
      full_text_visible: false,
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
    reactEmit () { /* this signal is emitted for the component ComLReaction */
      this.$root.$emit('comReactClick', this.reference)
    },
    lsReactEmit () { /* this signal is emitted for the component listReactor */
      this.$root.$emit('lsReactComOfClick', this.id)
    },
    comOfComEmit () { /* this signal is emitted for the component listReactor */
      this.$root.$emit('commenter', {id: this.$parent.id, type: 'comOfcom'})
    },
    updateDatas () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'comOfComDatas.php', {
        id: this.id
      })
        .then((response) => {
          this.getReaction()
          this.getPublicationPoint()
          this.publication_text = response.data.texte
          this.moreVisible(response.data.texte.length)
          this.publication_type = response.data.type
          this.publication_date = response.data.dat_commentaire
          this.publication_author = (response.data.nom + ' ' + response.data.prenom).toUpperCase()
          this.auth_id = response.data.auth_id
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
      axios.post(this.$store.state.baseUrl + 'reactToComOfCom.php', {
        comOfCom: this.id,
        personne: this.$store.state.login.id,
        reactionType: reaction,
        type: this.$parent.$parent.publication_type,
        parent: this.$parent.id,
        parentOfParent: this.$route.params.id
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
      axios.post(this.$store.state.baseUrl + 'getComOfComReaction.php', {
        comOfCom: this.id,
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
      axios.post(this.$store.state.baseUrl + 'comOfComPoint.php', {
        comOfCom: this.id
      })
        .then((response) => {
          this.publication_point = response.data
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
    this.$on('comReactSelected', data => {
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
