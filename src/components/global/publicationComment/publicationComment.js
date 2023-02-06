import LovComOfCom from '@/components/global/lovComment/LovComOfCom.vue'
import ComPagination from '@/components/global/lPagination/ComPagination.vue'
import ComLReaction from '@/components/global/lReaction/ComLReaction.vue'
import ListReactorComOfCom from '@/components/global/listReactor/ListReactorComOfCom.vue'
export default {
  name: 'publicationComment',
  props: {
    reference: String
  },
  components: {
    LovComOfCom,
    ComPagination,
    ComLReaction,
    ListReactorComOfCom
  },
  data () {
    return {
      id: 12,
      publicationIndexes: [],
      DisplayImg: 'none',
      auth_img: '',
      auth_id: 20,
      publication_type: '',
      publication_img: '',
      publication_date: ' ',
      publication_author: '',
      publication_text: '',
      publi_numb_com: 100,
      publication_point: 1000,
      // ------ other --------
      vtext_height: '106px',
      vdisplay_more: 'flex',
      full_text_visible: false,
      react: 'handshake',
      Display: 'none',
      isDisplayed: false
    }
  },
  methods: {
    displaying () {
      this.Display = this.isDisplayed ? 'none' : 'block'
      this.isDisplayed = !this.isDisplayed
    },
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
    comOfComEmit () { /* this signal is emitted for the component listReactor */
      this.$root.$emit('commenter', {id: this.id, type: 'comOfcom'})
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
        type: this.$parent.publication_type
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
    exist (a) {
      if (typeof a === 'undefined') {
        return []
      } else { return a }
    }
  },
  mounted () {
    this.$on('reactSelected', data => {
      this.reactRequest(data)
    })
    this.$root.$on('commentEmit', data => {
      this.id = data
      this.$refs.pagination.$emit('loadPagination') // emitted for ComPagination
      this.updateDatas()
      this.displaying()
    })
    this.$parent.$on('closePubliCom', date => {
      this.Display = 'none'
      this.isDisplayed = false
    })
    this.$root.$on('comPageChanged', data => {
      this.publicationIndexes = this.exist(data)
      // this.scrollTo(0, 700)
      let c = document.querySelector('.pubComComZone')
      c.scrollTo(0, 0)
    })
  }
}
