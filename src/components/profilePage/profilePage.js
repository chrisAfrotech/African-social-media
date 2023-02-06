import LNavBar from '@/components/global/lNavBar/LNavBar.vue'
import LDropDown from '@/components/global/lDropDown/LDropDown.vue'
import LPublication from '@/components/global/lPublication/LPublication.vue'
import ListReactor from '@/components/global/listReactor/ListReactor.vue'
import LReaction from '@/components/global/lReaction/LReaction.vue'
import UpdatePubForm from '@/components/global/updatePubForm/UpdatePubForm.vue'
import LFooter from '@/components/global/lFooter/LFooter.vue'
import UserPagination from '@/components/global/lPagination/UserPagination.vue'
import LLoading from '@/components/global/lLoading/LLoading.vue'
export default {
  name: 'profilePage',
  components: {
    LNavBar,
    LDropDown,
    LPublication,
    ListReactor,
    LReaction,
    UpdatePubForm,
    LFooter,
    UserPagination,
    LLoading
  },
  data () {
    return {
      publicationIndexes: [],
      DisplayModifier: 'none',
      publicationSort: 'publiées par',
      datas: null, /* [
        {type: 'Football', total: '188', published: '100K'}
      ] */
      // user datas for binding to the templates hehe
      age: '',
      date_inscription: '',
      id: 100,
      image: '',
      nation: '',
      nom: '',
      photo_couverture: '',
      photo_profile: '',
      prenom: '',
      pseudo: '',
      sexe: ''
    }
  },
  methods: {
    fieldBgColor (i) {
      return i % 2 === 0 ? 'black' : 'rgb(227, 45, 56)'
    },
    getUserDatas () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'userDatas.php', {
        id: this.$store.state.profilePageId
      })
        .then((response) => {
          this.age = response.data.age
          this.date_inscription = response.data.date_inscription
          this.id = response.data.id
          this.image = response.data.image
          this.nation = response.data.nation
          this.nom = response.data.nom
          this.photo_couverture = response.data.photo_couverture
          this.photo_profile = response.data.photo_profile
          this.prenom = response.data.prenom
          this.pseudo = response.data.pseudo
          this.sexe = response.data.sexe
        })
        .catch((error) => {
          alert(error)
        })
    },
    getUserStats () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'userStats.php', {
        id: this.$store.state.profilePageId
      })
        .then((response) => {
          if (response.data[0].total == null) {
            response.data[0].total = 0
            response.data[0].published = 0
          }
          this.datas = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    exist (a) {
      if (typeof a === 'undefined') {
        return []
      } else { return a }
    },
    notZero (a) {
      if (a === 0) return 1
      else return a
    },
    displayForm () {
      this.$refs.form.displaying()
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.name === 'profilePage') {
        this.getUserDatas()
        this.getUserStats()
        this.$emit('typeSelected', 'mypub')
        if (this.$store.state.login.id === this.$store.state.profilePageId) this.DisplayModifier = 'flex'
        else this.DisplayModifier = 'none'
        window.scrollTo(0, 0)
      }
    }
  },
  mounted () {
    this.$on('pageChanged', data => {
      // emitted from userPagination
      this.publicationIndexes = this.exist(data)
      window.scrollTo(0, 0)
    })
    this.$on('typeSelected', data => {
      if (data === 'reacted') this.publicationSort = 'notées par'
      else if (data === 'mypub') this.publicationSort = 'publiées par'
    })
    this.getUserDatas()
    this.getUserStats()
    // lors du lancement de la page le button modifier est affiché si il appartient au compte de l
    if (this.$store.state.login.id === this.$store.state.profilePageId) this.DisplayModifier = 'flex'
  }
}
