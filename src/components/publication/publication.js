import LNavBar from '@/components/global/lNavBar/LNavBar.vue'
import PComment from '@/components/global/pComment/PComment.vue'
import LDropDown from '@/components/global/lDropDown/LDropDown.vue'
import LovComment from '@/components/global/lovComment/LovComment.vue'
import LFooter from '@/components/global/lFooter/LFooter.vue'
import ListReactor from '@/components/global/listReactor/ListReactor.vue'
import ListReactorCom from '@/components/global/listReactor/ListReactorCom.vue'
import LReaction from '@/components/global/lReaction/LReaction.vue'
import PubPagination from '@/components/global/lPagination/PubPagination.vue'
import PublicationComment from '@/components/global/publicationComment/PublicationComment.vue'
import PReaction from './PReaction'
import LLoading from '@/components/global/lLoading/LLoading.vue'
export default {
  name: 'publication',
  components: {
    LNavBar,
    PComment,
    LDropDown,
    LFooter,
    LovComment,
    ListReactor,
    ListReactorCom,
    LReaction,
    PubPagination,
    PublicationComment,
    PReaction,
    LLoading
  },
  data () {
    return {
      publicationIndexes: [],
      auth_img: '',
      auth_id: 20,
      DisplayImg: 'none',
      publication_type: '',
      publication_img: '',
      publication_date: ' ',
      publication_author: '',
      publication_title: '',
      publication_text: '',
      publi_numb_com: 0,
      publication_point: 0,
      react: 'handshake'
    }
  },
  methods: {
    updateDatas () {
      this.$root.$emit('loading', 'on')
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'publicationDatas.php', {
        id: this.$route.params.id
      })
        .then((response) => {
          this.getReaction()
          this.getPublicationPoint()
          this.getNumberPubCom()
          this.publication_text = response.data.texte
          this.publication_title = response.data.titre
          this.publication_type = response.data.type
          this.publication_date = response.data.dat_p
          this.auth_id = response.data.auth_id
          this.publication_author = response.data.nom + ' ' + response.data.prenom
          this.auth_img = this.$store.state.baseUrl + response.data.auth_img
          if (response.data.image === '') this.DisplayImg = 'none'
          else this.DisplayImg = 'block'; this.publication_img = this.$store.state.baseUrl + response.data.image
          this.$root.$emit('loading', 'off')
        })
        .catch((error) => {
          alert(error)
        })
    },
    reactRequest (reaction) {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'reactToPublication.php', {
        publication: this.$route.params.id,
        personne: this.$store.state.login.id,
        reactionType: reaction,
        type: this.$store.state.publication.type
      })
        .then((response) => {
          this.getPublicationPoint()
          this.react = reaction
          console.log(response.data)
        })
        .catch((error) => {
          alert(error)
        })
    },
    getReaction () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'getPubReaction.php', {
        publication: this.$route.params.id,
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
        publication: this.$route.params.id
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
        publication: this.$route.params.id
      })
        .then((response) => {
          this.publi_numb_com = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    reactEmit () { /* this signal is emitted for the component lReaction */
      this.$root.$emit('reactClick', 'pReaction')
    },
    lsReactEmit () { /* this signal is emitted for the component listReactor */
      this.$root.$emit('lsReactClick', this.$route.params.id)
    },
    commenterPubEmit () { /* this signal is emitted for the component pComment */
      this.$root.$emit('commenter', { id: this.$route.params.id, type: 'comment' })
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
    this.updateDatas()
    this.$on('reactSelected', data => {
      this.reactRequest(data)
    })
    this.$root.$on('pageChangedPublication', data => {
      // emitted from pubPagination
      this.publicationIndexes = this.exist(data)
      window.scrollTo(0, 0)
    })
    /* this.$root.$on('publication', data => {
      // emitted from pubPagination
      alert('smth')
      this.updateDatas()
    }) */
  },
  watch: {
    $route (to, from) {
      if (this.$route.name === 'publication') {
        this.updateDatas()
        this.$emit('typeSelected', 'most_point')

        // emitted for publicationComment component
        if (this.$route.params.com !== 1) {
          this.$root.$emit('commentEmit', this.$route.params.com)
        } else {
          this.$emit('closePubliCom')
        }
        window.scrollTo(0, 0)
      }
    }
  }
}
