import LNavBar from '@/components/global/lNavBar/LNavBar.vue'
import LComment from '@/components/loveProject/lComment/LComment.vue'
import LPublication from '@/components/global/lPublication/LPublication.vue'
import LPublication1 from '@/components/loveProject/lPublication1/LPublication1.vue'
import LRanking from '@/components/global/lRanking/LRanking.vue'
import BestStat from '@/components/global/bestStat/BestStat.vue'
import Slider from '@/components/loveProject/Slider.vue'
import LFooter from '@/components/global/lFooter/LFooter.vue'
import LPblicationForm from '@/components/global/lPblicationForm/LPblicationForm.vue'
import ListReactor from '@/components/global/listReactor/ListReactor.vue'
import LReaction from '@/components/global/lReaction/LReaction.vue'
import LPagination from '@/components/global/lPagination/LPagination.vue'
import LLoading from '@/components/global/lLoading/LLoading.vue'
export default {
  name: 'loveProject',
  props: {
    resp: String
  },
  components: {
    LNavBar,
    LComment,
    LPublication,
    LPublication1,
    LRanking,
    BestStat,
    Slider,
    LFooter,
    LPblicationForm,
    ListReactor,
    LReaction,
    LPagination,
    LLoading
  },
  data () {
    return {
      test: 'monTest',
      DisplayPubliForm: 'none',
      publicationIndexes: []
    }
  },
  methods: {
    publiFormDisplaying () {
      this.$refs.publiForm.displaying()
    },
    toPubliList () {
      this.$router.push('publiList')
    },
    cookiePresence () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'cookies.php', {
        request: 'presence'
      })
        .then((response) => {
          console.log(response.data)
          if (!response.data) {
            this.$router.push('login')
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  },
  mounted () {
    this.$on('pageChanged', data => { // from LPagination
      this.publicationIndexes = data
      window.scrollTo(0, 0)
    })
  }
}
