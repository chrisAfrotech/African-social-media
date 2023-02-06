export default {
  name: 'bellNotification',
  data () {
    return {
      baseUrl: this.$store.state.baseUrl,
      uncheckedNumb: 0,
      datas: [
        {id: 1, number: 10, date: '2020', publication: 22, com: 1, comOfCom: 1, texte: 'Je pense que...', status: 0, nom: 'Cheick Anta Diop', image: ''}
      ]
    }
  },
  methods: {
    getDatas () {
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'getNotification.php', {
        personne: this.$store.state.login.id
      })
        .then((response) => {
          this.datas = response.data
          this.getUnchecked(response.data)
          this.$parent.$emit('notificationData', response.data) // to bellNotificationSmall
        })
        .catch((error) => {
          alert(error)
        })
    },
    getUnchecked (notification) { // getting notifications number which have not been checked
      let i
      let max = notification.length
      this.uncheckedNumb = 0
      for (i = 0; i < max; i++) {
        if (notification[i].status === 0) this.uncheckedNumb++
      }
      this.$parent.$emit('notificationUnchecked', this.uncheckedNumb) // to bellNotificationSmall
    },
    notificationClicked (id) {
      this.$root.$emit('loading', 'on')
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'notificationClicked.php', {
        id: id
      })
        .then((response) => {
          this.$root.$emit('loading', 'off')
          console.log(response.data)
        })
        .catch((error) => {
          alert(error)
        })
    },
    bgColor (status) {
      if (status === 0) return 'rgba(0,0,0,0.1)'
      else return 'transparent'
    },
    displayNumb (numb) {
      if (numb > 0) return 'flex'
      else return 'none'
    },
    toPublication (idPub, idCom, idComOfCom, idNotification, index) {
      if (this.datas[index].status === 0) {
        this.datas[index].status = 1
        this.uncheckedNumb--
      }
      this.notificationClicked(idNotification)
      this.$router.push({name: 'publication', params: { id: idPub, com: idCom, comOfCom: idComOfCom }})/* .catch(() => {}) */
    }
  },
  mounted () {
    this.getDatas()
  }
}
