export default {
  name: 'lProfileCard',
  props: {
    type: String
  },
  data () {
    return {
      datas: [
        // the image are type
        {type: 'Football', total: 200},
        {type: 'Football', total: 200}
      ],
      name: 'Tamo',
      totalPoint: 100,
      personneId: 0,
      image: ''
    }
  },
  methods: {
    bgColor (i) {
      return i % 2 === 0 ? 'transparent' : '#E32D38' /* '#10202A' */
    },
    textColor (i) {
      return i % 2 === 0 ? 'white' : 'white' /* '#10202A' */
    },
    getCapacities () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'capacities.php', {
        personne: this.personneId
      })
        .then((response) => {
          this.datas = response.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    updateDatas () {
      let regex = this.type
      if (this.type === 'allField') regex = '.+'
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'bestInAField.php', {
        type: regex
      })
        .then((response) => {
          this.name = response.data.nom
          this.totalPoint = response.data.somme
          this.personneId = response.data.id
          this.image = this.$store.state.baseUrl + response.data.image
          // after having fetched the personneId
          this.getCapacities()
        })
        .catch((error) => {
          alert(error)
        })
    },
    toProfile () {
      this.$store.commit('updateProfilePage', this.personneId)
      this.$router.push('profilePage')
    }
  },
  mounted () {
    this.updateDatas()
  }
}
