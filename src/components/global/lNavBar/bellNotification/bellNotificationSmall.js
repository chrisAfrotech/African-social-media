export default {
  name: 'bellNotificationSmall',
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
    notificationClicked (id) {
      this.$root.$emit('loading', 'on')
      const axios = require('axios')
      axios.post(this.$store.state.baseUrl + 'notificationClicked.php', {
        id: id
      })
        .then((response) => {
          console.log(response.data)
          this.$root.$emit('loading', 'off')
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
      this.$router.push({name: 'publication', params: { id: idPub, com: idCom, comOfCom: idComOfCom }})
    }
  },
  mounted () {
    this.$parent.$on('notificationData', data => { // emited from bellNotification component
      this.datas = data
    })
    this.$parent.$on('notificationUnchecked', data => { // emited from bellNotification component
      this.uncheckedNumb = data
    })
  }
}
