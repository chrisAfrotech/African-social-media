export default {
  name: 'lRanking',
  data () {
    return {
      datas: [], /* [
        { id: 2, nom: 'Arnaud', prenom: 'Eric', point: 200, image: './pr.svg', numberPublished: 300 }
      ], */
      types: ['allField', 'Football', 'Philosophy', 'Social problems',
        'Politic', 'Beauty', 'Physics', 'Other'],
      type: 'allField',
      baseUrl: this.$store.state.baseUrl,
      selected: 'allField'
    }
  },
  methods: {
    bgColor (i) {
      return i % 2 === 0 ? '#254150' : 'transparent'
    },
    bdColor (i) {
      return i <= 3 ? '#008389'
        : i <= 5 ? '#F5BE01'
          : i <= 6 ? '#654EA3'
            : 'transparent'
    },
    updateDatas (regex) {
      this.datas = this.defaultDatas
      if (regex === 'allField') regex = '.+'
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'ranking.php', {
        type: regex
      })
        .then((response) => {
          this.datas = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    toProfile (id) {
      this.$store.commit('updateProfilePage', id)
      this.$router.push('profilePage')
    }
  },
  mounted () {
    this.updateDatas('allField')
  },
  watch: {
    selected: function (newVal, oldVal) { // watch it
      this.updateDatas(newVal)
    }
  }
}
